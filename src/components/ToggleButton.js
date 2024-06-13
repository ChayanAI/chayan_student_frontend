import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

// ToggleButton component
const ToggleButton = ({ name }) => {
  const [isActiveToggle, setIsActiveToggle] = useState(false);
  const uniqueId = uuidv4();

  const handleToggle = () => {
    setIsActiveToggle(!isActiveToggle);
  };

  return (
    <button
      id={uniqueId}
      onClick={handleToggle}
      type='button'
      className={`w-full px-4 py-2 text-sm font-semibold rounded ${
        isActiveToggle ? 'bg-blue-700 text-white' : 'bg-white text-black border border-gray-300'
      }`}
    >
      {name}
    </button>
  );
};

// ButtonRow component
const ButtonRow = ({ label = 'NOLABEL', buttonNames, col, numberOfRows = 1, buttonsPerRow = Math.ceil(buttonNames.length / numberOfRows)}) => {  
    return (
      <div className={`sm:col-span-${col}`}>
        {label !== 'NOLABEL' && (
          <label className="block text-sm font-medium leading-6 text-gray-900 tracking-tight">
            {label}
          </label>
        )}
        <div className={`mt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${buttonsPerRow} gap-4`}>
          {buttonNames.map((name) => (
            <ToggleButton key={name} name={name} />
          ))}
        </div>
      </div>
    );
};

export {ToggleButton, ButtonRow};
