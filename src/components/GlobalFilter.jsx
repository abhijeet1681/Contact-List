import React from 'react';
import { FaSearch } from 'react-icons/fa';

const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <div className="relative">
      <FaSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        value={filter || ''}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Search..."
        className="pl-10 p-2 border bg-white border-gray-300 rounded-md w-full sm:w-auto"
      />
    </div>
  );
};

export default GlobalFilter;