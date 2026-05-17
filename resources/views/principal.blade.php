<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PRINCIPAL</title>

    <link rel="icon" type="image/png" href="{{ asset('imagen/Icono/IconoFarmacia.png') }}"/>          
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

    <meta name="csrf-token" content="{{ csrf_token() }}">
    @vite(['resources/css/Ale.css','resources/css/Principal.css','resources/js/Principal.js','resources/js/chat.js','resources/css/chat.css'])
</head>

<body class="">

    <!-- Boton hamburguesa -->
    <span id="btnHamburguesa">
        <img src="{{ asset('imagen/Icono/IconoMenu.png') }}">
    </span>

    <ul class="menu-vertical">

        <img id="btnInicio" src="{{ asset('imagen/Logo/LogoFarmacia2.png') }}" alt="Logo farmacia">

        {{-- ========================
             VENTAS (todos)
           ======================== --}}
        <li>Venta
            <ul>
                <li id="btnNuevaVenta">Nueva venta</li>
                <li id="btnVentaRealizada">Ventas realizadas</li>
            </ul>
        </li>

        {{-- ==========================
             COMPRA (solo admin)
           ========================== --}}
        <li style="{{ session('nombre_rol') !== 'Administrador' ? 'display:none;' : '' }}">
            Compra
            <ul>
                <li id="btnNuevaCompra">Nueva compra</li>
                <li id="btnComprasRealizadas">Compras realizadas</li>
            </ul>
        </li>

        {{-- ==========================
             SEGURIDAD (solo admin)
           ========================== --}}
        <li style="{{ session('nombre_rol') !== 'Administrador' ? 'display:none;' : '' }}">
            Seguridad
            <ul>
                <li id="btnEmpleado">Empleado</li>
                <li id="btnUsuario">Usuario</li>
            </ul>
        </li>

        {{-- ==========================
             INVENTARIO (solo admin)
           ========================== --}}
        <li style="{{ session('nombre_rol') !== 'Administrador' ? 'display:none;' : '' }}">
            Inventario
            <ul>
                <li id="btnProducto">Producto</li>
                <li id="btnTipoProducto">Tipo producto</li>
                <li id="btnStock">Stock</li>
                <li id="btnProveedor">Proveedor</li>
            </ul>
        </li>

        <button id="btnCerrarSesion" class="btn-base">Cerrar sesión</button>

    </ul>

        <!-- chat bot -->

    <button id="chat-toggle"><img src="{{ asset('imagen/Icono/IconoChatBot.png') }}"></button>

    <div id="chat-window">
        <div class="chat-header">
            <span>Asistente Farmacéutico</span>
            <button id="close-chat">✕</button>
        </div>

        <div class="chat-body" id="chat-body">
            <div class="message bot">
            Hola. Describe los síntomas del cliente.
            </div>
        </div>

        <div class="chat-footer">
            <input type="text" id="chat-input" placeholder="Escribe los síntomas...">
            <button id="send-btn">Enviar</button>
        </div>
    </div>


        


    <iframe id="Contenedor"></iframe>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
