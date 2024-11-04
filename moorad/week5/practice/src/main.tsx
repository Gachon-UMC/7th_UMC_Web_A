import { createRoot } from "react-dom/client";
import "./index.css";
import Routing from "./router/Routing";

createRoot(document.getElementById("root")!).render(<Routing />);
