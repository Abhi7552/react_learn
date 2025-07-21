import React from 'react'

function Button({
    children,
    bgColor = "bg-blue-500",
    textColor = "text-white",
    type = "button",
    className = "",
    ...props
}) {
  return (
    <button type={type} className={`px-4 py-2 rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${className} ${bgColor} ${textColor}`} {...props}>
      {children}
    </button>
  )
}

export default Button;