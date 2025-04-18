import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": {}, // Fix for 'process' not defined in browser
  },
  build: {
    lib: {
      entry: "src/main.tsx", // Your main entry point
      name: "Voiza", // Name of your library for global access
      fileName: "voiza-widget", // Name of output file
      formats: ["iife"], // IIFE for CDN support
    },
    // Ensure all CSS is bundled inside the JS file
    cssCodeSplit: false, // Disable CSS code splitting
    rollupOptions: {
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
