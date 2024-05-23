import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    vue(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  optimizeDeps: {
    exclude: ["csstype"],
  },
  build: {
    target: "es6",
    outDir: "lib",
    emptyOutDir: true,
    minify: false,
    sourcemap: true,
    lib: {
      formats: ["es", "cjs"],
      entry: path.resolve("src/index.ts"),
      name: "@townsquarexyz/ui-vue",
      fileName: (format) => {
        switch (format) {
          case "es":
            return "index.mjs";
          case "cjs":
            return "index.cjs";
          default:
            throw new Error("Unknown format");
        }
      },
    },
    rollupOptions: {
      external: ["vue", "@tonconnect/ui"],
      output: {
        globals: {
          vue: "Vue",
          "@tonconnect/ui": "TON_CONNECT_UI",
        },
      },
    },
  },
});
