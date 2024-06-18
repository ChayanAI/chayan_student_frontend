import React, { useState, useRef } from 'react';

const OtpInput = ({ numDigits, onSubmit }) => {
  const [otp, setOtp] = useState(Array(numDigits).fill(''));
  const inputRefs = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^\d$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (index < numDigits - 1) {
        inputRefs.current[index + 1].focus();
      } else {
        inputRefs.current[index].blur();
        if (newOtp.every(digit => digit !== '')) {
          onSubmit(newOtp.join(''));
        }
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      const newOtp = [...otp];
      if (newOtp[index] === '') {
        if (index > 0) {
          inputRefs.current[index - 1].focus();
          newOtp[index - 1] = '';
          setOtp(newOtp);
        }
      } else {
        newOtp[index] = '';
        setOtp(newOtp);
      }
    } else if (e.key === 'ArrowLeft') {
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    } else if (e.key === 'ArrowRight') {
      if (index < numDigits - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleFocus = (e) => {
    e.target.select();
  };

  return (
    <div className="flex space-x-2">
      {Array.from({ length: numDigits }, (_, index) => (
        <input
          key={index}
          type="text"
          maxLength="1"
          className="border border-gray-400 w-8 h-8 text-center text-sm px-0"
          value={otp[index]}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onFocus={handleFocus}
          ref={(el) => inputRefs.current[index] = el}
        />
      ))}
    </div>
  );
};

export default OtpInput
