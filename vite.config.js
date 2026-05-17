import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    server: {
        fs: {
            strict: false
        }
    },
    resolve: {
        alias: {
            '/imagen': '/public/imagen',
        }
    },    

    plugins: [
        laravel({
            input: [
                'resources/css/Ale.css',
                'resources/css/Empleado.css',
                'resources/js/Empleado.js',
                'resources/css/Usuario.css',
                'resources/js/Usuario.js',
                'resources/css/Proveedor.css',
                'resources/js/Proveedor.js',
                'resources/css/TipoProducto.css',
                'resources/js/TipoProducto.js',
                'resources/css/Producto.css',
                'resources/js/Producto.js',
                'resources/css/Stock.css',
                'resources/js/Stock.js',
                'resources/css/Login.css',
                'resources/js/Login.js',
                'resources/css/Principal.css',
                'resources/js/Principal.js',
                'resources/css/ValidarCorreo.css',
                'resources/js/CambiarContraseña.js',
                'resources/css/ValidarCodigo.css',
                'resources/js/ValidarCodigo.js',
                'resources/css/ValidarCorreo.css',
                'resources/js/ValidarCorreo.js',
                'resources/css/Compra.css',
                'resources/js/Compra.js',
                'resources/css/Venta.css',
                'resources/js/Venta.js',
                'resources/js/VentaRealizada.js',
                'resources/js/CompraRealizada.js',

                'resources/css/chat.css',
                'resources/js/chat.js',

                'resources/js/dashboard.js',
                'resources/css/dashboard.css',
            ],
            refresh: true,
        }),
        tailwindcss(),
    ],
});