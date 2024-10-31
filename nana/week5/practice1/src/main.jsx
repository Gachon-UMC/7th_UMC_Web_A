import React from "react";
import App from "./App.jsx";
import { createRoot } from 'react-dom/client'; // 올바른 import 경로

const root = createRoot(document.getElementById('root'));
root.render(
    <App />
);
