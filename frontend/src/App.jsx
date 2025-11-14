import { AppRouter } from "./router/AppRouter";

export const App = () => {
  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr_auto]">
      <AppRouter />
    </div>
  );
};
