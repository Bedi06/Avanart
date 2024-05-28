import React from "react";
import { BrowserRouter as Router } from "react-router-dom"; // Import BrowserRouter
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App/App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);

reportWebVitals();
