export const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-2 mt-auto">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Superhéroes App. Todos los derechos
          reservados.
        </p>
        <p className="text-xs mt-2 text-gray-400">Desarrollado por IPF</p>
      </div>
    </footer>
  );
};
