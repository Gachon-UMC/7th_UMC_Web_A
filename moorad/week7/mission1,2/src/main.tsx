import { createRoot } from "react-dom/client";
import "./index.css";
import Routing from "./router/Routing";
import { RecoilRoot } from "recoil";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
    <RecoilRoot>
        <QueryClientProvider client={queryClient}>
            <Routing />
            {/* <ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools> */}
        </QueryClientProvider>
    </RecoilRoot>
);
