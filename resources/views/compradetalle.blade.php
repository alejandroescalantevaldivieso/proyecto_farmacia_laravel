<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BUSCADOR DE STOCK</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
    <meta name="csrf-token" content="{{ csrf_token() }}" >
    @vite(['resources/css/Ale.css'])
</head>
<body>
    <!-- ====================== ALERTA ====================== -->
    <div class="alerta-uno">
        <div class="fondo"></div>
        <div class="alerta">
            <img id="imgIcono">
            <p id="pMensaje"></p>
            <button id="btnCerrar">CERRAR</button>
        </div>
    </div>

     <!-- ========================================================
          BARRA DE INFORMACIÓN SUPERIOR
          ======================================================== -->
     <div class="row px-0 mx-0">
        <!-- CONTENEDOR PRINCIPAL DE LA BARRA -->
        <div class="col-12 bg-color-aguamarina">
            <div class="row align-items-center">

                <!-- SECCIÓN DEL ÍCONO DE USUARIO -->
                <div class="col-auto pe-0">
                    <img class="ms-5 ps-3 d-inline" src="../Imagen/Icono/IconoCirculoUsuario.png">
                </div>

                <!-- SECCIÓN DE TÍTULO Y DESCRIPCIÓN -->
                <div class="col-11">
                    <h2 class="text-color-white mt-2 p-0 mb-0 fs-5">Buscador Rápido de Stock</h2>
                    <p class="text-color-white fs-6">Consulta rápida del stock de los productos</p>
                </div>
            </div>
        </div>
    </div>

    <div class="row mt-5 ms-5">
    </div>

    <!-- ============================================================= -->
    <!-- TABLA DE Stock -->
    <!-- ============================================================= -->
    <div class="row mx-5 panel-tabla-departamento-libre">

        <!-- Encabezado de la sección -->
        <div class="col-12">
            <h2 class="my-0">Stock de los productos</h2>
            <p>Lista completa de stock de productos</p>
        </div>

        <!-- Campo de búsqueda para filtrar Stock -->
        <div class="col-9 col-md-3 mb-2">
            <input id="txtStockBuscar" type="text" placeholder="Buscar por cualquier campo"
                class="form-control input-base">
        </div>

        <!-- Contenedor para permitir desplazamiento horizontal en pantallas pequeñas -->
        <div class="table-responsive">

            <!-- Tabla principal de Stock -->    
            <table id="tblStock" class="table-dos">
                <thead>
                    <tr>
                        <th>CÓDIGO</th>
                        <th>LOTE</th>
                        <th>FECHA VENCIMIENTO</th>
                        <th>CANTIDAD</th>
                        <th>FECHA INGRESO</th>
                        <th>PRODUCTO CODIGO</th>
                        <th>PRODUCTO NOMBRE</th>
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