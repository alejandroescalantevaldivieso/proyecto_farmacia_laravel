<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>USUARIO</title>
    <link rel="icon" href="{{ asset('imagen/Icono/IconoFarmacia.png') }}" type="image/png"/>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">

    
    <meta name="csrf-token" content="{{ csrf_token() }}">
    @vite(['resources/css/Ale.css','resources/css/Usuario.css','resources/js/Usuario.js'])    

</head>

<body>
    <!-- =============================================================
                        BARRA DE INFORMACIÓN SUPERIOR
        ============================================================== -->
    <div class="row">
        <!-- CONTENEDOR PRINCIPAL DE LA BARRA -->
        <div class="col-12 bg-color-aguamarina">
            <div class="row align-items-center">

                <!-- SECCIÓN DEL ÍCONO DE USUARIO -->
                <div class="col-auto pe-0">
                    <img class="ms-5 ps-3 d-inline" src="{{ asset('imagen/Icono/IconoCirculoUsuario.png') }}" alt="Icono Usuario">
                </div>

                <!-- SECCIÓN DE TÍTULO Y DESCRIPCIÓN -->
                <div class="col">
                    <h2 class="text-color-white mt-2 p-0 mb-0 fs-5">Gestión de Usuarios</h2>
                    <p class="text-color-white fs-6">Sistema de administración de personal</p>
                </div>
            </div>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- SECCIÓN: ALERTA PERSONALIZADA -->
    <!-- ============================================================= -->
    <!-- Contenedor principal del sistema de alertas -->
    <div class="alerta-uno">

        <!-- Fondo semitransparente detrás de la alerta -->
        <div class="fondo"></div>

        <!-- Contenido principal de la alerta -->
        <div class="alerta">
            <!-- Ícono de la alerta -->
            <img id="imgIcono">

            <!-- Mensaje de texto que se muestra al usuario -->
            <p id="pMensaje"></p>

            <!-- Botón para cerrar la alerta -->
            <button id="btnCerrar">CERRAR</button>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- SECCIÓN: MODAL PARA MOSTRAR DATOS DEL EMPLEADO -->
    <!-- ============================================================= -->
    <!-- Contenedor principal del modal -->
    <div class="modal-dos">

        <!-- Fondo semitransparente del modal -->
        <div class="fondo"></div>

        <!-- Contenedor del contenido del modal -->
        <div class="contenedor p-3">

            <!-- ===================== FILA DE BUSQUEDA Y BOTÓN ===================== -->
            <div class="row">

                <!-- Campo de búsqueda del empleado -->
                <div class="col-7 col-md-6 mt-2">
                    <input id="txtEmpleadoBuscar" type="text" placeholder="Buscar empleado por cualquier campo"
                        class="form-control input-base">
                </div>

                <!-- Botón para cancelar o cerrar el modal -->
                <div class="col-5 col-md-3 mt-2 mb-3">
                    <button id="btnEmpleadoCancelar" class="boton-dos w-100">Cancelar</button>
                </div>
            </div>

            <!-- ===================== TABLA DE EMPLEADOS ===================== -->
            <div>
                <div class="table-responsive">
                    <table id="tblEmpleado" class="table-dos">
                        <thead>
                            <tr>
                                <th>CODIGO</th>
                                <th>NOMBRE</th>
                                <th>NUMERO DOCUMENTO</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    </div>

    <!-- ============================================================= -->
    <!-- BOTONES PRINCIPALES (GESTIÓN DE USUARIOS) -->
    <!-- ============================================================= -->
    <div class="row mt-5 ms-5">

        <!-- ============================================================= -->
        <!-- BOTONES PARA MOSTRAR TABLAS DE USUARIOS ACTIVOS Y ELIMINADOS -->
        <!-- ============================================================= -->
        <div class="col-12 col-md-8 mb-3">
            <!-- Botón para mostrar usuarios activos -->
            <button id="btnUsuarioActivo" class="fs-6 boton-dos">Usuarios activos</button>

            <!-- Botón para mostrar usuarios eliminados -->
            <button id="btnUsuarioEliminado" class="fs-6 boton-dos">Usuarios eliminados</button>
        </div>

        <!-- ============================================================= -->
        <!-- BOTÓN PARA MOSTRAR EL MODAL DE REGISTRO DE NUEVO USUARIO -->
        <!-- ============================================================= -->
        <div class="col-12 col-md-4">
            <button id="btnUsuarioMostrarModal"
                class="float-md-end fs-6 me-5 float-sm-start boton-dos bg-color-aguamarina text-color-white">
                <img src="{{ asset('imagen/Icono/IconoMas.png') }}">Registrar usuario
            </button>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- MODAL PARA REGISTRAR NUEVO USUARIO -->
    <!-- ============================================================= -->
    <div class="modal-uno">

        <!-- Fondo semitransparente del modal -->
        <div class="fondo"></div>

        <!-- Contenedor principal del formulario dentro del modal -->
        <div class="contenedor p-3">

            <!-- ============================================================= -->
            <!-- ENCABEZADO DEL MODAL (Icono, Título y Descripción) -->
            <!-- ============================================================= -->
            <div class="row">
                <!-- Columna con el icono representativo -->
                <div class="col-auto">
                    <img id="imgIconoModalUsuario" src="{{ asset('imagen/Icono/IconoUsuarioRegistrar.png') }}" class="d-inline">
                </div>

                <!-- Columna con el título y descripción -->
                <div class="col">
                    <h2 id="txtModalUsuario" class="fs-5 my-0">Registrar Nuevo Usuario</h2>
                    <p id="pModalUsuario" class="fs-6">Complete los datos del nuevo usuario para agregarlo al sistema</p>
                </div>
            </div>

            <!-- ============================================================= -->
            <!-- FORMULARIO DE REGISTRO DE USUARIO -->
            <!-- ============================================================= -->
            <div class="row">
                <div class="col-12">
                    <div class="row contenedor-usuario">
                        <div class="d-flex align-items-center mb-2">
                            <img src="{{ asset('imagen/Icono/IconoLlaveAcceso.png') }}" class="me-2" alt="Icono">
                            <h2 class="fs-6 mb-0">Credenciales de Acceso</h2>
                        </div>
                        <!-- Campo para código del usuario -->
                        <div class="col-12 col-md-3">
                            <input id="txtUsuarioCodigo" type="text" placeholder="Codigo" disabled="true"
                                class="form-control input-base mb-2">
                        </div>

                        <!-- Campo para nombre del usuario -->
                        <div class="col-12 col-md-5">
                            <input id="txtUsuarioNombre" type="text" placeholder="Nombre de usuario"
                                class="form-control input-base mb-2">
                        </div>

                        <!-- Campo para contraseña del usuario -->
                        <div class="col-12 col-md-4">
                            <input id="txtUsuarioContraseña" type="text" placeholder="Contraseña de usuario"
                                class="form-control input-base mb-2">
                        </div>
                    </div>
                </div>
                <!-- ============================================================= -->
                <!-- SECCIÓN DE DATOS DEL EMPLEADO ASOCIADO -->
                <!-- ============================================================= -->
                <div class="col-12">
                    <div class="row contenedor-empleado mt-4">
                        <div class="d-flex gap-2 align-items-center mb-2">
                            <img src="{{ asset('imagen/Icono/IconoCirculoUsuarioAguamarina.png') }}" alt="Icono">
                            <h2 class="fs-6 mt-1">Asociar Empleado</h2>
                        </div>
                        <!-- Campo con el código del empleado (bloqueado) -->
                        <div class="col-12 col-md-4 mb-2">
                            <input id="txtEmpleadoCodigo" type="text" placeholder="Codigo de empleado" disabled=true
                                class="form-control input-base mb-2">
                        </div>

                        <!-- Campo con el nombre del empleado (bloqueado) -->
                        <div class="col-12 col-md-4 mb-2">
                            <input id="txtEmpleadoNombre" type="text" placeholder="Nombre de empleado" disabled=true
                                class="form-control input-base mb-2">
                        </div>

                        <!-- Botón para abrir el buscador de empleados -->
                        <div class="col-12 col-md-4 mb-2">
                            <button id="btnEmpleadoBuscar" class="boton-dos w-100">
                                <img src="{{ asset('imagen/Icono/IconoBuscar.png') }}">Buscar Empleado
                            </button><br>
                        </div>
                    </div>
                </div>


                <!-- ============================================================= -->
                <!-- SECCIÓN DE ASIGNACIÓN DE ROL Y ACCIONES -->
                <!-- ============================================================= -->

                <!-- ComboBox para seleccionar el rol del usuario -->
                <div class="col-7 col-md-4 ms-4 my-3">
                    <label>Codigo de rol</label>
                    <select id="cbxRol" type="select" class="form-control input-base">
                    </select>
                </div>
                <div class="col-md-4">

                </div>

                <!-- Botón para cancelar el registro -->
                <div class="col-11 col-md-4 mb-2">
                    <button id="btnUsuarioCancelarModal" class="boton-dos w-100 ms-4">Cancelar</button>
                </div>

                <!-- Botón para registrar el nuevo usuario -->
                <div class="col-11 col-md-4 mb-2">
                    <button id="btnUsuarioRegistrar" class="boton-dos w-100 ms-4">Registrar Usuario</button>
                </div>
            </div>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- TABLA DE USUARIOS ACTIVOS -->
    <!-- ============================================================= -->
    <div class="row mx-5 panel-tabla-usuario">

        <!-- Encabezado de la sección -->
        <div class="col-12">
            <h2 class="my-0">Usuarios Activos</h2>
            <p>Lista completa de usuarios en la organización</p>
        </div>

        <!-- Campo de búsqueda para filtrar usuarios activos -->
        <div class="col-9 col-md-3 mb-2">
            <input id="txtUsuarioBuscar" type="text" placeholder="Buscar por cualquier campo"
                class="form-control input-base">
        </div>

        <!-- Contenedor para permitir desplazamiento horizontal en pantallas pequeñas -->
        <div class="table-responsive">

            <!-- Tabla principal de usuarios activos -->
            <table id="tblUsuario" class="table-dos">
                <thead>
                    <tr>
                        <th>CÓDIGO</th>
                        <th>NOMBRE</th>
                        <th>CÓDIGO EMPLEADO</th>
                        <th>CÓDIGO ROL</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
    </div>

    <!-- ============================================================= -->
    <!-- TABLA DE USUARIOS ELIMINADOS -->
    <!-- ============================================================= -->
    <div class="row mx-5 panel-tabla-usuario-eliminado">

        <!-- Encabezado de la sección -->
        <div class="col-12">
            <h2 class="my-0">Usuarios Eliminados</h2>
            <p>Registro de usuarios dados de baja</p>
        </div>

        <!-- Campo de búsqueda para filtrar usuarios eliminados -->
        <div class="col-9 col-md-3 mb-2">
            <input id="txtUsuarioBuscarEliminado" type="text" placeholder="Buscar por cualquier campo"
                class="form-control input-base">
        </div>

        <!-- Contenedor para permitir desplazamiento horizontal en pantallas pequeñas -->
        <div class="table-responsive">

            <!-- Tabla principal de usuarios eliminados -->
            <table id="tblUsuarioEliminado" class="table-dos">
                <thead>
                    <tr>
                        <th>CÓDIGO</th>
                        <th>NOMBRE</th>
                        <th>CÓDIGO EMPLEADO</th>
                        <th>CÓDIGO ROL</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI"
        crossorigin="anonymous"></script>
</body>
</html>