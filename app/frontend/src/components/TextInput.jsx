import { forwardRef, useRef, useEffect } from 'react';

const TextInput = forwardRef(({ type = 'text', className = '', isFocused = false, ...props }, ref) => {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, [isFocused]);

    return (
        <input
            {...props}
            type={type}
            className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${className}`}
            ref={input}
        />
    );
});

export default TextInput;
