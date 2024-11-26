import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)) // Alias @ apontando para src
        }
    },
    build: {
        outDir: 'dist',  // Define o diretório de saída para o build
        assetsDir: 'assets',  // Define o diretório de assets dentro de dist
        sourcemap: true,  // Habilita a geração de sourcemaps, útil para depuração
    },
    server: {
        port: 3000,  // Porta para o servidor de desenvolvimento local
    }
})
