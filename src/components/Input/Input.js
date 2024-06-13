"use client";

const stringify = (inputString) => {
  // Convert input string to lowercase and replace spaces with hyphens
  return inputString.replace(/\//g, '').toLowerCase().replace(/\s+/g, '-');
};

const Input = ({ name, col, type = 'text', variant = 'input', options, rows }) => {
  return (
    <div className={`sm:col-span-${col}`}>
      <label htmlFor={stringify(name)} className="block text-sm font-medium leading-6 text-gray-900 tracking-tight">
        {name}
      </label>
      <div className="mt-2">
        {variant === 'input' && (
          <input
            id={stringify(name)}
            name={stringify(name)}
            type={type}
            autoComplete={stringify(name)}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
          />
          // <div className="relative">
          //   <label
          //     htmlFor={stringify(name)}
          //     className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
          //   >
          //     {name}
          //   </label>
          //   <input
          //     type="text"
          //     name={stringify(name)}
          //     id={stringify(name)}
          //     className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
          //   />
          // </div>
        )}
        {variant === 'select' && (
          <select
            id={stringify(name)}
            name={stringify(name)}
            autoComplete={stringify(name)}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-sm sm:leading-6"
          >
            {options && options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        )}
        {variant === 'textarea' && (
          <textarea
            id={stringify(name)}
            name={stringify(name)}
            rows={rows}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            defaultValue=""
          />
        )}
      </div>
    </div>
  );
};

export default Input;
