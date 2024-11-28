import React from "react";

const Navbar = ({ setActiveSection }) => {
  const sections = ["characters", "planets", "vehicles", "films"];
  return (
    <nav className="bg-gray-800 p-4 flex justify-around">
      {sections.map((section) => (
        <button
          key={section}
          className="text-yellow-400 hover:text-white"
          onClick={() => setActiveSection(section)}
        >
          {section.charAt(0).toUpperCase() + section.slice(1)}
        </button>
      ))}
    </nav>
  );
};

export default Navbar;
