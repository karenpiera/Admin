import { useState } from "react";
import axios from "axios";

export default function AnularActivarSerie({
  serieId,
  onSerieAnulada,
  onSerieActivada,
}) {
  const [mensaje, setMensaje] = useState("");

  const handleAnular = async () => {
    try {
      // Realizar una solicitud PUT para anular la serie
      const response = await axios.put(`/api/products/anular/${serieId}`);

      if (response.status === 200) {
        setMensaje("Serie anulada exitosamente.");
        onSerieAnulada(); // Llamar a la función proporcionada cuando la serie se anula con éxito
      }
    } catch (error) {
      setMensaje("Error al anular la serie.");
    }
  };

  const handleActivar = async () => {
    try {
      // Realizar una solicitud PUT para activar la serie
      const response = await axios.put(`/api/products/activar/${serieId}`);

      if (response.status === 200) {
        setMensaje("Serie activada exitosamente.");
        onSerieActivada(); // Llamar a la función proporcionada cuando la serie se activa con éxito
      }
    } catch (error) {
      setMensaje("Error al activar la serie.");
    }
  };

  return (
    <div>
      <h2>Anular/Activar Serie</h2>
      <button type="button" onClick={handleAnular}>
        Anular
      </button>
      <button type="button" onClick={handleActivar}>
        Activar
      </button>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}
