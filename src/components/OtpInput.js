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

  const handleSubmit = () => {
    if (otp.every(digit => digit !== '')) {
      onSubmit(otp.join(''));
    }
  };

  return (
    <div className="flex gap-4 items-end">
      <div className="flex space-x-2 mb-[2px]">
        {Array.from({ length: numDigits }, (_, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            className="bg-blue-200 border-0 rounded-xl w-10 h-10 text-center text-sm px-0"
            value={otp[index]}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onFocus={handleFocus}
            ref={(el) => inputRefs.current[index] = el}
          />
        ))}
      </div>
      <button
        onClick={handleSubmit}
        className="mb-[9px] rounded-md px-3 py-1 bg-blue-600 text-blue-50 text-xs"
      >
        Validate
      </button>
    </div>
  );
};

export default OtpInput;
