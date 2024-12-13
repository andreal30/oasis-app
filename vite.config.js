import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  root: "./", // Ensure the root is set correctly (usually './')
  base: "./", // Relative paths for assets
  build: {
    outDir: "dist", // Ensure this matches where you expect files to be output
  },
  server: {
    host: true, // Allows the server to be accessible from an external network
    port: 5173, // Optional: specify a custom port
  },
});
