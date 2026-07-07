import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./router";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import LorenzAttractor from "@/pages/home/components/LorenzAttractor";


function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <BrowserRouter basename={__BASE_PATH__}>
        {/* Fixed dark background layer */}
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: -10,
            backgroundColor: "#3d6b62",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg"
            alt=""
            aria-hidden="true"
            className="w-full max-w-5xl h-auto object-contain"
            style={{ opacity: 0.3 }}
          />
        </div>

        {/* Lorenz attractor fixed canvas */}
        <LorenzAttractor />

        <AppRoutes />
      </BrowserRouter>
    </I18nextProvider>
  );
}

export default App;
