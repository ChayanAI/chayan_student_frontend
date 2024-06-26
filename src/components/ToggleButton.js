import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

// ToggleButton component
const ToggleButton = ({type, name ,value,disp, setValue}) => {

  const uniqueId = uuidv4();

  const handleToggle = () => {
      // console.log(id)
      //   console.log(value)
        if(type!=='multi'){
          setValue((prev)=>{return({...prev, [disp]: name})})
        }else{
          setValue(prev=>({...prev,[disp]: (prev[disp].includes(name))?([...prev[disp].splice(0,prev[disp].indexOf(name)),...prev[disp].splice(prev[disp].indexOf(name)+1)]):([...prev[disp],name])}))
        }


  };

  return (
    <button
      id={uniqueId}
      onClick={handleToggle}
      type='button'
      className={`w-full px-4 py-2 text-sm font-semibold rounded ${
          ((type==='multi')?(value.includes(name)):(value===name)) ? 'bg-blue-700 text-white' : 'bg-white dark:bg-[#d0cfd1] text-black border border-gray-300'
      }`}
    >
      {name}
    </button>
  );
};

// ButtonRow component
const ButtonRow = ({type, value, disp, setValue, label = 'NOLABEL', buttonNames, col, numberOfRows = 1, buttonsPerRow = Math.ceil(buttonNames.length / numberOfRows), isRequired = false}) => {
  const [showValidation, setShowValidation] = useState(false);

  const handleButtonClick = (name) => {
    setValue((prev) => ({ ...prev, [disp]: name }));
    setShowValidation(false);
  };

  const handleSubmit = () => {
    if (isRequired && !value[disp]) {
      setShowValidation(true);
    } else {
      setShowValidation(false);
      // Handle form submission or other logic
    }
  };
    return (
      <div className={`sm:col-span-${col}`}>
        {label !== 'NOLABEL' && (
          <label className="block text-sm font-medium leading-6 text-gray-900 tracking-tight">
            {label} {isRequired && <span className="text-red-700">*</span>}
          </label>
        )}
        <div className={`mt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${buttonsPerRow} gap-4`}>
          {buttonNames.map((name) => (
            <ToggleButton type={type} key={name} name={name} value={value} disp={disp} setValue={setValue}/>
          ))}
        </div>
      </div>
    );
};

// ClickyButton
const ClickyButton = ({ name, classes, yellow = false }) => {
  const uniqueId = uuidv4();

  return (
    <button
      id={uniqueId}
      type='button'
      className={`px-4 py-2 text-sm font-semibold rounded-r text-white ${ yellow ? 'bg-yellow-600 focus:bg-gray-500' : 'bg-blue-700 focus:bg-white' } ${classes}`}
    >
      {name}
    </button>
  );
};

export {ToggleButton, ButtonRow, ClickyButton};