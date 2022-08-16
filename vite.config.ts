import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import { join } from "node:path";

import viteCompression from "vite-plugin-compression";
import legacy from "@vitejs/plugin-legacy";

export default defineConfig(() => {
  return {
    plugins: [
      vue(),
      viteCompression(),
      legacy({
        targets: ["defaults", "not IE 11"],
      }),
    ],
    resolve: {
      alias: {
        "@": join(__dirname, "src"),
      },
    },
    server: {
      port: 3000,
      host: true,
    },
  };
});
