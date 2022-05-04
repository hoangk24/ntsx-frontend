import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import tsconfigPaths from "vite-tsconfig-paths";
const pathSrc = resolve(__dirname, "./src");

// https://vitejs.dev/config/
export default defineConfig({
 css: {
  preprocessorOptions: {
   // scss: {
   //  additionalData: `@import "${pathSrc}/assets/scss/variable.scss";`,
   // },
  },
 },
 plugins: [react(), tsconfigPaths()],
});
