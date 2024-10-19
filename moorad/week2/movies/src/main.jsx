import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import Routing from "./Routing.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <Routing />
    </BrowserRouter>
);
