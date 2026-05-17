<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>COMPRA</title>
    <link rel="icon" href="{{ asset('imagen/Icono/IconoFarmacia.png') }}" type="image/png"/>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
    
    <meta name="csrf-token" content="{{ csrf_token() }}">
    @vite(['resources/css/Ale.css','resources/css/Compra.css','resources/js/Compra.js'])
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
        <div class="col-auto d-flex justify-content-end ">
            <img src="{{ asset('imagen/Icono/IconoCaja.png') }}" class="">
        </div>
        <div class="col ps-3">
            <h2 class="fs-4 mb-0 text-color-white">Gestión de Compras</h2>
            <p class="fs-6 mb-0 text-color-white">Sistema de administración de compras y proveedores</p>
        </div>
    </div>

    <!-- INFORMACION DEL TITULO -->
    <div class="row ps-5 pt-4 pb-4">
        <div class="col-12">
            <h2 class="fs-4">Registrar Nueva Compra</h2>
            <p class="fs-6">Seleccione los productos y complete los datos de la compra</p>
        </div>
    </div>

    <!-- INFORMACIÓN GENERAL DE LA COMPRA -->
    <div class="row bg-color-white mx-5 rounded-3">
        <div class="col-12 d-flex align-items-center py-3 boder-bottom-4">
            <img src="{{ asset('imagen/Icono/IconoCarritoCompra.png') }}">
            <h2 class="ps-2 fs-6">Información General de la Compra</h2>
        </div>
        <div class="col-12 col-md-6 mb-2">
            <label >Codigo de compra <small>(obligatorio)</small></label>
            <input id="txtCompraCodigo" type="text" disabled="true" class="form-control input-base">
        </div>
        <div class="col-12 col-md-6 mb-2">
            <label>Fecha y Hora <small><b>(obligatorio)</b></small></label>
            <input id="txtCompraFechaHora" type="date0" disabled="true" class="form-control input-base">
        </div>
        <div class="col-12 col-md-6 mb-2 mb-md-4">
            <label>Proveedor <small><b>(obligatorio)</b></small></label>
            <select id="cbxProveedor" class="form-control input-base cursor-pointer"></select>
        </div>
        <div class="col-12 col-md-6  mb-2 mb-md-4">
            <label>Usuario Responsable <small><b>(obligatorio)</b></small></label>
            <input id="txtCompraUsuarioCodigo" type="text" disabled="true" class="form-control input-base">
        </div>
    </div>

    <!-- Detalle de productos -->
    <div class="row bg-color-white mx-5 rounded-3 mt-4">
        <div class="d-flex align-items-center py-3">
            <img src="{{ asset('imagen/Icono/IconoCajaSinFondo.png') }}">
            <h2 class="fs-6 ms-2">Detalle de Productos</h2>
        </div>
        <div class="col-10 col-md-4 mb-2">
            <label>Producto <small><b>(obligatorio)</b></small></label>
            <input id="txtProductoCodigo" type="text" disabled="true" class="form-control input-base">
        </div>
        <div class="col-1 col-md-1 mt-4 mx-0 px-0">
            <img id="btnProductoSeleccionar" class="pointer" src="{{ asset('imagen/Icono/IconoBuscar.png') }}" alt="Seleccionar">
        </div>
        <div class="col-12 col-md-3 mb-2">
            <label>Cantidad <small><b>(obligatorio)</b></small></label>
            <input id="txtCantidad" type="number" class="form-control input-base">
        </div>
        <div class="col-12 col-md-3 mb-2">
            <label>Precio Unitario <small><b>(obligatorio)</b></small></label>
            <input id="txtProductoPrecioUnitario" type="number" class="form-control input-base">
        </div>
        <div class="col-12 col-md-3 mb-2 mb-md-4">
            <label>Subtotal <small><b>(obligatorio)</b></small></label>
            <input id="txtProductoSubTotal" type="text" disabled="true" class="form-control input-base">
        </div>
        <div class="col-12 col-md-3 mb-2 mb-md-4"> 
            <label>Lote</label>
            <input id="txtProductoLote" type="text" class="form-control input-base">
        </div>
        <div class="col-12 col-md-3 mb-2 mb-md-4">
            <label>Fecha de Vencimiento</label>
            <input id="txtProductoFechaVencimiento" type="date" class="form-control input-base">
        </div>
        <div class="col-12 col-md-2 mb-2 mb-md-4">
            <button id="btnProductoAgregar" class="boton-dos mt-4 w-100 bg-color-gris-azulado-claro">Agregar</button>
        </div>
    </div>

    <!-- Tabla de productos -->
    <div class="row bg-color-white mx-5 mt-4 py-2 panel-tabla-producto">
        <div class="col-12">
            <div class="table-responsive">
                <table id="tblDetalleProducto" class="table-dos">
                    <thead>
                        <tr>
                            <th>CODIGO</th>
                            <th>CANTIDAD</th>
                            <th>PRECIO UNITARIO</th>
                            <th>SUBTOTAL</th>
                            <th>LOTE</th>
                            <th>VENCIMIENTO</th>
                        </tr>
                    </thead>
                    <tbody>                        
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <!-- RESUMEN DE LA COMPRA -->
    <div class="row bg-color-white mx-5 rounded-3 mt-4">
        <div class="col-12 d-flex align-items-center py-3">
            <img src="{{ asset('imagen/Icono/IconoDolarCirculo.png') }}" class="">
            <h2 class="fs-6 ms-2">Resumen de la Compra</h2>
        </div>
        <div class="col-12 ">                   
            <div class="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
                <label class="fw-bold">TOTAL A PAGAR:</label>
                <span id="spanCompraTotalPagar" step="0.01"></span>
            </div>
        </div>         
    </div>
    
    <!-- BOTONES -->
    <div class="row mt-5 mx-4">
        <div class="col-12 col-md-2 mb-2">
            <button id="btnRegistrarCerrar" class="boton-dos w-100 bg-color-gris-azulado-claro">Cancelar</button>            
        </div>
        <div class="col-12 col-md-4 mb-4">
            <button id="btnRegistrarCompra" class="boton-dos w-100 bg-color-gris-azulado-claro">Registrar Compra</button>
        </div>
    </div>

    <!-- Modal para seleccionar producto -->
    <div class="modal-uno">
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
                        <table id="tblProducto" class="table-dos">
                            <thead>
                                <tr>
                                    <th>Codigo</th>
                                    <th>Nombre</th>
                                    <th>Precio Unitario</th>
                                </tr>
                            </thead>
                            <tbody>

                            </tbody>
                        </table>
                    </diV>  
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>
</body>
</html>