import React, {useId} from 'react'

function Select({
    label,
    options,
    className = "",
    ...props
}, ref) {
    const id = useId();
  return (
    <div className='w-full'>
        {label && <label htmlFor={id} className='text-sm font-semibold'>{label}</label>}
        <select
            id={id}
            ref={ref}
            className={`px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
            {...props}
        >
            {options?.map((option, index) => (
                <option key={index} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    </div>
  )
}

export default React.forwardRef(Select);