// Button.jsx
import React from 'react';

const Button = ({ text, onClick, style }) => {
  return (
    <button
      className="bg-gray-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded m-2"
      onClick={onClick}
      style={style}
    >
      {text}
    </button>
  );
};

export default Button;
