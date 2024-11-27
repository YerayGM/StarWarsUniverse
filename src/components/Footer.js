import React from "react";

const Footer = () => (
  <footer className="bg-gray-800 text-gray-400 text-center py-4">
    <p>
      © {new Date().getFullYear()} Star Wars Explorer. Hecho con{" "}
      <span className="text-red-600">❤</span> por fans.
    </p>
  </footer>
);

export default Footer;
