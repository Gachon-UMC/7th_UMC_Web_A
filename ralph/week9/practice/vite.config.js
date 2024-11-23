import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    optimizeDeps: {
        include: ["recoil", "react-query"], // Recoil을 명시적으로 포함
    },
});
