import Link from "next/link";
import React from "react";
import { useState } from "react";

function ListaSeries({ series, onSeriesClick }) {
  const [filasSeleccionadas, setFilasSeleccionadas] = useState([]);

  const toggleFilaSeleccionada = (id) => {
    if (filasSeleccionadas.includes(id)) {
      setFilasSeleccionadas(
        filasSeleccionadas.filter((filaId) => filaId !== id)
      );
    } else {
      setFilasSeleccionadas([...filasSeleccionadas, id]);
    }
  };
  return (
    <table className="border-collapse w-full border">
      <tbody>
        {series.map((serie) => (
          <tr
            key={product.id}
            className={
              filasSeleccionadas.includes(serie.id) ? "bg-blue-100" : "bg-white"
            }
            onClick={() => toggleFilaSeleccionada(serie.id)}
            style={{ cursor: "pointer" }}></tr>
        ))}
      </tbody>
    </table>
  );
}

export default ListaSeries;
