"use client";

import { useState } from 'react';
import { Combobox, ComboboxInput, ComboboxButton, ComboboxOption, ComboboxOptions } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

// Utility to create a unique id based on name
const stringify = (inputString) => {
  return inputString.replace(/\//g, '').toLowerCase().replace(/\s+/g, '-');
};

const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

const Input = ({
  disabled, list, index, value, disp, setValue, setstate, name, col, type = 'text', step = '1', variant = 'input', options = [], rows, isRequired = false, ...props
}) => {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(value);

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

  const filteredOptions = query === ''
    ? options
    : options.filter((option) => option.toLowerCase().includes(query.toLowerCase()));

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
        {variant === 'combobox' && (
          <Combobox
            as="div"
            value={selected}
            onChange={(option) => {
              setQuery('');
              setSelected(option);
              if (list) {
                setValue((prev) => ({
                  ...prev,
                  [list]: [
                    ...prev[list].slice(0, index),
                    { ...prev[list][index], [disp]: option },
                    ...prev[list].slice(index + 1)
                  ]
                }));
              } else {
                if (!disp) {
                  setstate(option);
                } else {
                  setValue((prev) => ({ ...prev, [disp]: option }));
                }
              }
            }}
          >
            <div className="relative">
              <ComboboxInput
                className="w-full rounded-md border-0 dark:bg-[#d0cfd1] py-1.5 pl-4 pr-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                onChange={(event) => setQuery(event.target.value)}
                displayValue={(option) => option || ''}
                {...props}
              />
              <ComboboxButton className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </ComboboxButton>
              {filteredOptions.length > 0 && (
                <ComboboxOptions className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {filteredOptions.map((option, idx) => (
                    <ComboboxOption
                      key={idx}
                      value={option}
                      className={({ active }) =>
                        classNames('relative cursor-default select-none py-2 pl-3 pr-9', active ? 'bg-indigo-600 text-white' : 'text-gray-900')
                      }
                    >
                      {({ active, selected }) => (
                        <>
                          <div className="flex items-center">
                            <span className={`ml-3 truncate', ${selected && 'font-semibold'}`}>{option}</span>
                          </div>
                          {selected && (
                            <span className={classNames('absolute inset-y-0 right-0 flex items-center pr-4', active ? 'text-white' : 'text-indigo-600')}>
                              <CheckIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                          )}
                        </>
                      )}
                    </ComboboxOption>
                  ))}
                </ComboboxOptions>
              )}
            </div>
          </Combobox>
        )}
      </div>
    </div>
  );
};

export default Input;
