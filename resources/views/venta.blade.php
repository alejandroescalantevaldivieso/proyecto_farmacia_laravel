<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>VENTA</title>
    <link rel="icon" href="{{ asset('imagen/Icono/IconoFarmacia.png') }}" type="image/png"/>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" crossorigin="anonymous">
    @vite(['resources/css/Ale.css','resources/css/Venta.css','resources/js/Venta.js'])
</head>
<body class="bg-color-blanco-dos">
    <!-- ALERTA -->
    <div class="alerta-uno">
        <div class="fondo"></div>
        <div class="alerta">
            <img id="imgAlertaIcono">
            <p id="pAlertaMensaje"></p>
            <button id="btnAlertaCerrar">CERRAR</button>
        </div>
    </div>
    
    <!-- PANEL SUPERIOR DE INFORMACION -->
    <div class="row ps-5 g-0 align-items-center py-2 bg-color-aguamarina">
        <div class="col-auto d-flex justify-content-end">
            <img src="{{ asset('imagen/Icono/IconoCarrito.png') }}" alt="Icono Venta">
        </div>
        <div class="col ps-3">
            <h2 class="fs-4 mb-0 text-color-white">Gestión de Ventas</h2>
            <p class="fs-6 mb-0 text-color-white">Sistema de registro y administración de ventas</p>
        </div>
    </div>

    <!-- INFORMACION DEL TITULO -->
    <div class="row ps-5 pt-4 pb-4">
        <div class="col-12">
            <h2 class="fs-4">Registrar Nueva Venta</h2>
            <p class="fs-6">Seleccione los productos y complete los datos de la venta.</p>
        </div>
    </div>

    <!-- INFORMACIÓN GENERAL DE LA VENTA -->
    <div class="row bg-color-white mx-5 rounded-3">
        <div class="col-12 d-flex align-items-center py-3 boder-bottom-4">
            <img src="{{ asset('imagen/Icono/IconoCajaSinFondo.png') }}" alt="">
            <h2 class="ps-2 fs-6">Información General de la Venta</h2>
        </div>
        <div class="col-12 col-md-6">
            <label>Código de Venta <small><b>(obligatorio)</b></small></label>
            <input id="txtVentaCodigo" type="text" disabled="true" class="form-control input-base">
        </div>
        <div class="col-12 col-md-6 mb-2">
            <label>Fecha y Hora <small><b>(obligatorio)</b></small></label>
            <input id="txtVentaFechaHora" type="text" disabled="true" class="form-control input-base">
        </div>
        <div class="col-12 col-md-6 mb-2 mb-md-4">
            <label>Usuario Responsable <small><b>(obligatorio)</b></small></label>
            <input id="txtVentaUsuarioCodigo" type="text" disabled="true" class="form-control input-base">
        </div>
    </div>

    <!-- Busqueda de productos -->
    <div class="row mx-5 pb-4 bg-color-white mt-4 rounded-3 border">
        <div class="col-12 pt-3 pb-4 d-flex align-items-center ">
            <img class="me-2" src="{{ asset('imagen/Icono/IconoBuscar.png') }}" alt="Buscar">
            <h2 class="fs-5">Busqueda de Productos</h2>
        </div>
        <div class="col-10 pe-0">
            <label>Buscar Producto <small class="text-muted">(obligatorio)</small></label>
            <input id="txtBuscarProductoClick" class="form-control input-base" placeholder="Haga clic para buscar...">
        </div>
        <div class="col-2 mt-auto px-0 ps-2">
            <img id="btnVentaSeleccionar" class="pointer" src="{{ asset('imagen/Icono/IconoBuscar.png') }}" alt="Seleccionar">
        </div>
    </div>

    <!-- TABLA DE DETALLE PRODUCTOS -->
    <div class="row bg-color-white mx-5 mt-4 py-2 panel-tabla-producto">
        <div class="col-12 d-flex align-items-center py-3 boder-bottom-4">
            <img src="{{ asset('imagen/Icono/IconoDolarCirculo.png') }}" alt="">
            <h2 class="ps-2 fs-6">Detalles de Productos</h2>
        </div>
        <div class="col-12">
            <div class="table-responsive">
                <table id="tblDetalleProducto" class="table-dos w-100">
                    <thead>
                        <tr>
                            <th>CODIGO</th>
                            <th>NOMBRE</th>
                            <th>PRECIO UNITARIO</th>
                            <th>CANTIDAD</th>
                            <th>LOTE</th>
                            <th>SUBTOTAL</th>
                            <th>ACCION</th>
                        </tr>
                    </thead>
                    <tbody>                        
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <!-- RESUMEN DE LA VENTA -->
    <div class="row bg-color-white mx-5 rounded-3 mt-4">
        <div class="col-12 d-flex align-items-center py-3">
            <img src="{{ asset('imagen/Icono/IconoDolarCirculo.png') }}" class="" alt="">
            <h2 class="fs-6 ms-2">Resumen de la Venta</h2>
        </div>
        <div class="col-12 ">                   
            <div class="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
                <label class="fw-bold">TOTAL A PAGAR:</label>
                <span id="spanVentaTotalPagar" step="0.01">0.00</span>
            </div>
        </div>         
    </div>

    <!-- BOTONES -->
    <div class="row mt-5 mx-4">
        <div class="col-12 col-md-2 mb-2">
            <button id="btnRegistrarCerrar" class="boton-dos w-100 bg-color-gris-azulado-claro">Cancelar</button>            
        </div>
        <div class="col-12 col-md-4 mb-4">
            <button id="btnRegistrarVenta" class="boton-dos w-100 bg-color-gris-azulado-claro">Registrar Venta</button>
        </div>
    </div>

    <!-- Modal para seleccionar producto -->
    <div class="modal-uno ocultar">
        <div class="fondo"></div>
        <div class="contenedor">
            <div class="row p-3">
                <div class="col-8 col-md-5">
                    <input id="txtProductoBuscarModal" placeholder="Buscar por cualquier campo" class="form-control input-base">
                </div>
                <div class="col-4 col-md-2">
                    <button id="btnProductoCancelarModal" class="boton-dos w-100">Cancelar</button>
                </div>
            </div>
            <div class="row mx-1">
                <div class="col-12">
                    <div class="table-responsive">
                        <table id="tblProducto" class="table-dos w-100">
                            <thead>
                                <tr>
                                    <th>Codigo</th>
                                    <th>Nombre</th>
                                    <th>Precio Unitario</th>
                                    <th>Lote</th>
                                </tr>
                            </thead>
                            <tbody>

                            </tbody>
                        </table>
                    </div>  
                </div>
            </div>
        </div>
    </div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
</body>
</html>