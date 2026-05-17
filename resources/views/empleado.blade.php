<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>EMPLEADO</title>
    <link rel="icon" type="image/png" href="{{ asset('imagen/Icono/IconoFarmacia.png') }}">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">

    <meta name="csrf-token" content="{{ csrf_token() }}"><!-- CSRF TOKEN PARA AJAX 
    EN LARAVEL -->   
    
    @vite(['resources/css/Empleado.css', 'resources/css/Ale.css', 'resources/js/Empleado.js'])
    

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

    <!-- PANEL FLOTANTE PARA REGISTRAR EMPLEADO -->
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
                    <h2 id="txtTituloModal" class="fs-5">Registrar Nuevo Empleado</h2>
                    <p id="txtParrafoModal" class="fs-6">Complete los datos del nuevo empleado para agregarlo al sistema
                    </p>
                </div>

                <!-- CAMPO: CÓDIGO DEL EMPLEADO -->
                <div class="col-12 col-md-2">
                    <input id="txtCodigo" placeholder="Código" class="form-control input-base mb-3" disabled="true">
                </div>

                <!-- CAMPO: NOMBRE -->
                <div class="col-12 col-md-4">
                    <input id="txtNombre" placeholder="Nombre" class="form-control input-base mb-3">
                </div>

                <!-- CAMPO: APELLIDO PATERNO -->
                <div class="col-12 col-md-3">
                    <input id="txtApellidoPaterno" placeholder="Apellido paterno" class="form-control input-base mb-3">
                </div>

                <!-- CAMPO: APELLIDO MATERNO -->
                <div class="col-12 col-md-3">
                    <input id="txtApellidoMaterno" placeholder="Apellido materno" class="form-control input-base mb-3">
                </div>

                <!-- CAMPO: FECHA DE NACIMIENTO -->
                <div class="col-12 col-md-6">
                    <input id="txtFechaNacimiento" type="date" placeholder="Fecha nacimiento"
                        class="form-control input-base mb-3">
                </div>

                <!-- CAMPO: NÚMERO DE TELÉFONO -->
                <div class="col-12 col-md-6">
                    <input id="txtNumeroTelefono" type="number" min="0" placeholder="Numero telefono"
                        class="form-control input-base mb-3">
                </div>

                <!-- CAMPO: CORREO ELECTRÓNICO -->
                <div class="col-12 col-md-12">
                    <input id="txtCorreo" placeholder="Correo Electrónico" class="form-control input-base mb-3">
                </div>

                <!-- CAMPO: TIPO DE DOCUMENTO -->
                <div class="col-12 col-md-7">
                    <select id="cbxTipoDocumento" class="form-select input-base mb-3">
                        <option value="">Tipo de documento</option>
                        <option value="DNI">DNI</option>
                        <option value="PASAPORTE">PASAPORTE</option>
                    </select>
                </div>

                <!-- CAMPO: NÚMERO DE DOCUMENTO -->
                <div class="col-12 col-md-5">
                    <input id="txtNumeroDocumento" type="number" min="0" placeholder="Número de documento"
                        class="form-control input-base mb-3">
                </div>

                <!-- BOTÓN: CANCELAR -->
                <div class="col-5 col-md-2">
                    <button id="btnEmpleadoCerrarModal" class="w-100 btn-base mb-3">Cancelar</button>
                </div>

                <!-- BOTÓN: REGISTRAR EMPLEADO -->
                <div class="col-7 col-md-5">
                    <button id="btnEmpleadoRegistrar" class="w-100 btn-base">Registrar Empleado</button>
                </div>
            </div>
        </div>
    </div>

    <!-- BARRA DE INFORMACIÓN SUPERIOR  -->
    <div class="row">
        <div class="col-12 bg-color-aguamarina">
            <div class="row align-items-center">
                <div class="col-auto pe-0">
                    <img class="ms-5 ps-3 d-inline" src="{{ asset('imagen/Icono/IconoCirculoUsuario.png') }}" alt="Icono Usuario">
                </div>
                <div class="col">
                    <h2 class="text-color-white mt-2 p-0 mb-0 fs-5">Gestión de Empleados</h2>
                    <p class="text-color-white fs-6">Sistema de administración de personal</p>
                </div>
            </div>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- BOTONES PRINCIPALES (GESTIÓN DE EMPLEADOS) -->
    <!-- ============================================================= -->
    <div class="row mt-5 ms-5">

        <!-- ============================================================= -->
        <!-- BOTONES PARA MOSTRAR TABLAS DE EMPLEADOS ACTIVOS Y ELIMINADOS -->
        <!-- ============================================================= -->
        <div class="col-12 col-md-8 mb-3">
            <!-- Botón para mostrar empleados activos -->
            <button id="btnEmpleadoActivo" class="fs-6 boton-dos mb-2">Empleados activos</button>

            <!-- Botón para mostrar empleados eliminados -->
            <button id="btnEmpleadoEliminado" class="fs-6 boton-dos mb-2">Empleados eliminados</button>
        </div>

        <!-- ============================================================= -->
        <!-- BOTÓN PARA MOSTRAR EL MODAL DE REGISTRO DE NUEVO EMPLEADO -->
        <!-- ============================================================= -->
        <div class="col-12 col-md-4">
            <button id="btnEmpleadoMostrarModal"
                class="float-md-end fs-6 me-5 float-sm-start boton-dos bg-color-aguamarina text-color-white">
                <img src="{{ asset('imagen/Icono/IconoMas.png') }}">Registrar empleado
            </button>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- TABLA DE EMPLEADOS ACTIVOS -->
    <!-- ============================================================= -->
    <div class="row mx-5 panel-tabla-empleado">

        <!-- Encabezado de la tabla -->
        <div class="col-12 mt-3">
            <h2 class="mb-0">Empleados Activos</h2>
            <p class="mb-4">Lista completa de empleados en la organización</p>
        </div>

        <!-- Campo de búsqueda para empleados activos -->
        <div class="row">
            <div class="col-12 col-md-4">
                <input id="txtEmpleadoBuscar" placeholder="Buscar empleados por cualquier campo..."
                    class="form-control input-base">
            </div>
        </div>

        <!-- Contenedor responsivo para la tabla -->
        <div class="table-responsive mt-3 my-5">

            <!-- Tabla principal de empleados activos -->
            <table id="tblEmpleado" class="table-dos">
                <thead>
                    <tr>
                        <th>CODIGO</th>
                        <th>NOMBRE COMPLETO</th>
                        <th>NACIMIENTO</th>
                        <th>TELEFONO</th>
                        <th>CORREO</th>
                        <th>TIPO DOCUMENTO</th>
                        <th>NUMERO DOCUMENTO</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Contenido dinámico generado mediante JavaScript -->
                </tbody>
            </table>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- TABLA DE EMPLEADOS ELIMINADOS -->
    <!-- ============================================================= -->
    <div class="row mx-5 panel-tabla-empleado-eliminado">

        <!-- Encabezado de la tabla -->
        <div class="col-12 mt-3">
            <h2 class="mb-0">Empleados Eliminados</h2>
            <p class="mb-4">Registro de empleados dados de baja</p>
        </div>

        <!-- Campo de búsqueda para empleados eliminados -->
        <div class="row">
            <div class="col-12 col-md-4">
                <input id="txtEmpleadoBuscarEliminado" placeholder="Buscar empleados eliminados por cualquier campo..."
                    class="form-control input-base">
            </div>
        </div>

        <!-- Contenedor responsivo para la tabla -->
        <div class="table-responsive mt-3 my-5">

            <!-- Tabla principal de empleados eliminados -->
            <table id="tblEmpleadoEliminado" class="table-dos">
                <thead>
                    <tr>
                        <th>CODIGO</th>
                        <th>NOMBRE COMPLETO</th>
                        <th>NACIMIENTO</th>
                        <th>TELEFONO</th>
                        <th>CORREO</th>
                        <th>TIPO DOCUMENTO</th>
                        <th>NUMERO DOCUMENTO</th>
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