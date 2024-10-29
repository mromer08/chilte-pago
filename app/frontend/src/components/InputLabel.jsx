const InputLabel = ({ htmlFor, value, className = '', children, ...props }) => {
    return (
        <label
            htmlFor={htmlFor}
            {...props}
            className={`block text-sm font-medium leading-6 text-gray-900 ${className}`}
        >
            {value || children}
        </label>
    );
};

export default InputLabel;
