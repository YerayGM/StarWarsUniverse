import React from "react";

const ContentSection = ({ data, section, setSelectedItem }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
    {data.map((item) => (
      <div
        key={item.url}
        className="bg-gray-800 rounded-lg shadow-md p-4 text-center hover:bg-gray-700 cursor-pointer"
        onClick={() => setSelectedItem(item)}
      >
        <img
          src={`https://starwars-visualguide.com/assets/img/${
            section === "films" ? "films" : section
          }/${item.url.match(/\/([0-9]*)\/$/)[1]}.jpg`}
          alt={item.title || item.name}
          onError={(e) =>
            (e.target.src =
              "https://starwars-visualguide.com/assets/img/placeholder.jpg")
          }
          className="rounded-lg mb-4 w-full h-48 object-cover"
        />
        <h3 className="text-lg font-bold">{item.title || item.name}</h3>
      </div>
    ))}
  </div>
);

export default ContentSection;
