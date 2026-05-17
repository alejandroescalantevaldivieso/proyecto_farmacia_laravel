<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>VENTAS REALIZADAS</title>
    <link rel="icon" href="{{ asset('imagen/Icono/IconoFarmacia.png') }}" type="image/png"/>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" crossorigin="anonymous">

    <meta name="csrf-token" content="{{ csrf_token() }}">
    @vite(['resources/css/Ale.css','resources/css/Venta.css','resources/js/VentaRealizada.js'])
</head>
<body class="bg-color-blanco-dos">
    <!-- PANEL SUPERIOR -->
    <div class="row ps-5 g-0 align-items-center py-2 bg-color-aguamarina">
        <div class="col-auto d-flex justify-content-end">
            <img src="{{ asset('imagen/Icono/IconoCarrito.png') }}" alt="Icono Ventas">
        </div>
        <div class="col ps-3">
            <h2 class="fs-4 mb-0 text-color-white">Ventas realizadas</h2>
            <p class="fs-6 mb-0 text-color-white">Listado completo de ventas con su detalle</p>
        </div>
    </div>


    <form action="{{ route('reportes.ventas.pdf') }}" method="GET" class="mx-5 mt-4 row g-3">

        <div class="col-md-3">
            <label class="form-label">Fecha inicio</label>
            <input type="date" name="fecha_inicio" class="form-control">
        </div>

        <div class="col-md-3">
            <label class="form-label">Fecha fin</label>
            <input type="date" name="fecha_fin" class="form-control">
        </div>

        <div class="col-md-3">
            <label class="form-label">Usuario</label>
            <input type="text" name="usuario_codigo" class="form-control" placeholder="USU0001">
        </div>

        <div class="col-md-3 d-flex align-items-end">
            <button class="btn btn-danger w-100">Exportar PDF</button>
        </div>
    </form>



    <!-- TABLA ÚNICA: cada fila = detalle de venta -->
    <div class="row bg-color-white mx-5 mt-4 rounded-3 panel-tabla-producto p-3">
        <div class="col-12">
            <div class="table-responsive">
                <table id="tblVentasRealizadas" class="table-dos w-100">
                    <thead>
                        <tr>
                            <th>VENTA</th>
                            <th>FECHA VENTA</th>
                            <th>TOTAL VENTA</th>
                            <th>USUARIO</th>

                            <th>PRODUCTO COD</th>
                            <th>PRODUCTO NOMBRE</th>
                            <th>CANTIDAD</th>
                            <th>PRECIO U.</th>
                            <th>SUBTOTAL</th>
                            <th>LOTE</th>
                            <th>BOLETA</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- Filas cargadas por JS -->
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
</body>
</html>