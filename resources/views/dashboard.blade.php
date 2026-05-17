<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Dashboard</title>

    <meta name="csrf-token" content="{{ csrf_token() }}">
    @vite(['resources/js/dashboard.js', 'resources/css/dashboard.css'])
</head>
<body>
<div class="dashboard">

    <div class="stats">
        <div class="stat">Ventas <strong id="total-ventas">0</strong></div>
        <div class="stat">Compras <strong id="total-compras">0</strong></div>
        <div class="stat">Productos <strong id="total-productos">0</strong></div>
        <div class="stat">Usuarios <strong id="total-usuarios">0</strong></div>
    </div>

    <div class="grid">

        <div class="card wide">
            <h4>Ventas por mes</h4>
            <canvas id="grafico-ventas-por-mes"></canvas>
        </div>

        <div class="card">
            <h4>Resumen general</h4>
            <canvas id="grafico-resumen-general"></canvas>
        </div>

        <div class="card">
            <h4>Compras</h4>
            <canvas id="grafico-total-compras"></canvas>
        </div>

        <div class="card">
            <h4>Productos</h4>
            <canvas id="grafico-total-productos"></canvas>
        </div>

        <div class="card">
            <h4>Usuarios</h4>
            <canvas id="grafico-total-usuarios"></canvas>
        </div>

        <!-- <div class="card">
            <h4>Empleados</h4>
            <canvas id="grafico-total-empleados"></canvas>
        </div> -->

    </div>
</div>


</body>
</html>
