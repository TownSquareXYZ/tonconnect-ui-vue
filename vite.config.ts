import { defineConfig } from "vite";
import vue2 from "@vitejs/plugin-vue2";
import vue3 from "@vitejs/plugin-vue";
import path from "path";
import dts from "vite-plugin-dts";
import { isVue2 } from "vue-demi";
import * as compiler from "@vue/compiler-sfc";

export default defineConfig({
  plugins: [
    isVue2
      ? vue2()
      : vue3({
          compiler: compiler as any,
        }),
    dts({
      insertTypesEntry: true,
    }),
  ],
  optimizeDeps: {
    exclude: ["csstype", "vue-demi"],
  },
  build: {
    target: "es2018",
    outDir: 'lib',
    emptyOutDir: true,
    minify: false,
    sourcemap: false,
    lib: {
      formats: ["es", "cjs"],
      entry: path.resolve("src/index.ts"),
      name: "@townsquarelabs/ui-vue",
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
      external: ["vue", "@tonconnect/ui", "vue-demi"],
      output: {
        globals: {
          vue: "Vue",
          "@tonconnect/ui": "TON_CONNECT_UI",
          "vue-demi": "VueDemi",
        },
      },
    },
  },
});
