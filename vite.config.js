import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss(), solidPlugin()],
  server: {
<<<<<<< HEAD
    port: 3180,
=======
    port: 3111,
>>>>>>> 55f2a92 (FEAT : applying last revision)
  },
  build: {
    target: "esnext",
  },
});
