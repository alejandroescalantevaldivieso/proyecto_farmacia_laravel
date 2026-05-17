<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: sans-serif; font-size: 12px; }
        table { width: 100%; border-collapse: collapse; }
        th, td { border: 1px solid #555; padding: 4px; }
        th { background: #e5e5e5; }
        h2 { text-align: center; margin-bottom: 20px; }
    </style>
</head>
<body>

<h2>REPORTE DE COMPRAS</h2>


<table>
    <thead>
        <tr>
            <th>COD</th>
            <th>FECHA</th>
            <th>TOTAL</th>
            <th>PROVEEDOR</th>
            <th>USUARIO</th>
            <th>PRODUCTO</th>
            <th>CANT</th>
            <th>P. UNIT</th>
            <th>SUBTOTAL</th>
            <th>LOTE</th>
            <th>VENCIMIENTO</th>
        </tr>
    </thead>
    <tbody>
        @foreach($compras as $c)
            @foreach($c->detalles as $d)
            <tr>
                <td>{{ $c->codigo }}</td>
                <td>{{ $c->fecha }}</td>
                <td>{{ $c->total }}</td>
                <td>{{ $c->proveedor->razon_social }}</td>
                <td>{{ $c->usuario->nombre }}</td>

                <td>{{ $d->producto->nombre }}</td>
                <td>{{ $d->cantidad }}</td>
                <td>{{ $d->precio_unitario }}</td>
                <td>{{ $d->subtotal }}</td>
                <td>{{ $d->lote }}</td>
                <td>{{ $d->fecha_vencimiento }}</td>
            </tr>
            @endforeach
        @endforeach
    </tbody>
</table>

</body>
</html>
