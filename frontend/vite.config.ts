import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  base: "/",
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: "::",
    port: 3000,
    proxy: {
      "/api": {
        target: mode === "development" ? "http://localhost:8000" : "https://airapartmv.ru",
        changeOrigin: true,
        secure: true,
        rewrite: path => path,
      },
    },
  },
}));
