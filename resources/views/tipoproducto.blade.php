<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TIPO DE PRODUCTO</title>
    <link rel="icon" type="image/png" href="{{ asset('imagen/Icono/IconoFarmacia.png') }}">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
    @vite(['resources/css/Ale.css','resources/css/TipoProducto.css','resources/js/TipoProducto.js'])
</head>

<body class="bg-color-blanco-uno">

    <!-- ====================== ALERTA ====================== -->
    <div class="alerta-uno">
        <div class="fondo"></div>
        <div class="alerta">
            <img id="imgIcono">
            <p id="pMensaje"></p>
            <button id="btnCerrar">CERRAR</button>
        </div>
    </div>

    <!-- PANEL FLOTANTE PARA REGISTRAR TIPOPRODUCTO -->
    <div class="modal-uno">

        <!-- FONDO OSCURO SEMITRANSPARENTE -->
        <div class="fondo"></div>

        <!-- CONTENEDOR PRINCIPAL DEL FORMULARIO -->
        <div class="contenedor">
            <div class="row p-3">

                <!-- ICONO DEL ENCABEZADO -->
                <div class="col-1">
                    <img id="imgIconoModal" src="{{ asset('imagen/Icono/IconoUsuarioRegistrar.png') }}" class="d-inline">
                </div>

                <!-- TÍTULO Y DESCRIPCIÓN --> 
                <div class="col-11">
                    <h2 id="txtTituloModal" class="fs-5">Registrar Nuevo Tipo Producto</h2>
                    <p id="txtParrafoModal" class="fs-6">Complete los datos del nuevo tipo de producto para agregarlo al sistema
                    </p>
                </div>
                <!-- CAMPO: CÓDIGO DEL TIPO DE PRODUCTO --> 
                <div class="col-12 col-md-3">
                    <input id="txtTipoProductoCodigo" placeholder="Código" class="form-control input-base mb-3" disabled="true">
                </div>

                <!-- CAMPO: NOMBRE DEL TIPO DE PRODUCTO -->
                <div class="col-12 col-md-4">
                    <input id="txtTipoProductoNombre" placeholder="Nombre" class="form-control input-base mb-3">
                </div>
                
                <!-- CAMPO: PRODUCTO DESCRIPCIÓN -->
                <div class="col-12 col-md-5">
                    <input id="txaTipoProductoDescripcion" placeholder="Descripción" class="form-control input-base mb-3">
                </div>

                <!-- BOTÓN: CANCELAR -->
                <div class="col-12 col-md-6">
                    <button id="btnTipoProductoCerrarModal" class="w-100 btn-base mb-3">Cancelar</button>
                </div>

                <!-- BOTÓN: REGISTRAR TIPO DE PRODUCTO -->
                <div class="col-12 col-md-6">
                    <button id="btnTipoProductoRegistrar" class="w-100 btn-base">Registrar Tipo Producto</button>
                </div>
            </div>
        </div>
    </div>

    <!-- BARRA DE INFORMACIÓN SUPERIOR  -->
    <div class="row">
        <div class="col-12 bg-color-aguamarina">
            <div class="row align-items-center">
                <div class="col-auto pe-0">
                    <img class="ms-5 ps-3 d-inline" src="{{ asset('imagen/Icono/IconoCirculoUsuario.png') }}">
                </div>
                <div class="col">
                    <h2 class="text-color-white mt-2 p-0 mb-0 fs-5">Gestión de Tipos de Productos</h2>
                    <p class="text-color-white fs-6">Sistema de administración de Tipos de Productos</p>
                </div>
            </div>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- BOTONES PRINCIPALES (GESTIÓN DE TIPOS DE PRODUCTOS) -->
    <!-- ============================================================= -->
    <div class="row mt-5 ms-5">

        <!-- ============================================================= -->
        <!-- BOTONES PARA MOSTRAR TABLAS DE TIPOS DE PRODUCTOS ACTIVOS Y ELIMINADOS -->
        <!-- ============================================================= -->
        <div class="col-12 col-md-8 mb-3">
            <!-- Botón para mostrar tipos de productos activos -->
            <button id="btnTipoProductoActivo" class="fs-6 boton-dos mb-2">Tipos de productos activos</button>

            <!-- Botón para mostrar tipos de productos eliminados -->
            <button id="btnTipoProductoEliminado" class="fs-6 boton-dos mb-2">Tipos de productos eliminados</button>
        </div>

        <!-- ============================================================= -->
        <!-- BOTÓN PARA MOSTRAR EL MODAL DE REGISTRO DE NUEVO TIPO DE PRODUCTO -->
        <!-- ============================================================= -->
        <div class="col-12 col-md-4">
            <button id="btnTipoProductoMostrarModal"
                class="float-md-end fs-6 me-5 float-sm-start boton-dos bg-color-aguamarina text-color-white">
                <img src="{{ asset('imagen/Icono/IconoMas.png') }}">Registrar tipo de producto
            </button>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- TABLA DE TIPOS DE PRODUCTOS ACTIVOS -->
    <!-- ============================================================= -->
    <div class="row mx-5 panel-tabla-tipoproducto">

        <!-- Encabezado de la tabla -->
        <div class="col-12 mt-3">
            <h2 class="mb-0">Tipos de Productos Activos</h2>
            <p class="mb-4">Lista completa de tipos de productos activos en la organización</p>
        </div>

        <!-- Campo de búsqueda para tipos de productos activos -->
        <div class="row">
            <div class="col-12 col-md-4">
                <input id="txtTipoProductoBuscar" placeholder="Buscar tipos de productos por cualquier campo..."
                    class="form-control input-base">
            </div>
        </div>

        <!-- Contenedor responsivo para la tabla -->
        <div class="table-responsive mt-3 my-5">

            <!-- Tabla principal de empleados activos -->
            <table id="tblTipoProducto" class="table-dos">
                <thead>
                    <tr>
                        <th>CODIGO</th>
                        <th>NOMBRE</th>
                        <th>DESCRIPCION</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Contenido dinámico generado mediante JavaScript -->
                </tbody>
            </table>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- TABLA DE TIPOS DE PRODUCTOS ELIMINADOS -->
    <!-- ============================================================= -->
    <div class="row mx-5 panel-tabla-tipoproducto-eliminado">

        <!-- Encabezado de la tabla -->
        <div class="col-12 mt-3">
            <h2 class="mb-0">Tipos de Productos Eliminados</h2>
            <p class="mb-4">Registro de Tipos de Productos dados de baja</p>
        </div>

        <!-- Campo de búsqueda para tipos de productos eliminados -->
        <div class="row">
            <div class="col-12 col-md-4">
                <input id="txtTipoProductoBuscarEliminado" placeholder="Buscar tipos de productos eliminados por cualquier campo..."
                    class="form-control input-base">
            </div>
        </div>

        <!-- Contenedor responsivo para la tabla -->
        <div class="table-responsive mt-3 my-5">

            <!-- Tabla principal de empleados eliminados -->
            <table id="tblTipoProductoEliminado" class="table-dos">
                <thead>
                    <tr>
                        <th>CODIGO</th>
                        <th>NOMBRE</th>
                        <th>DESCRIPCION</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Contenido dinámico generado mediante JavaScript -->
                </tbody>
            </table>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI"
        crossorigin="anonymous"></script>
</body>
</html>