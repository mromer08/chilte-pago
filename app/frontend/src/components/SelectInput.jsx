import { forwardRef } from 'react';
const SelectInput = forwardRef(({ options = [], className = '', ...props }, ref) => {
    return (
        <select
            ref={ref}
            {...props}
            className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${className}`}
        >
            {options.map((option, index) => (
                <option key={index} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
});

export default SelectInput;
