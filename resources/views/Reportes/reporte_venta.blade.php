<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: DejaVu Sans, sans-serif; font-size: 12px; }
        table { width: 100%; border-collapse: collapse; margin-top: 10px; }
        th, td { border: 1px solid #000; padding: 5px; }
        th { background: #e6e6e6; }
        h2 { margin-bottom: 0; }
    </style>
</head>
<body>

<h2>Reporte de Ventas</h2>

@if($fecha_inicio && $fecha_fin)
<p><strong>Rango:</strong> {{ $fecha_inicio }} → {{ $fecha_fin }}</p>
@endif

@if($usuario_codigo)
<p><strong>Usuario:</strong> {{ $usuario_codigo }}</p>
@endif

<table>
    <thead>
        <tr>
            <th>VENTA</th>
            <th>FECHA</th>
            <th>TOTAL</th>
            <th>USUARIO</th>

            <th>PROD COD</th>
            <th>PRODUCTO</th>
            <th>CANT.</th>
            <th>P. UNIT</th>
            <th>SUBTOTAL</th>
            <th>LOTE</th>
        </tr>
    </thead>
    <tbody>

        @foreach($ventas as $venta)
            @foreach($venta->detalles as $det)
            <tr>
                <td>{{ $venta->codigo }}</td>
                <td>{{ $venta->fecha }}</td>
                <td>{{ number_format($venta->total,2) }}</td>
                <td>{{ $venta->usuario->nombre }}</td>

                <td>{{ $det->producto->codigo }}</td>
                <td>{{ $det->producto->nombre }}</td>
                <td>{{ $det->cantidad }}</td>
                <td>{{ number_format($det->precio_unitario,2) }}</td>
                <td>{{ number_format($det->subtotal,2) }}</td>
                <td>{{ $det->lote }}</td>
            </tr>
            @endforeach
        @endforeach

    </tbody>
</table>

</body>
</html>
