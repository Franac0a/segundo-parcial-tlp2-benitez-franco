import { useEffect, useState } from "react";
import { Loading } from "../components/Loading";

export const HomePage = () => {
  // TODO: Integrar lógica para obtener superhéroes desde la API
  // TODO: Implementar useState para almacenar la lista de superhéroes
  // TODO: Implementar función para recargar superhéroes

  const [superheroes, setSuperheroes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reloading, setReloading] = useState(false);
  const [userName, setUserName] = useState("");

  // Obtener profile
  const fetchProfile = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/profile", {
        credentials: "include",
      });

      if (!res.ok) {
        return;
      }

      const data = await res.json();
      setUserName(data.name);
    } catch (error) {
      console.log("Error al obtener perfil:", error);
    }
  };

  const fetchSuperheroes = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/superheroes", {
        credentials: "include",
      });

      if (!res.ok) {
        console.log("Error:", res.status);
        setSuperheroes([]);
        return;
      }

      const data = await res.json();

      if (Array.isArray(data)) {
        setSuperheroes(data);
      } else {
        console.log("El backend NO devolvió un array:", data);
        setSuperheroes([]);
      }
    } catch (error) {
      console.log("Error al obtener superhéroes:", error);
      setSuperheroes([]);
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true);
        await fetchProfile();
        await fetchSuperheroes();
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  const handleReload = async () => {
    try {
      setReloading(true);
      await fetchSuperheroes();
    } catch (error) {
      // ya manejado en fetchSuperheroes
    } finally {
      setReloading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="container mx-auto px-4 pb-8">
      <h1 className="text-4xl font-bold text-center mt-8 mb-4 text-gray-800">
        Galería de Superhéroes
      </h1>

      {/* Mensaje de bienvenida pedido en las consignas */}
      <p className="text-center mb-4 text-gray-700">
        {userName ? `¡Bienvenido/a, ${userName}!` : "¡Bienvenido/a!"}
      </p>

      <div className="flex justify-center mb-8">
        <button
          onClick={handleReload} // TODO: Implementar función para recargar superhéroes
          disabled={reloading}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded transition-colors disabled:opacity-50"
        >
          {reloading ? "Recargando..." : "Recargar"}
        </button>
      </div>

      {superheroes.length === 0 ? (
        <p className="text-center text-gray-600">
          No hay superhéroes para mostrar.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {superheroes.map((hero) => (
            <div
              key={hero.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <img
                src={hero.image}
                alt={hero.superhero}
                className="h-64 object-cover w-full"
              />

              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  {hero.superhero}
                </h3>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
