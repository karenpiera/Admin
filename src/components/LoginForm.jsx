"use client";
import { useRouter } from "next/navigation"; // Importa useRouter desde next/navigation
import { useState } from "react";

export default function LoginForm() {
  const router = useRouter(); // Obtiene el router de Next.js
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleEmailChange = (e) => {
    setEmail(e.target.value); // Actualiza el estado del correo electrónico mientras se escribe
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value); // Actualiza el estado de la contraseña mientras se escribe
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Verifica las credenciales aquí y redirige a la página de productos si son correctas
    if (email === "hola@pragmasoft.com.ar" && password === "12345678") {
      router.push("/products"); // Redirige a la página de productos
    } else {
      setError("Usuario o contraseña incorrectos");
      router.refresh();
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h1 className="text-3xl font-semibold mb-6 text-center text-blue-500">
        Bienvenido Administrador
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-medium mb-2">
            Correo Electrónico
          </label>
          <input
            type="text"
            id="email"
            className="w-full px-3  text-gray-700 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Correo Electrónico"
            value={email}
            onChange={handleEmailChange} // Usa la función para actualizar el correo electrónico
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-medium mb-2">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            className="w-full px-3 py-2  text-gray-700 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Contraseña"
            value={password}
            onChange={handlePasswordChange} // Usa la función para actualizar la contraseña
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300">
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
}
