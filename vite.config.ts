import { defineConfig } from "vite";
import vue2 from "@vitejs/plugin-vue2";
import vue3 from "@vitejs/plugin-vue";
import path from "path";
import dts from "vite-plugin-dts";
import { isVue2, isVue3 } from "vue-demi";
import * as compiler from "@vue/compiler-sfc";

console.log({ isVue2, isVue3 });

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
    target: "es2018", // 将目标改为 es2018
    outDir: isVue2 ? "lib/vue2" : "lib/vue3",
    emptyOutDir: true,
    minify: false,
    sourcemap: false,
    lib: {
      formats: ["es", "cjs"],
      entry: path.resolve("src/index.ts"),
      name: "tonconnect-vue", // 修改库的名称为 Vue 版本
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
      external: ["vue", "vue-router", "@tonconnect/ui"], // 替换 external 中的依赖
      output: {
        globals: {
          vue: "Vue", // 修改全局变量映射
          "vue-router": "VueRouter", // 修改全局变量映射
          "@tonconnect/ui": "TON_CONNECT_UI",
        },
      },
    },
  },
});
