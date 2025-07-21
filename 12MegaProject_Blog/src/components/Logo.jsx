import React from 'react';

function Logo({ width = "100px" }) {
  return (
    <div className="flex items-center gap-2" style={{ width }}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        className="inline-block"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="16" cy="16" r="16" fill="#6366F1" />
        <text x="16" y="21" textAnchor="middle" fontSize="16" fill="white" fontFamily="Arial" fontWeight="bold">B</text>
      </svg>
      <span className="font-bold text-xl text-indigo-700">Blog</span>
    </div>
  );
}

export default Logo;