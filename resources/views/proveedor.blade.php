<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PROVEEDOR</title>
    <link rel="icon" type="image/png" href="{{ asset('imagen/Icono/IconoFarmacia.png') }}">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
    @vite(['resources/css/Ale.css','resources/css/Proveedor.css','resources/js/Proveedor.js'])
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

    <!-- PANEL FLOTANTE PARA REGISTRAR PROVEEDOR -->
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
                    <h2 id="txtTituloModal" class="fs-5">Registrar Nuevo Proveedor</h2>
                    <p id="txtParrafoModal" class="fs-6">Complete los datos del nuevo proveedor para agregarlo al sistema
                    </p>
                </div>

                <!-- CAMPO: CÓDIGO DEL PROVEEDOR -->
                <div class="col-12 col-md-6">
                    <input id="txtProveedorCodigo" placeholder="Código" class="form-control input-base mb-3" disabled="true">
                </div>

                <!-- CAMPO: RAZÓN SOCIAL -->
                <div class="col-12 col-md-6">
                    <input id="txtProveedorRazonSocial" placeholder="Razón social" class="form-control input-base mb-3">
                </div>

                <!-- CAMPO: CORREO -->
                <div class="col-12 col-md-6">
                    <input id="txtProveedorCorreo" placeholder="Correo" class="form-control input-base mb-3">
                </div>

                <!-- CAMPO: NÚMERO TELÉFONO -->
                <div class="col-12 col-md-6">
                    <input id="txtProveedorNumeroTelefono" placeholder="Número de teléfono" class="form-control input-base mb-3">
                </div>

                <!-- BOTÓN: CANCELAR -->
                <div class="col-5 col-md-6">
                    <button id="btnProveedorCerrarModal" class="w-100 btn-base mb-3">Cancelar</button>
                </div>

                <!-- BOTÓN: REGISTRAR PROVEEDOR -->
                <div class="col-7 col-md-6">
                    <button id="btnProveedorRegistrar" class="w-100 btn-base">Registrar Proveedor</button>
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
                    <h2 class="text-color-white mt-2 p-0 mb-0 fs-5">Gestión de Proveedores</h2>
                    <p class="text-color-white fs-6">Sistema de administración de proveedores</p>
                </div>
            </div>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- BOTONES PRINCIPALES (GESTIÓN DE PROVEEDORES) -->
    <!-- ============================================================= -->
    <div class="row mt-5 ms-5">

        <!-- ============================================================= -->
        <!-- BOTONES PARA MOSTRAR TABLAS DE PROVEEDORES ACTIVOS Y ELIMINADOS -->
        <!-- ============================================================= -->
        <div class="col-12 col-md-8 mb-3">
            <!-- Botón para mostrar proveedores activos -->
            <button id="btnProveedorActivo" class="fs-6 boton-dos mb-2">Proveedores activos</button>

            <!-- Botón para mostrar proveedores eliminados -->
            <button id="btnProveedorEliminado" class="fs-6 boton-dos mb-2">Proveedores eliminados</button>
        </div>

        <!-- ============================================================= -->
        <!-- BOTÓN PARA MOSTRAR EL MODAL DE REGISTRO DE NUEVO PROVEEDOR -->
        <!-- ============================================================= -->
        <div class="col-12 col-md-4">
            <button id="btnProveedorMostrarModal"
                class="float-md-end fs-6 me-5 float-sm-start boton-dos bg-color-aguamarina text-color-white">
                <img src="{{ asset('imagen/Icono/IconoMas.png') }}">Registrar proveedor
            </button>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- TABLA DE PROVEEDORES ACTIVOS -->
    <!-- ============================================================= -->
    <div class="row mx-5 panel-tabla-proveedor">

        <!-- Encabezado de la tabla -->
        <div class="col-12 mt-3">
            <h2 class="mb-0">Proveedores Activos</h2>
            <p class="mb-4">Lista completa de proveedores en la organización</p>
        </div>

        <!-- Campo de búsqueda para proveedores activos -->
        <div class="row">
            <div class="col-12 col-md-4">
                <input id="txtProveedorBuscar" placeholder="Buscar proveedores por cualquier campo..."
                    class="form-control input-base">
            </div>
        </div>

        <!-- Contenedor responsivo para la tabla -->
        <div class="table-responsive mt-3 my-5">

            <!-- Tabla principal de empleados activos -->
            <table id="tblProveedor" class="table-dos">
                <thead>
                    <tr>
                        <th>CÓDIGO</th>
                        <th>RAZÓN SOCIAL</th>
                        <th>CORREO</th>
                        <th>NÚMERO DE TELÉFONO</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Contenido dinámico generado mediante JavaScript -->
                </tbody>
            </table>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- TABLA DE PROVEEDORES ELIMINADOS -->
    <!-- ============================================================= -->
    <div class="row mx-5 panel-tabla-proveedor-eliminado">

        <!-- Encabezado de la tabla -->
        <div class="col-12 mt-3">
            <h2 class="mb-0">Proveedores Eliminados</h2>
            <p class="mb-4">Registro de proveedores eliminados</p>
        </div>

        <!-- Campo de búsqueda para proveedores eliminados -->
        <div class="row">
            <div class="col-12 col-md-4">
                <input id="txtProveedorBuscarEliminado" placeholder="Buscar proveedores eliminados por cualquier campo..."
                    class="form-control input-base">
            </div>
        </div>

        <!-- Contenedor responsivo para la tabla -->
        <div class="table-responsive mt-3 my-5">

            <!-- Tabla principal de proveedores eliminados -->
            <table id="tblProveedorEliminado" class="table-dos">
                <thead>
                    <tr>
                        <th>CÓDIGO</th>
                        <th>RAZÓN SOCIAL</th>
                        <th>CORREO</th>
                        <th>NÚMERO DE TELÉFONO</th>
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