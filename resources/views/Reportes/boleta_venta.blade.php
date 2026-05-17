<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <style>
        /* Diseño moderno y profesional para la boleta */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size: 12px;
            background: #f5f5f5;
            padding: 20px;
            color: #333;
        }
        
        .boleta-container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            padding: 40px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            border-radius: 8px;
        }
        
        h2 {
            color: #2563eb;
            font-size: 24px;
            margin-bottom: 5px;
            text-transform: uppercase;
            letter-spacing: 1px;
            font-weight: 700;
        }
        
        .boleta-container > p:first-of-type {
            color: #64748b;
            font-size: 14px;
            margin-bottom: 20px;
            font-weight: 500;
        }
        
        hr {
            border: none;
            border-top: 2px solid #e2e8f0;
            margin: 20px 0;
        }
        
        .info-venta {
            background: #f8fafc;
            padding: 20px;
            border-radius: 6px;
            border-left: 4px solid #2563eb;
            margin-bottom: 25px;
        }
        
        .info-venta p {
            line-height: 1.8;
            margin: 0;
        }
        
        .info-venta strong {
            color: #1e293b;
            font-weight: 600;
            display: inline-block;
            min-width: 80px;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.05);
            border-radius: 6px;
            overflow: hidden;
        }
        
        thead {
            background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
        }
        
        th {
            color: white;
            padding: 12px 10px;
            text-align: left;
            font-weight: 600;
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            border: none;
        }
        
        th:last-child,
        td:last-child {
            text-align: right;
        }
        
        td {
            padding: 12px 10px;
            border-bottom: 1px solid #e2e8f0;
            color: #475569;
        }
        
        tbody tr {
            transition: background-color 0.2s;
        }
        
        tbody tr:hover {
            background-color: #f8fafc;
        }
        
        tbody tr:last-child td {
            border-bottom: none;
        }
        
        h3 {
            text-align: right;
            margin-top: 25px;
            font-size: 18px;
            color: #1e293b;
            padding: 15px 20px;
            background: #f1f5f9;
            border-radius: 6px;
            border: 2px solid #2563eb;
        }
        
        h3::before {
            content: '';
            display: inline-block;
            width: 4px;
            height: 18px;
            background: #2563eb;
            margin-right: 10px;
            vertical-align: middle;
        }
        
        @media print {
            body {
                background: white;
                padding: 0;
            }
            
            .boleta-container {
                box-shadow: none;
                border-radius: 0;
                padding: 20px;
            }
        }
    </style>
</head>
<body>

<div class="boleta-container">
    <h2>Farmacia LuxFarma</h2>
    <p>Boleta de venta</p>

    <hr>

    <div class="info-venta">
        <p>
            <strong>Venta:</strong> {{ $venta->codigo }} <br>
            <strong>Fecha:</strong> {{ $venta->fecha }} <br>
            <strong>Usuario:</strong> {{ $venta->usuario->nombre }}
        </p>
    </div>

    <table>
        <thead>
            <tr>
                <th>Producto</th>
                <th>Cant.</th>
                <th>P. Unit</th>
                <th>Subtotal</th>
            </tr>
        </thead>
        <tbody>
            @foreach($venta->detalles as $det)
            <tr>
                <td>{{ $det->producto->nombre }}</td>
                <td>{{ $det->cantidad }}</td>
                <td>{{ number_format($det->precio_unitario,2) }}</td>
                <td>{{ number_format($det->subtotal,2) }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <h3>
        Total: S/ {{ number_format($venta->total,2) }}
    </h3>
</div>

</body>
</html>
