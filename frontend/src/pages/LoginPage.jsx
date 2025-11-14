import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { useForm } from "../hooks/useForm";

export const LoginPage = () => {
  // TODO: Integrar lógica de autenticación aquí
  // TODO: Implementar useForm para el manejo del formulario
  // TODO: Implementar función handleSubmit

  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const { formState, username, password, handleChange } = useForm({
    username: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);

    if (!username || !password) {
      setError(true);
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        setError(true);
        return;
      }

      navigate("/home");
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8">
        {/* Título */}
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Iniciar Sesión
        </h2>

        {/* TODO: Mostrar este div cuando haya error */}
        <div
          className={`${
            error ? "" : "hidden"
          } bg-red-100 text-red-700 p-3 rounded mb-4`}
        >
          <p className="text-sm">
            Credenciales incorrectas. Intenta nuevamente.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 font-medium mb-2"
            >
              Usuario
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Ingresa tu usuario"
              value={username}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded transition-colors"
          >
            {loading ? "Cargando..." : "Ingresar"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          ¿No tienes cuenta?
          <Link
            to="/register"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
};
