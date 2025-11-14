export const Loading = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600 text-lg">Cargando...</p>
      </div>
    </div>
  );
};
