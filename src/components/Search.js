import React from "react";

const Search = ({ searchQuery, setSearchQuery }) => (
  <div className="text-center mb-8">
    <input
      type="text"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="Buscar..."
      className="w-1/2 p-3 rounded-lg bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
    />
  </div>
);

export default Search;
