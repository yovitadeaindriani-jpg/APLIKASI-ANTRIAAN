import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

const halaman = (berkas) =>
  fileURLToPath(new URL(berkas, import.meta.url));

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        home: halaman("./index.html"),
        takeQueue: halaman("./take-queue.html"),
        adminLogin: halaman("./admin-login.html"),
        adminDashboard: halaman("./admin-dashboard.html"),
      },
    },
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
    watch: {
      usePolling: true,
      interval: 300,
    },
  },
});
