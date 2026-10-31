import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import Admin from "./Admin.jsx";
import "./index.css";

// Address /admin ho to Admin page dikhao, warna normal portfolio
const isAdmin = window.location.pathname.startsWith("/admin");

createRoot(document.getElementById("root")).render(isAdmin ? <Admin /> : <App />);