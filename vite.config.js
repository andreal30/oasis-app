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
});
