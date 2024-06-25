import dts from "rollup-plugin-dts";
// import vue from 'rollup-plugin-vue';
import vue from '@vitejs/plugin-vue2'
import ts from 'typescript';
import * as fs from 'fs';

const config = [
    {
        input: "./src/index.ts",
        output: [{ file: "lib/index.d.ts", format: "es" }],
        plugins: [
            vue(),
            dts({
                compilerOptions: {
                    baseUrl: './',
                    paths: ts.readConfigFile('./tsconfig.json', p => fs.readFileSync(p, 'utf8')).config.compilerOptions.paths,
                },
            }),],
    },
];

export default config;