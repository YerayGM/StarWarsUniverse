import React, { useEffect, useState } from "react";

const Modal = ({ item, setSelectedItem, section }) => {
  const [relatedData, setRelatedData] = useState({});

  // Función para obtener el ID desde la URL
  const getIdFromUrl = (url) => url.match(/\/([0-9]*)\/$/)[1];

  // Resolver URLs relacionadas
  useEffect(() => {
    const resolveUrls = async (urls) => {
      if (!urls || !urls.length) return [];
      try {
        const responses = await Promise.all(
          urls.map((url) => fetch(url).then((res) => res.json()))
        );
        return responses.map((res) => res.name || res.title || "Desconocido");
      } catch (error) {
        console.error("Error resolving URLs:", error);
        return [];
      }
    };

    const fetchRelatedData = async () => {
      const relatedFields = {
        characters: item.characters,
        starships: item.starships,
        vehicles: item.vehicles,
        planets: item.planets,
        residents: item.residents,
      };

      const resolvedData = {};
      for (const [field, urls] of Object.entries(relatedFields)) {
        if (urls) {
          resolvedData[field] = await resolveUrls(urls);
        }
      }

      setRelatedData(resolvedData);
    };

    fetchRelatedData();
  }, [item]);

  // Construir URL de la imagen basada en la sección
  const imageUrl = `https://starwars-visualguide.com/assets/img/${
    section === "characters" ? "characters" : section
  }/${getIdFromUrl(item.url)}.jpg`;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-90 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 shadow-lg max-w-2xl text-white relative">
        {/* Botón de cerrar */}
        <button
          onClick={() => setSelectedItem(null)}
          className="absolute top-4 right-4 bg-red-600 text-white rounded-full px-3 py-1 hover:bg-red-700"
        >
          X
        </button>

        {/* Imagen principal */}
        <img
          src={imageUrl}
          alt={item.name || item.title}
          onError={(e) =>
            (e.target.src =
              "https://starwars-visualguide.com/assets/img/placeholder.jpg")
          }
          className="rounded-lg w-full mb-4"
        />

        {/* Información del elemento */}
        <h2 className="text-2xl font-bold mb-4 text-center">
          {item.title || item.name}
        </h2>
        <ul className="text-left text-gray-400 space-y-2">
          {item.director && (
            <li>
              <strong>Director:</strong> {item.director}
            </li>
          )}
          {item.producer && (
            <li>
              <strong>Productor:</strong> {item.producer}
            </li>
          )}
          {item.release_date && (
            <li>
              <strong>Fecha de estreno:</strong> {item.release_date}
            </li>
          )}
          {item.model && (
            <li>
              <strong>Modelo:</strong> {item.model}
            </li>
          )}
          {item.manufacturer && (
            <li>
              <strong>Fabricante:</strong> {item.manufacturer}
            </li>
          )}
          {item.population && (
            <li>
              <strong>Población:</strong> {item.population}
            </li>
          )}

          {/* Datos relacionados */}
          {relatedData.characters && (
            <li>
              <strong>Personajes:</strong>{" "}
              {relatedData.characters.join(", ") || "Cargando..."}
            </li>
          )}
          {relatedData.starships && (
            <li>
              <strong>Naves:</strong>{" "}
              {relatedData.starships.join(", ") || "Cargando..."}
            </li>
          )}
          {relatedData.vehicles && (
            <li>
              <strong>Vehículos:</strong>{" "}
              {relatedData.vehicles.join(", ") || "Cargando..."}
            </li>
          )}
          {relatedData.planets && (
            <li>
              <strong>Planetas:</strong>{" "}
              {relatedData.planets.join(", ") || "Cargando..."}
            </li>
          )}
          {relatedData.residents && (
            <li>
              <strong>Residentes:</strong>{" "}
              {relatedData.residents.join(", ") || "Cargando..."}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Modal;
