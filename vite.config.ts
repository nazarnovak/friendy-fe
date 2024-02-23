import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
// Proxy for local development
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: "/src",
    },
  },
  server: {
      proxy: {
        "/feedback": {
          target: "http://localhost:8080",
          changeOrigin: false,
          secure: false,
        },
      },
    },
//   server: {
//       proxy: {
//         "/track": {
//           target: "http://localhost:8080",
//           changeOrigin: false,
//           secure: false,
//         },
//       },
//     },
//   server: {
//       proxy: {
//         "/payment": {
//           target: "http://localhost:8080",
//           changeOrigin: false,
//           secure: false,
//         },
//       },
//     },
});
