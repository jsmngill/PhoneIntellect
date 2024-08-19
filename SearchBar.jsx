import React from 'react';

const SearchBar = ({ placeholder, value, onChange }) => {
  const handleChange = (e) => {
    onChange(e.target.value); // Pass the updated value to the parent component
  };

  return (
    <div className="m-4 w-full ">
      <input
        type="text"
        className = "border border-gray-200 rounded-md px-4 py-2 w-full text-base focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
        placeholder={placeholder}
        value={value}
        onChange={handleChange} 
      />
      
    </div>
  );
};

export default SearchBar;
