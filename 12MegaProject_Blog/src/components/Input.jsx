import React, {useId} from 'react'

const Input=React.forwardRef(function Input({
    label,
    type = "text",
    placeholder = "",
    className = "",
    ...props
}, ref) {
  const id = useId();

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && <label htmlFor={id} className='text-sm font-semibold'>{label}</label>}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        ref={ref}
        className='px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}'
        {...props}
      />
    </div>
  );
});

export default Input;