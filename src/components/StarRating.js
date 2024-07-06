import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

const StarRating = ({rating, setRating, name, starWidth = 1.2, onRatingChange }) => {

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
    if ( starContainerRef.current) {
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
        className={'cursor-pointer'}
        ref={starContainerRef}
        onMouseDown={handleMouseDown}
        style={{ width: `${starWidth * totalStars}rem` }}
      >
        {Array.from({ length: totalStars }, (_, index) => (
          <div key={index} className="relative inline-block" style={{ width: `${starWidth}rem`, height: `${starWidth}rem` }}>
            <svg
              stroke="currentColor"
              fill={rating > index ? "#facc15" : "#d1d5db"}
              strokeWidth="0"
              viewBox="0 0 576 512"
              className="cursor-pointer text-xl"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
              style={{ fontSize: `${starWidth}rem`, color: rating > index ? "#facc15" : "#d1d5db" }}
            >
              <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path>
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
};

StarRating.propTypes = {
  starWidth: PropTypes.number.isRequired,
  onRatingChange: PropTypes.func,
  readOnly: PropTypes.bool,
};

export default StarRating;
