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

  const speakText = (text) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Lo siento, tu navegador no soporta la síntesis de voz.");
    }
  };

  const renderCards = (items) => {
    return items.map((item, index) => {
      const itemId = item.url.match(/\/([0-9]*)\/$/)[1];
      const itemDetails =
        section === "characters"
          ? `Nombre: ${item.name}, Altura: ${item.height} cm, Peso: ${item.mass} kg, Género: ${item.gender}, Año de nacimiento: ${item.birth_year}`
          : section === "planets"
          ? `Nombre: ${item.name}, Clima: ${item.climate}, Población: ${item.population}`
          : section === "vehicles"
          ? `Modelo: ${item.model}, Fabricante: ${item.manufacturer}, Coste en créditos: ${item.cost_in_credits}`
          : `Título: ${item.title}, Director: ${item.director}, Fecha de lanzamiento: ${item.release_date}`;

      return (
        <div
          key={index}
          className="bg-gray-800 rounded-lg shadow-md p-4 text-center hover:bg-gray-700 cursor-pointer"
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
          <button
            onClick={() => speakText(itemDetails)}
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Leer contenido
          </button>
          <button
            onClick={() => handleCardClick(item)}
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Ver detalles
          </button>
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
          <p>
            <strong>Altura:</strong> {selectedItem.height} cm
          </p>
          <p>
            <strong>Peso:</strong> {selectedItem.mass} kg
          </p>
          <p>
            <strong>Género:</strong> {selectedItem.gender}
          </p>
          <p>
            <strong>Año de nacimiento:</strong> {selectedItem.birth_year}
          </p>
        </div>
      );
    } else if (section === "planets") {
      details = (
        <div>
          <p>
            <strong>Nombre:</strong> {selectedItem.name}
          </p>
          <p>
            <strong>Clima:</strong> {selectedItem.climate}
          </p>
          <p>
            <strong>Población:</strong> {selectedItem.population}
          </p>
        </div>
      );
    } else if (section === "vehicles") {
      details = (
        <div>
          <p>
            <strong>Modelo:</strong> {selectedItem.model}
          </p>
          <p>
            <strong>Fabricante:</strong> {selectedItem.manufacturer}
          </p>
          <p>
            <strong>Coste en créditos:</strong> {selectedItem.cost_in_credits}
          </p>
        </div>
      );
    } else if (section === "films") {
      details = (
        <div>
          <p>
            <strong>Título:</strong> {selectedItem.title}
          </p>
          <p>
            <strong>Director:</strong> {selectedItem.director}
          </p>
          <p>
            <strong>Fecha de lanzamiento:</strong> {selectedItem.release_date}
          </p>
        </div>
      );
    }

    return details;
  };

  const videoIds = {
    characters: '_V97ESHV2RA',
    planets: 'ko7u2NOiD5Y',
    vehicles: '4hUoANO1Fuc',
    films: 'U1MnMA0TzGI',
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
          Descubre personajes, planetas, vehículos y películas icónicos de Star
          Wars.
        </p>
      </header>

      <div className="flex justify-center mb-10">
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${videoIds[section]}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

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

      <footer className="w-full bg-gray-800 p-3 mt-6 text-center text-gray-300 flex flex-col items-center">
        <p className="mb-2">
          <a property="dct:title" rel="cc:attributionURL" href="https://github.com/YerayGM/StarWarsUniverse">
            StarWarsUniverse
          </a> by <span property="cc:attributionName">Yeray y Pablo</span> is licensed under 
          <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style={{ display: "inline-block" }}>
            CC BY-NC-ND 4.0
            <span style={{ display: "inline-flex", alignItems: "center" }}>
              <img style={{ height: "22px", marginLeft: "3px", verticalAlign: "text-bottom" }} src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1" alt="cc" />
              <img style={{ height: "22px", marginLeft: "3px", verticalAlign: "text-bottom" }} src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1" alt="by" />
              <img style={{ height: "22px", marginLeft: "3px", verticalAlign: "text-bottom" }} src="https://mirrors.creativecommons.org/presskit/icons/nc.svg?ref=chooser-v1" alt="nc" />
              <img style={{ height: "22px", marginLeft: "3px", verticalAlign: "text-bottom" }} src="https://mirrors.creativecommons.org/presskit/icons/nd.svg?ref=chooser-v1" alt="nd" />
            </span>
          </a>
        </p>
        <img src="https://www.w3.org/WAI/wcag2AA-blue.png" alt="WCAG 2.0 AA" style={{ height: "50px", marginTop: "10px" }} />
      </footer>
    </div>
  );
};

export default App;
