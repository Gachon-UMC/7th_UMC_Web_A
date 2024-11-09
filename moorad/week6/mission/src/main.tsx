import { createRoot } from "react-dom/client";
import "./index.css";
import Routing from "./router/Routing";
import { RecoilRoot } from "recoil";

createRoot(document.getElementById("root")!).render(
    <RecoilRoot>
        <Routing />
    </RecoilRoot>
);
