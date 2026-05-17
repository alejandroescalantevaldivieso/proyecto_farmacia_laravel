<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width , initial-scale=1.0">
        <title>LOGIN</title>
        <link rel="icon" type="image/png" href="{{ asset('imagen/Icono/IconoFarmacia.png') }}">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

        <meta name="csrf-token" content="{{ csrf_token() }}">

        @vite(['resources/css/Ale.css','resources/css/Login.css','resources/css/Empleado.css','resources/js/Login.js'])
        
    </head>
    <body class="align-items-center d-flex fondo-uno">

        <!-- Contenedor de alerta personalizada -->
        <div class="alerta-uno">            
            <div class="fondo"></div>           
            <div class="alerta">
                <img id="imgIcono" src="{{ asset('imagen/Icono/IconoError.png') }}">
                <p id="pMensaje"></p>
                <button id="btnCerrar">CERRAR</button>
            </div>
        </div>
        
        <!-- Contenedor -->
        <div class="Contenedor">  
            <h2>Login</h2><br>                          
            <input id="txtNombre" type="text" placeholder="Usuario..."><br>                                   
            <input id="txtContraseña" type="password" placeholder="Contraseña..."><br> 
            <a class="text-color-white text-center d-block mb-3" href="/validar_correo">¿Olvidaste tu contraseña?</a> 

            <input id="chkMostrarContraseña" type="checkbox" class=" input">
            <label for="chkMostrarContraseña" class="input__label"></label><br>        
                   
            <button id="btnIniciar" class="boton-uno" >INICIAR</button> 
            
            <!-- Barra de cargar -->
            <div class="barra-carga-uno">
                <div class="progreso">Cargando datos</div>
            </div>          
        </div>        

        
        
    <!-- Bootstrap JS desde CDN -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    </body>
</html>
