"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function ModificarSerie({ serieId, onCancel, onModify }) {
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    fecha_estreno: "",
    estrellas: "",
    genero: "",
    precio_alquiler: "",
    atp: false,
    estado: "",
  });
  const generosDeSeries = [
    "Acción",
    "Comedia",
    "Drama",
    "Ciencia ficción",
    "Aventura",
    "Fantasía",
    "Romance",
    "Suspense",
    "Documental",
    "Animación",
  ];

  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    // Realizar una solicitud GET para obtener los datos de la serie
    const obtenerDatosSerie = async () => {
      try {
        const response = await axios.get(`/api/products/${serieId}`);
        const serie = response.data;
        const fechaISO = new Date(serie.fecha_estreno)
          .toISOString()
          .split("T")[0];
        setFormData({
          titulo: serie.titulo,
          descripcion: serie.descripcion,
          fecha_estreno: fechaISO,
          estrellas: serie.estrellas,
          genero: serie.genero,
          precio_alquiler: serie.precio_alquiler,
          atp: serie.atp,
          estado: serie.estado,
        });
        setShowForm(true); // Mostrar el formulario después de cargar los datos
      } catch (error) {
        console.error("Error al obtener datos de la serie:", error);
        setMensaje("Error al cargar los datos de la serie.");
      }
    };

    obtenerDatosSerie();
  }, [serieId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Realizar una solicitud PUT para actualizar la serie
      const response = await axios.put(`/api/products/${serieId}`, formData);

      if (response.status === 200) {
        setMensaje("Serie modificada exitosamente.");
        onModify(); // Llama a la función proporcionada cuando se modifica la serie
      }
    } catch (error) {
      setMensaje("Error al modificar la serie.");
    }
  };
  const handleClose = () => {
    onCancel();
  };

  return (
    <div className="bg-white  text-gray-700 p-4 rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-2xl text-gray-700 mb-4">Modificar Serie</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="titulo" className="block  text-gray-700 font-bold">
            Título:
          </label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            required
            className="w-full px-3 py-2  text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="descripcion"
            className="block   text-gray-700 font-bold">
            Descripción:
          </label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            required
            className="w-full px-3 py-2  text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"></textarea>
        </div>
        <div className="mb-4">
          <label
            htmlFor="fecha_estreno"
            className="block  text-gray-700 font-bold">
            Fecha de Estreno:
          </label>
          <input
            type="date"
            id="fecha_estreno"
            name="fecha_estreno"
            value={formData.fecha_estreno}
            onChange={handleChange}
            required
            className="w-full px-3  text-gray-700 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="estrellas" className="block   font-bold">
            Estrellas:
          </label>
          <input
            type="number"
            id="estrellas"
            name="estrellas"
            value={formData.estrellas}
            onChange={handleChange}
            required
            className="w-full px-3  text-gray-700 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="genero" className="block text-gray-700 font-bold">
            Género:
          </label>
          <select
            id="genero"
            name="genero"
            value={formData.genero}
            onChange={handleChange}
            required
            className="w-full text-gray-700 px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500">
            <option value="">Selecciona un género</option>
            {generosDeSeries.map((genero) => (
              <option key={genero} value={genero}>
                {genero}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="precio_alquiler"
            className="block  text-gray-700 font-bold">
            Precio de Alquiler:
          </label>
          <input
            type="number"
            id="precio_alquiler"
            name="precio_alquiler"
            value={formData.precio_alquiler}
            onChange={handleChange}
            required
            className="w-full  text-gray-700 px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="atp" className="block  text-gray-700 font-bold">
            ATP:
          </label>
          <input
            type="checkbox"
            id="atp"
            name="atp"
            checked={formData.atp}
            onChange={handleChange}
            className="border  rounded-lg focus:outline-none  text-gray-700 focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500  text-gray-700  px-4 py-2 rounded-lg hover:bg-blue-600">
          Modificar Serie
        </button>
        <button
          type="button"
          onClick={handleClose}
          className="bg-gray-400 ay-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded">
          Cancelar
        </button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}
