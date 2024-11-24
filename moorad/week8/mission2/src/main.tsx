import "./tailwind.css";
import { createRoot } from "react-dom/client";
import Routing from "./Routing.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
    <QueryClientProvider client={queryClient}>
        <Routing />
    </QueryClientProvider>
);
