"use client";

import {useEffect} from "react";

const stringify = (inputString) => {
  // Convert input string to lowercase and replace spaces with hyphens
  return inputString.replace(/\//g, '').toLowerCase().replace(/\s+/g, '-');
};

// <<<<<<< dew
// const Input = ({ name, col, type = 'text', variant = 'input', options, rows, isRequired = false }) => {

//   return (
//     <div className={`sm:col-span-${col}`}>
//       <label htmlFor={stringify(name)} className="block text-sm font-medium leading-6 text-gray-900 tracking-tight">
//         {name} { isRequired && <span className="text-red-700">*</span>}
// =======
const Input = ({disabled, list, index, value, disp, setValue, setstate, name, col, type = 'text',step='1', variant = 'input', options, rows, isRequired = false }) => {
    // useEffect(()=>{
    //     console.log(index)
    //         console.log(list)
    // },[])
  return (
    <div className={`sm:col-span-${col}`}>
      <label htmlFor={stringify(name)} className="block text-sm font-medium leading-6 text-gray-900">
        {name} { isRequired && <span className="text-red-700">*</span>}

      </label>
      <div className="mt-2">
        {variant === 'input' && (
          isRequired ? 
          <input
              disabled={disabled}
              value={value}
            id={stringify(name)}
            onChange={(e)=>{
                (list)?(setValue((prev)=>({...prev, [list]: [...prev[list].slice(0,index), {...prev[list][index], [disp]: e.target.value}, ...prev[list].slice(index+1)]}))):(((!disp)?(setstate(e.target.value)):(setValue((prev)=>{

                // console.log(disp)
                return({...prev, [disp]: e.target.value})

              }))))


              // console.log("chala")
            }
          }
            name={stringify(name)}
            type={type}
            autoComplete={stringify(name)}
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
          /> :
          <input
            value={value}
            onChange={(e)=>{
                (list)?(setValue((prev)=>({...prev, [list]: [...prev[list].slice(0,index), {...prev[list][index], [disp]: e.target.value}, ...prev[list].slice(index+1)]}))):(((!disp)?(setstate(e.target.value)):(setValue((prev)=>{

                // console.log(disp)
                return({...prev, [disp]: e.target.value})

              }))))


              // console.log("chala")
            }
          }
            id={stringify(name)}
            name={stringify(name)}
            type={type}
            step={step}
            autoComplete={stringify(name)}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
          />
        )}
        {variant === 'select' && (
          isRequired ? 
          <select
              value={value}
            id={stringify(name)}
            onChange={(e)=>{
                (list)?(setValue((prev)=>({...prev, [list]: [...prev[list].slice(0,index), {...prev[list][index], [disp]: e.target.value}, ...prev[list].slice(index+1)]}))):(((!disp)?(setstate(e.target.value)):(setValue((prev)=>{

                // console.log(disp)
                return({...prev, [disp]: e.target.value})

              }))))


              // console.log("chala")
            }
          }
            name={stringify(name)}
            autoComplete={stringify(name)}
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-sm sm:leading-6"
          >
            {options && options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select> :
          <select
            value={value}
            onChange={(e)=>{
                (list)?(setValue((prev)=>({...prev, [list]: [...prev[list].slice(0,index), {...prev[list][index], [disp]: e.target.value}, ...prev[list].slice(index+1)]}))):(((!disp)?(setstate(e.target.value)):(setValue((prev)=>{

                // console.log(disp)
                return({...prev, [disp]: e.target.value})

              }))))


              // console.log("chala")
            }
          }
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
          isRequired ?
          <textarea
              value={value}
              onChange={(e)=>{
                (list)?(setValue((prev)=>({...prev, [list]: [...prev[list].slice(0,index), {...prev[list][index], [disp]: e.target.value}, ...prev[list].slice(index+1)]}))):(((!disp)?(setstate(e.target.value)):(setValue((prev)=>{

                // console.log(disp)
                return({...prev, [disp]: e.target.value})

              }))))


              // console.log("chala")
            }
          }
            id={stringify(name)}
            name={stringify(name)}
            rows={rows}
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            defaultValue=""
          /> :
          <textarea
            value={value}
            onChange={(e)=>{
                (list)?(setValue((prev)=>({...prev, [list]: [...prev[list].slice(0,index), {...prev[list][index], [disp]: e.target.value}, ...prev[list].slice(index+1)]}))):(((!disp)?(setstate(e.target.value)):(setValue((prev)=>{

                // console.log(disp)
                return({...prev, [disp]: e.target.value})

              }))))


              // console.log("chala")
            }
          }
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
