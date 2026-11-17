import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => {
  const devEnv = loadEnv(mode, __dirname, "AIRAPART_DEV_");

  return {
    base: "/",
    cacheDir: devEnv.AIRAPART_DEV_CACHE_DIR,
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
          target: mode === "development"
            ? devEnv.AIRAPART_DEV_API_TARGET || "http://localhost:8000"
            : "https://airapartmv.ru",
          changeOrigin: true,
          secure: true,
          rewrite: path => path,
        },
      },
    },
  };
});
