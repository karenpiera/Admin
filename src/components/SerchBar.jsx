import React, { useState, useEffect } from "react";

function SearchBar({ series, selectedSerieId, handleRowClick }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSeries, setFilteredSeries] = useState([]);

  useEffect(() => {
    const filterSeries = () => {
      const filtered = series.filter((serie) =>
        serie.titulo.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredSeries(filtered);
    };

    filterSeries();
  }, [searchTerm, series]);

  return (
    <div>
      <h2>SearchBar</h2>
      <input
        type="text"
        placeholder="Buscar serie por nombre"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 rounded-lg text-gray-700"
      />
      <table className="border-collapse w-full border">
        <thead>
          <tr className="bg-gray-100 sticky top-0">
            <th className="border p-2  text-gray-700 ">Título</th>
          </tr>
        </thead>
        <tbody>
          {filteredSeries.map((serie) => (
            <tr
              key={serie.id}
              className={`bg-white ${
                selectedSerieId === serie.id ? "bg-blue-200" : ""
              }`}
              onClick={() => handleRowClick(serie.id)}
              style={{ cursor: "pointer" }}>
              <td className="border p-2 text-gray-700 ">{serie.titulo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SearchBar;
