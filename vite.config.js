import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Allows the server to be accessible from an external network
    port: 5173, // Optional: specify a custom port
  },
});
