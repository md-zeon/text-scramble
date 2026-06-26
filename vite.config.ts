import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      tsconfigPath: "./tsconfig.app.json",
      entryRoot: "src",
      exclude: ["src/App.tsx", "src/main.tsx"],
    }),
  ],
  build: {
    lib: {
      entry: "src/index.ts",
      name: "TextScramble",
      formats: ["es"],
      fileName: "index",
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
    },
  },
});