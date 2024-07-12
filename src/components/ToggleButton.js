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
      className={`flex justify-center items-center gap-x-3 rounded-xl px-5 py-[0.3rem] text-xs font-semibold leading-6 text-center ${
          ((type==='multi')?(value.includes(name)):(value===name)) ? 'text-gray-100 bg-blue-600 border-2 border-blue-600' : 'text-gray-500 bg-gray-50 hover:bg-gray-200 border-2 border-gray-300'
      }`}
    >
      {name}
    </button>
  );
};

// ButtonRow component
const ButtonRow = ({ type, value, disp, setValue, label = 'NOLABEL', buttonNames, col, isRequired = false }) => {
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
        <label className="block text-xs font-medium ml-1 leading-6 text-gray-400 dark:text-[#dcdcdc]">
          {label} {isRequired && <span className="text-red-700">*</span>}
        </label>
      )}
      <div className="mt-1 flex flex-wrap gap-4">
        {buttonNames.map((name) => (
          <ToggleButton type={type} key={name} name={name} value={value} disp={disp} setValue={setValue} />
        ))}
      </div>
      {showValidation && (
        <p className="text-red-600 text-xs mt-2">This field is required.</p>
      )}
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