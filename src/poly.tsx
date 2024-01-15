import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

export function createPoly(name: string) {
  ReactDOM.createRoot(document.getElementById(name)!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
