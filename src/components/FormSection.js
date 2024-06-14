import React from 'react';

const FormSection = ({ children, isVisible }) => {
  return (
    <div className={`transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {isVisible && children}
    </div>
  );
};

export default FormSection;
