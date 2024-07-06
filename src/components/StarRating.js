import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

const StarRating = ({rating, setRating, name, starWidth = 1.5, onRatingChange }) => {

  const [uniqueId, setUniqueId] = useState('');
  const starContainerRef = useRef(null);
  const totalStars = 5;

  useEffect(() => {
    setUniqueId(uuidv4());
    // setRating(ratingpassed)
  }, []);

  const handleMouseDown = (event) => {
    handleMouseMove(event);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (event) => {
    if (starContainerRef.current) {
      const { left, width } = starContainerRef.current.getBoundingClientRect();
      const clickX = event.clientX - left;
      const newRating = Math.min(totalStars, Math.max(0, (clickX / width) * totalStars));
      const roundedRating = Math.round(newRating * 2) / 2;
      if(setRating){
        setRating(roundedRating);
      }
      if (onRatingChange) {
        onRatingChange(name, roundedRating);
      }
    }
  };

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  return (
    <div className="flex flex-col items-center select-none">
      <div
        id={`star-rating-${uniqueId}`}
        className="flex cursor-pointer"
        ref={starContainerRef}
        onMouseDown={handleMouseDown}
        style={{ width: `${starWidth * totalStars}rem` }}
      >
        {Array.from({ length: totalStars }, (_, index) => {
          const starValue = index + 1;
          const halfStarValue = index + 0.5;
          return (
            <div key={index} className="relative inline-block" style={{ width: `${starWidth}rem`, height: `${starWidth}rem` }}>
              <span
                className={`text-gray-400 ${rating >= starValue ? 'text-yellow-500' : ''}`}
                style={{ fontSize: `${starWidth}rem` }}
              >
                ★
              </span>
              {rating >= halfStarValue && rating < starValue && (
                <span
                  className="absolute left-0 top-0 overflow-hidden text-yellow-500"
                  style={{ paddingLeft:`${starWidth/10}rem` , width: '50%', fontSize: `${starWidth}rem` }}
                >
                  ★
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

StarRating.propTypes = {
  starWidth: PropTypes.number.isRequired,
  onRatingChange: PropTypes.func,
};

export default StarRating;
