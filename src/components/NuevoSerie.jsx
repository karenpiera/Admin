"use client";
import { useState, useRef } from "react";
import axios from "axios";

export default function NuevoSerie({ onCancel }) {
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    fecha_estreno: "",
    estrellas: 0,
    genero: "",
    precio_alquiler: 0,
    atp: false,
    estado: "",
  });

  const form = useRef(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/products", formData);

      if (response.status === 200) {
        // Mostrar un alerta después de crear la serie
        alert("Serie creada exitosamente.");
      } else {
        // Mostrar un alerta en caso de que la respuesta no sea 201 (éxito)
        alert("Error al crear serie.");
      }
    } catch (error) {
      // Manejar el error si ocurre
      console.error("Error al crear la serie:", error);
      alert("Error al crear la serie.");
    } finally {
      // Restablecer el formulario independientemente del resultado
      setFormData({
        titulo: "",
        descripcion: "",
        fecha_estreno: "",
        estrellas: "",
        genero: "",
        precio_alquiler: "",
        atp: false,
        estado: "",
      });

      form.current.reset();
    }
  };

  const handleClose = () => {
    onCancel();
  };

  return (
    <div className="bg-white  text-gray-700 p-4 rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-2xl text-gray-700 mb-4">Nueva Serie</h2>
      <form onSubmit={handleSubmit} ref={form}>
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
            min={1}
            max={5}
            value={formData.estrellas}
            onChange={handleChange}
            required
            className="w-full px-3  text-gray-700 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="genero" className="block   text-gray-700 font-bold">
            Género:
          </label>
          <input
            type="text"
            id="genero"
            name="genero"
            value={formData.genero}
            onChange={handleChange}
            required
            className="w-full  text-gray-700 px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
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
          Crear Serie
        </button>
        <button
          type="button"
          onClick={handleClose}
          className="bg-gray-400 ay-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded">
          Cancelar
        </button>{" "}
      </form>
    </div>
  );
}
