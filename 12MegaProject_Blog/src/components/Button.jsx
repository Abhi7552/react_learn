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
    <div className={`px-4 py-2 rounded-xl ${className} ${bgColor} ${textColor}`}{...props}>{children}</div>
  )
}

export default Button;