import React, { useState, useEffect } from "react";

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [films, setFilms] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [section, setSection] = useState("characters");

  // Cargar personajes desde localStorage o la API
  useEffect(() => {
    const cachedData = localStorage.getItem("characters");
    if (cachedData) {
      setCharacters(JSON.parse(cachedData));
    } else {
      fetch("https://swapi.dev/api/people/")
        .then((response) => response.json())
        .then((data) => {
          setCharacters(data.results);
          localStorage.setItem("characters", JSON.stringify(data.results));
        })
        .catch((error) => console.error("Error fetching characters:", error));
    }
  }, []);

  // Fetch y configuración de vehículos
  useEffect(() => {
    fetch("https://swapi.dev/api/vehicles/")
      .then((response) => response.json())
      .then((data) => setVehicles(data.results))
      .catch((error) => console.error("Error fetching vehicles:", error));
  }, []);

  // Fetch y configuración de planetas
  useEffect(() => {
    fetch("https://swapi.dev/api/planets/")
      .then((response) => response.json())
      .then((data) => setPlanets(data.results))
      .catch((error) => console.error("Error fetching planets:", error));
  }, []);

  // Fetch y configuración de películas
  useEffect(() => {
    fetch("https://swapi.dev/api/films/")
      .then((response) => response.json())
      .then((data) => setFilms(data.results))
      .catch((error) => console.error("Error fetching films:", error));
  }, []);

  const handleCardClick = (item) => {
    setSelectedItem(item);
  };

  const renderCards = (items) => {
    return items.map((item, index) => {
      const itemId = item.url.match(/\/([0-9]*)\/$/)[1];
      return (
        <div
          key={index}
          className="bg-gray-800 rounded-lg shadow-md p-4 text-center hover:bg-gray-700 cursor-pointer"
          onClick={() => handleCardClick(item)}
        >
          <img
            src={`https://starwars-visualguide.com/assets/img/${
              section === "characters" ? "characters" : section
            }/${itemId}.jpg`}
            alt={item.name || item.title}
            onError={(e) =>
              (e.target.src =
                "https://starwars-visualguide.com/assets/img/placeholder.jpg")
            }
            className="rounded-lg mb-4 w-full h-48 object-cover"
          />
          <h3 className="text-lg font-bold">{item.name || item.title}</h3>
        </div>
      );
    });
  };

  // Mostrar detalles estructurados para cada tipo de item
  const renderSelectedItemDetails = () => {
    if (!selectedItem) return null;

    let details;
    if (section === "characters") {
      details = (
        <div>
          <p><strong>Height:</strong> {selectedItem.height} cm</p>
          <p><strong>Mass:</strong> {selectedItem.mass} kg</p>
          <p><strong>Gender:</strong> {selectedItem.gender}</p>
          <p><strong>Birth Year:</strong> {selectedItem.birth_year}</p>
        </div>
      );
    } else if (section === "planets") {
      details = (
        <div>
          <p><strong>Name:</strong> {selectedItem.name}</p>
          <p><strong>Climate:</strong> {selectedItem.climate}</p>
          <p><strong>Population:</strong> {selectedItem.population}</p>
        </div>
      );
    } else if (section === "vehicles") {
      details = (
        <div>
          <p><strong>Model:</strong> {selectedItem.model}</p>
          <p><strong>Manufacturer:</strong> {selectedItem.manufacturer}</p>
          <p><strong>Cost in Credits:</strong> {selectedItem.cost_in_credits}</p>
        </div>
      );
    } else if (section === "films") {
      details = (
        <div>
          <p><strong>Title:</strong> {selectedItem.title}</p>
          <p><strong>Director:</strong> {selectedItem.director}</p>
          <p><strong>Release Date:</strong> {selectedItem.release_date}</p>
        </div>
      );
    }

    return details;
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <nav className="w-full bg-gray-800 shadow-lg p-3 flex justify-between items-center">
        <a href="#" className="text-2xl font-bold text-yellow-400">
          Star Wars
        </a>
        <div className="space-x-4">
          <button
            onClick={() => setSection("characters")}
            className="text-gray-400 hover:text-yellow-400"
          >
            Personajes
          </button>
          <button
            onClick={() => setSection("planets")}
            className="text-gray-400 hover:text-yellow-400"
          >
            Planetas
          </button>
          <button
            onClick={() => setSection("vehicles")}
            className="text-gray-400 hover:text-yellow-400"
          >
            Vehículos
          </button>
          <button
            onClick={() => setSection("films")}
            className="text-gray-400 hover:text-yellow-400"
          >
            Películas
          </button>
        </div>
      </nav>

      <header className="text-center my-10">
        <h1 className="text-5xl font-extrabold text-yellow-400 mb-6">
          Explora el Universo Star Wars
        </h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Descubre personajes, planetas, vehículos y películas icónicos de Star Wars.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-6 max-w-6xl mx-auto">
        {section === "characters" && renderCards(characters)}
        {section === "planets" && renderCards(planets)}
        {section === "vehicles" && renderCards(vehicles)}
        {section === "films" && renderCards(films)}
      </div>

      {selectedItem && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-90 flex items-center justify-center z-50 p-6">
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg max-w-xl text-white text-center">
            <img
              src={`https://starwars-visualguide.com/assets/img/${
                section === "characters" ? "characters" : section
              }/${selectedItem.url.match(/\/([0-9]*)\/$/)[1]}.jpg`}
              alt={selectedItem.name || selectedItem.title}
              onError={(e) =>
                (e.target.src =
                  "https://starwars-visualguide.com/assets/img/placeholder.jpg")
              }
              className="rounded-lg mb-4 w-full h-64 object-cover"
            />
            <h2 className="text-2xl font-bold mb-4">
              {selectedItem.name || selectedItem.title}
            </h2>
            {renderSelectedItemDetails()}
            <button
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              onClick={() => setSelectedItem(null)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      <footer className="w-full bg-gray-800 p-3 mt-6 text-center text-gray-300">
        <p>
          Hecho con la API{" "}
          <span className="text-red-500">SWAPI</span> por un fan de Star Wars.
        </p>
      </footer>
    </div>
  );
};

export default App;
