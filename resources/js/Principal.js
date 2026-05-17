
import Chart from 'chart.js/auto';
let CsrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

document.addEventListener("DOMContentLoaded", function () {
    
    document.getElementById("btnInicio").onclick = function () {
        window.location.href = "/principal";
    };
    document.getElementById("btnNuevaVenta").onclick = function(){
        AbrirPagina("/venta");
    }
    document.getElementById("btnVentaRealizada").onclick = function (){
        AbrirPagina("/venta_realizada");
    }
    document.getElementById("btnNuevaCompra").onclick = function (){
        AbrirPagina("/compra");
    }
    document.getElementById("btnComprasRealizadas").onclick = function (){
        AbrirPagina("/compra_realizada");
    }


    document.getElementById("btnEmpleado").onclick = function () {
        AbrirPagina("/empleado");
    };
    document.getElementById("btnUsuario").onclick = function () {
        AbrirPagina("/usuario");
    };
    document.getElementById("btnProveedor").onclick = function () {
        AbrirPagina("/proveedor");
    };
    document.getElementById("btnTipoProducto").onclick = function () {
        AbrirPagina("/tipo_producto");
    };
    document.getElementById("btnStock").onclick = function () {
        AbrirPagina("/stock");
    }
    document.getElementById("btnProducto").onclick = function () {
        AbrirPagina("/producto");
    };

    AbrirPagina("/dashboard");





    // //MostrarInformacion();
    // //setInterval(MostrarFecha,1000);
    document.getElementById("btnCerrarSesion").onclick = CerrarSesion;
    document.getElementById("btnHamburguesa").onclick = AbrirMenu;
});


//FUNCTION PARA ABRIR PAGINA
function AbrirPagina(Url) {
    document.getElementById("Contenedor").src = Url;
}

//FUNCTION PARA MOSTRAR DATOS EN LA BARRA DE INFORMACIÓN
function MostrarInformacion(){
    document.getElementById("txtCodigo").value = UsuarioCodigo;
    document.getElementById("txtNombre").value = UsuarioNombre;
}
//FUNCTION PARA MOSTRAR FECHA Y HORA
function MostrarFecha(){
    document.getElementById("txtFecha").value = new Date().toLocaleDateString();
    document.getElementById("txtHora").value = new Date().toLocaleTimeString();
}

//FUNCTION PARA CERRAR SESIÓN
async function CerrarSesion() {
    try{
        let Respuesta = await EnviarFetch("/login/cerrar_sesion","POST",{});
        if(Respuesta.mensaje){
            window.location.href = "/login";
        }else if(Respuesta.error){
            console.error(Respuesta.error);
        }
    }catch(e){
        console.error(e);
    }
}
function AbrirMenu() {
    //Obtener el menu
    let Menu = document.querySelector(".menu-vertical");
    if (Menu.classList.contains("Ocultar")) {
        Menu.classList.remove("Ocultar");
    } else {
        Menu.classList.add("Ocultar");
    }
}

async function EnviarFetch(Url,Metodo,Datos){
    try{
        let Respuesta = await fetch(Url,{
            method: Metodo,
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": CsrfToken
            },
            body: JSON.stringify(Datos)
        })

        if(!Respuesta.ok){
            throw new Error("Error en la solicitud: "+Respuesta.statusText);
        }

        return await Respuesta.json();
    }catch(e){
        throw e;
    }
}

