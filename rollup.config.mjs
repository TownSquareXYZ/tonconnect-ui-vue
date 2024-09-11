import vue from '@vitejs/plugin-vue2'
import typescript from '@rollup/plugin-typescript';

const config = [
    {
        input: "./src/index.ts",
        output: [{ file: "lib/index.d.ts", format: "es" }],
        plugins: [
            vue(),
            typescript({
                tsconfig: path.resolve(__dirname, 'tsconfig.json'),
                // Ensure declaration files are generated
                declaration: true,
                declarationMap: true,
              }),
            ],
    },
];

export default config;