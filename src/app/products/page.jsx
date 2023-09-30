"use client";
// Página Product.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import ListaSeries from "../../components/ListaSeries";
import NuevoSerie from "../../components/NuevoSerie";
import ModificarSerie from "../../components/ModificarSerie";
import AnularSerie from "../../components/AnulacionSerie";
import { useRouter } from "next/navigation";

// ... (código anterior)

export default function Product() {
  const router = useRouter();
  const [selectedSerieId, setSelectedSerieId] = useState(null); // Almacena el ID de la serie seleccionada

  const [series, setSeries] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [selectedSerie, setSelectedSerie] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(true); // Estado para mostrar el formulario de edición
  const [editingSerie, setEditingSerie] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/products");
        setSeries(response.data);
      } catch (error) {
        console.error("Error al obtener la lista de series:", error);
      }
    };

    fetchData();
  }, [refresh]);

  const handleRowClick = (serieId) => {
    // Obtener la serie seleccionada por su ID
    const selected = series.find((serie) => serie.id === serieId);

    // Alternar la selección de la serie cuando se hace clic en una fila
    if (selectedSerieId === serieId) {
      setSelectedSerieId(null); // Deseleccionar la serie
      setSelectedSerie(null); // También debes deseleccionar la serie en selectedSerie
      console.log("Deselección ID:", serieId);
    } else {
      setSelectedSerieId(serieId); // Seleccionar la serie por su ID
      setSelectedSerie(selected); // Configurar selectedSerie con los datos de la serie
      console.log("Selección ID:", serieId);
      console.log("Selección ID:", selected);
    }
  };

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  const handleCreateSerie = (formData) => {
    axios
      .post("/api/products", formData)
      .then(() => {
        setRefresh(!refresh);
        setShowCreateForm(false); // Ocultar el formulario después de crear la serie
      })
      .catch((error) => {
        console.error("Error al crear la serie:", error);
      });
  };

  const handleCancelar = () => {
    // Esta función se llama cuando se hace clic en "Cancelar"
    // Simplemente oculta el formulario sin guardar nada

    setShowCreateForm(false);
    setShowEditForm(false); // Ocultar el formulario de edición cuando se cancela
  };

  const handleEditSerie = () => {
    if (selectedSerie) {
      setShowEditForm(true);
    }
  };

  const handleDeleteSerie = () => {
    if (selectedSerie) {
      const confirmDelete = window.confirm("¿Seguro desea eliminar la serie?");
      if (confirmDelete) {
        // Si el usuario hace clic en "Aceptar" en el cuadro de diálogo, procede a eliminar la serie
        axios
          .delete(`/api/products/${selectedSerie.id}`)
          .then(() => {
            setRefresh(!refresh);
            setSelectedSerie(null);
          })
          .catch((error) => {
            console.error("Error al eliminar la serie:", error);
          });
      }
    }
  };

  const handleAnularSerie = (serieId) => {
    if (selectedSerie) {
      axios
        .put(`/api/products/${serieId}`, { estado: "Anulada" })
        .then(() => {
          setRefresh(!refresh);
          setSelectedSerie(null);
        })
        .catch((error) => {
          console.error("Error al anular la serie:", error);
        });
    }
  };

  return (
    <div>
      <div>
        <h1 className="text-3xl font-semibold mt-8 mb-8 text-center text-blue-500">
          Administrador de Series
        </h1>
      </div>
      <div className="mt-10">
        <button
          onClick={handleRefresh}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2 ">
          Actualizar Lista
        </button>
      </div>
      <div className="mt-8">
        <div className="mt-4 mx-4 max-h-[400px] overflow-y-auto">
          <table className="border-collapse w-full border">
            <thead>
              <tr className="bg-gray-100 sticky top-0">
                <th className="border p-2  text-gray-700 ">Título</th>
                <th className="border p-2  text-gray-700">Descripción</th>
                <th className="border p-2  text-gray-700 w-1/12">
                  Fecha de Estreno
                </th>
                <th
                  className="border p-2  text-gray-700 w-1/12"
                  style={{ width: "3.33333%" }}>
                  Estrellas
                </th>
                <th
                  className="border p-2  text-gray-700"
                  style={{ width: "8.33333%" }}>
                  Género
                </th>
                <th className="border p-2  text-gray-700 w-1/12">
                  Precio Alquiler
                </th>
                <th
                  className="border p-2  text-gray-700"
                  style={{ width: "3.33333%" }}>
                  ATP
                </th>
                <th
                  className="border p-2  text-gray-700 w-1/12"
                  style={{ width: "1.33333%" }}>
                  Estado
                </th>
              </tr>
            </thead>
            <tbody>
              {series.map((serie) => (
                <tr
                  key={serie.id}
                  className={`bg-white ${
                    selectedSerieId === serie.id ? "bg-blue-200" : ""
                  }`}
                  onClick={() => handleRowClick(serie.id)} // Manejar la selección al hacer clic en la fila
                  style={{ cursor: "pointer" }} // Cambiar el cursor al hacer clic
                >
                  <td className="border p-2 text-gray-700 ">{serie.titulo}</td>
                  <td className="border p-2 text-gray-700">
                    {serie.descripcion}
                  </td>
                  <td className="border p-2 text-gray-700">
                    {new Date(serie.fecha_estreno).toLocaleDateString()}
                  </td>
                  <td className="border p-2 text-gray-700">
                    {serie.estrellas}
                  </td>
                  <td className="border p-2 text-gray-700">{serie.genero}</td>
                  <td className="border p-2 text-gray-700">
                    {serie.precio_alquiler}
                  </td>
                  <td className="border p-2 text-gray-700">
                    {serie.atp ? "Sí" : "No"}
                  </td>
                  <td className="border p-2 text-gray-700">{serie.estado}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-4 space-x-2">
        <button
          onClick={() => setShowCreateForm(true)} // Mostrar el formulario de creación al hacer clic
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
          Crear Serie
        </button>
        <button
          onClick={handleEditSerie}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded">
          Editar Serie
        </button>

        <button
          onClick={() => handleDeleteSerie(selectedSerie.id)}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
          Eliminar Serie
        </button>
        <button
          onClick={() => handleAnularSerie(selectedSerie.id)}
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
          Anular Serie
        </button>
        <button
          onClick={() => {
            router.push("/");
          }}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded absolute  right-4">
          Salir
        </button>
      </div>
      {showCreateForm && (
        <NuevoSerie onCreate={handleCreateSerie} onCancel={handleCancelar} />
      )}
      {showEditForm && selectedSerie && (
        <ModificarSerie
          serieId={selectedSerie.id}
          onCancel={() => {
            setShowEditForm(false);
          }}
          onModify={() => {
            setShowEditForm(false);
            setRefresh(!refresh);
          }}
        />
      )}
    </div>
  );
}
