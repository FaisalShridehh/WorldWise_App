import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import CitiesProvider from "./Contexts/CitiesContext/CitiesContext.tsx";
import AuthProvider from "./Contexts/AuthContext/AuthContext.tsx";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <CitiesProvider>
        <App />
      </CitiesProvider>
    </AuthProvider>
  </React.StrictMode>
);
