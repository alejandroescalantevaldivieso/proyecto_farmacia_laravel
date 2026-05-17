<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>COMPRAS REALIZADAS</title>
    <link rel="icon" href="{{ asset('imagen/Icono/IconoFarmacia.png') }}" type="image/png">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" crossorigin="anonymous">

    <meta name="csrf-token" content="{{ csrf_token() }}">
    @vite(['resources/css/Ale.css','resources/css/Compra.css','resources/js/CompraRealizada.js'])
</head>
<body class="bg-color-blanco-dos">

    <div class="row ps-5 g-0 align-items-center py-2 bg-color-aguamarina">
        <div class="col-auto d-flex justify-content-end">
            <img src="{{ asset('imagen/Icono/IconoCarritoCompra.png') }}" alt="Icono Compras">
        </div>
        <div class="col ps-3">
            <h2 class="fs-4 mb-0 text-color-white">Compras realizadas</h2>
            <p class="fs-6 mb-0 text-color-white">Listado completo de compras con su detalle</p>
        </div>
    </div>


        <form action="{{ route('reportes.compras.pdf') }}" method="GET" class="mx-5 mt-4 d-flex gap-3 align-items-end">

        <div>
            <label>Fecha inicio</label>
            <input type="date" name="fecha_inicio" class="form-control">
        </div>

        <div>
            <label>Fecha fin</label>
            <input type="date" name="fecha_fin" class="form-control">
        </div>

        <div>
            <label>Usuario</label>
            <select name="usuario_codigo" class="form-control">
                <option value="">Todos</option>
                @foreach ($usuarios as $u)
                    <option value="{{ $u->codigo }}">{{ $u->nombre }}</option>
                @endforeach
            </select>
        </div>
            <button type="submit" class="btn btn-danger px-4 py-2">
                Exportar PDF
            </button>
        </form>

    <!-- Única tabla: cada fila representa un detalle asociado a una compra -->
    <div class="row bg-color-white mx-5 mt-4 rounded-3 panel-tabla-producto p-3">
        <div class="col-12">
            <div class="table-responsive">
                <table id="tblComprasRealizadas" class="table-dos w-100">
                    <thead>
                        <tr>
                            <th>COMPRA</th>
                            <th>FECHA DE COMPRA</th>
                            <th>TOTAL COMPRA</th>
                            <th>PROVEEDOR</th>
                            <th>USUARIO</th>

                            <th>PRODUCTO COD</th>
                            <th>PRODUCTO NOMBRE</th>
                            <th>CANTIDAD</th>
                            <th>PRECIO U.</th>
                            <th>SUBTOTAL</th>
                            <th>LOTE</th>
                            <th>VENCIMIENTO</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- Filas cargadas por JS o por controlador -->
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
</body>
</html>
