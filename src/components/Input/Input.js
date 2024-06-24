"use client";

import { useEffect } from "react";

const stringify = (inputString) => {
  // Convert input string to lowercase and replace spaces with hyphens
  return inputString.replace(/\//g, '').toLowerCase().replace(/\s+/g, '-');
};

const Input = ({
  disabled, list, index, value, disp, setValue, setstate, name, col, type = 'text', step = '1', variant = 'input', options, rows, isRequired = false, ...props
}) => {
  const handleChange = (e) => {
    const newValue = e.target.value;
    if (list) {
      setValue((prev) => ({
        ...prev,
        [list]: [
          ...prev[list].slice(0, index),
          { ...prev[list][index], [disp]: newValue },
          ...prev[list].slice(index + 1)
        ]
      }));
    } else {
      if (!disp) {
        setstate(newValue);
      } else {
        setValue((prev) => ({ ...prev, [disp]: newValue }));
      }
    }
  };

  return (
    <div className={`sm:col-span-${col}`}>
      <label htmlFor={stringify(name)} className="block text-sm font-medium leading-6 text-gray-900 dark:text-[#dcdcdc]">
        {name} {isRequired && <span className="text-red-700">*</span>}
      </label>
      <div className="mt-2">
        {variant === 'input' && (
          <input
            {...props}
            id={stringify(name)}
            name={stringify(name)}
            type={type}
            step={step}
            value={value}
            onChange={handleChange}
            disabled={disabled}
            autoComplete={stringify(name)}
            required={isRequired}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset dark:bg-[#d0cfd1] ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
          />
        )}
        {variant === 'select' && (
          <select
            {...props}
            id={stringify(name)}
            name={stringify(name)}
            value={value}
            onChange={handleChange}
            autoComplete={stringify(name)}
            required={isRequired}
            className="block w-full rounded-md border-0 dark:bg-[#d0cfd1] py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-sm sm:leading-6"
          >
            {options && options.map((option, idx) => (
              <option key={idx} value={option}>
                {option}
              </option>
            ))}
          </select>
        )}
        {variant === 'textarea' && (
          <textarea
            {...props}
            id={stringify(name)}
            name={stringify(name)}
            rows={rows}
            value={value}
            onChange={handleChange}
            required={isRequired}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
          />
        )}
      </div>
    </div>
  );
};

export default Input;
