<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Validar Codigo</title>
    <!-- Icono de la pestaña del navegador -->
    <link rel="icon" type="image/png" href="{{ asset('imagen/Icono/IconoFarmacia.png') }}">
    <!-- Bootstrap CSS desde CDN -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    @vite(['resources/css/Ale.css','resources/css/ValidarCorreo.css','resources/js/ValidarCodigo.js'])
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

    <div class="contenedor">
        <div class="d-flex align-items-center p-3 mb-4">
            <img  class="me-2"src="{{ asset('imagen/Icono/IconoValidar.png') }}">
            <h2 class="fs-4">Validar Codigo</h2>
        </div>
        <div class="p-3 h-100">
            <div class="d-flex justify-content-center mt-1 px-5 mt-md-5">
                <input id="txtCodigo" type="email" class="input-base form-control"placeholder="Ejem: m2c2ss">
            </div>
            <div class="d-flex justify-content-center mt-4">
                <button id="btnValidarCodigo" class="boton-dos">Validar Codigo</button>
            </div>
        </div>
    </div> 
</body>
</html>