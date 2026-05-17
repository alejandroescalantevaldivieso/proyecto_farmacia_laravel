<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PRODUCTO</title>
    <link rel="icon" type="image/png" href="{{asset('imagen/Icono/IconoFarmacia.png') }}">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
    <meta name="csrf-token" content="{{ csrf_token() }}" >
    @vite(['resources/css/Ale.css','resources/css/Producto.css','resources/js/Producto.js'])

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

    <!-- PANEL FLOTANTE PARA REGISTRAR PRODUCTO -->
    <div class="modal-uno">

        <!-- FONDO OSCURO SEMITRANSPARENTE -->
        <div class="fondo"></div>

        <!-- CONTENEDOR PRINCIPAL DEL FORMULARIO -->
        <div class="contenedor">
            <div class="row p-3 ">

                <!-- ICONO DEL ENCABEZADO -->
                <div class="col-1">
                    <img id="imgIconoModal" src="{{ asset('imagen/Icono/IconoUsuarioRegistrar.png') }}" class="d-inline">
                </div>

                <!-- TÍTULO Y DESCRIPCIÓN -->
                <div class="col-11">
                    <h2 id="txtTituloModal" class="fs-5">Registrar Nuevo Producto</h2>
                    <p id="txtParrafoModal" class="fs-6">Complete los datos del nuevo producto para agregarlo al sistema
                    </p>
                </div>

                <!-- CAMPO: CÓDIGO DEL PRODUCTO -->
                <div class="col-12 col-md-6">
                    <input id="txtProductoCodigo" placeholder="Código" class="form-control input-base mb-3" disabled="true">
                </div>

                <!-- CAMPO: NOMBRE -->
                <div class="col-12 col-md-6">
                    <input id="txtProductoNombre" placeholder="Nombre" class="form-control input-base mb-3">
                </div>

                 <!-- CAMPO: DESCRIPCIÓN -->
                <div class="col-12 col-md-12">
                    <input id="txaProductoDescripcion" placeholder="Descripción" class="form-control input-base mb-3">
                </div>

                <!-- CAMPO: PRECIO UNITARIO -->
                <div class="col-12 col-md-6">
                    <input id="txtProductoPrecioUnitario" type="number" min="0" placeholder="Precio unitario"
                        class="form-control input-base mb-3">
                </div>

                <!-- CAMPO: TIPO DE PRODUCTO -->
                <div class="col-12 col-md-6">
                    <select id="cbxProductoTipoProducto" type="select" class="form-select input-base mb-3">
                    </select>
                </div>

                <!-- BOTÓN: CANCELAR -->
                <div class="col-5 col-md-6">
                    <button id="btnProductoCerrarModal" class="w-100 btn-base mb-3">Cancelar</button>
                </div>

                <!-- BOTÓN: REGISTRAR PRODUCTO -->
                <div class="col-7 col-md-6">
                    <button id="btnProductoRegistrar" class="w-100 btn-base">Registrar Producto</button>
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
                    <h2 class="text-color-white mt-2 p-0 mb-0 fs-5">Gestión de Productos</h2>
                    <p class="text-color-white fs-6">Sistema de administración de productos</p>
                </div>
            </div>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- BOTONES PRINCIPALES (GESTIÓN DE PRODUCTOS) -->
    <!-- ============================================================= -->
    <div class="row mt-5 ms-5">

        <!-- ============================================================= -->
        <!-- BOTONES PARA MOSTRAR TABLAS DE PRODUCTOS ACTIVOS Y ELIMINADOS -->
        <!-- ============================================================= -->
        <div class="col-12 col-md-8 mb-3">
            <!-- Botón para mostrar productos activos -->
            <button id="btnProductoActivo" class="fs-6 boton-dos mb-2">Productos activos</button>

            <!-- Botón para mostrar productos eliminados -->
            <button id="btnProductoEliminado" class="fs-6 boton-dos mb-2">Productos eliminados</button>
        </div>

        <!-- ============================================================= -->
        <!-- BOTÓN PARA MOSTRAR EL MODAL DE REGISTRO DE NUEVO PRODUCTO -->
        <!-- ============================================================= -->
        <div class="col-12 col-md-4">
            <button id="btnProductoMostrarModal"
                class="float-md-end fs-6 me-5 float-sm-start boton-dos bg-color-aguamarina text-color-white">
                <img src="{{ asset('imagen/Icono/IconoMas.png') }}">Registrar producto
            </button>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- TABLA DE PRODUCTOS ACTIVOS -->
    <!-- ============================================================= -->
    <div class="row mx-5 panel-tabla-producto">

        <!-- Encabezado de la tabla -->
        <div class="col-12 mt-3">
            <h2 class="mb-0">Productos Activos</h2>
            <p class="mb-4">Lista completa de productos en la organización</p>
        </div>

        <!-- Campo de búsqueda para productos activos -->
        <div class="row">
            <div class="col-12 col-md-4">
                <input id="txtProductoBuscar" placeholder="Buscar productos por cualquier campo..."
                    class="form-control input-base">
            </div>
        </div>

        <!-- Contenedor responsivo para la tabla -->
        <div class="table-responsive mt-3 my-5">

            <!-- Tabla principal de productos activos -->
            <table id="tblProducto" class="table-dos">
                <thead>
                    <tr>
                        <th>CODIGO</th>
                        <th>NOMBRE</th>
                        <th>DESCRIPCION</th>
                        <th>PRECIO UNITARIO</th>
                        <th>TIPO PRODUCTO</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Contenido dinámico generado mediante JavaScript -->
                </tbody>
            </table>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- TABLA DE PRODUCTOS ELIMINADOS -->
    <!-- ============================================================= -->
    <div class="row mx-5 panel-tabla-producto-eliminado">

        <!-- Encabezado de la tabla -->
        <div class="col-12 mt-3">
            <h2 class="mb-0">Productos Eliminados</h2>
            <p class="mb-4">Registro de productos dados de baja</p>
        </div>

        <!-- Campo de búsqueda para productos eliminados -->
        <div class="row">
            <div class="col-12 col-md-4">
                <input id="txtProductoBuscarEliminado" placeholder="Buscar productos eliminados por cualquier campo..."
                    class="form-control input-base">
            </div>
        </div>

        <!-- Contenedor responsivo para la tabla -->
        <div class="table-responsive mt-3 my-5">

            <!-- Tabla principal de productos eliminados -->
            <table id="tblProductoEliminado" class="table-dos">
                <thead>
                    <tr>
                        <th>CODIGO</th>
                        <th>NOMBRE</th>
                        <th>DESCRIPCION</th>
                        <th>PRECIO UNITARIO</th>
                        <th>TIPO PRODUCTO</th>
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