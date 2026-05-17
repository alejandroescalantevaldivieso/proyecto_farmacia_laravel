const csrfToken = document.querySelector("meta[name='csrf-token']").getAttribute("content");

document.addEventListener("DOMContentLoaded",function(){

    Alerta(true);
    document.getElementById("btnCerrar").onclick = function () {
        Alerta(true);
    };
    document.getElementById("btnValidarCodigo").onclick = ValidarCodigo;

    //Permitir enviar formulario con enter
    document.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        document.getElementById("btnValidarCodigo").click();
    }
    });
})

// =============================================================
// FUNCTION PARA MOSTRAR U OCULTAR ALERTA EN PANTALLA
// =============================================================
function Alerta(Ocultar, Icono = "", Mensaje = "") {
    //Si se debe ocultar la alerta
    if (Ocultar) {
        document.querySelector(".alerta-uno").classList.add("ocultar");
    } else {
        //Mostrar alerta con icono y mensaje personalizado
        document.querySelector(".alerta-uno").classList.remove("ocultar");
        document.getElementById("imgIcono").src = "../../Imagen/Icono/" + Icono;
        document.getElementById("pMensaje").innerText = Mensaje;
    }
}

// =============================================================
// FUNCTION PARA ENVIAR FETCH
// =============================================================
async function EnviarFetch(Url, Metodo, Datos) {
    try {
        let Respuesta = await fetch(Url, {
            method: Metodo,
            headers: { 
                "Content-Type": "application/json", 
                "X-CSRF-TOKEN": csrfToken
            },
            body: JSON.stringify(Datos)
        });
        if (!Respuesta.ok) {
            throw new Error(`Error: ${Respuesta.status}: ${Respuesta.statusText}`);
        }
        //Convertir a json la respuesta
        let Mensaje = await Respuesta.json();
        return Mensaje;
    } catch (e) {
        throw e;
    }
}
//Function para validar codigo
function ValidarCodigo(){
    //Codigo ingresado
    let CodigoIngresado = document.getElementById("txtCodigo").value.trim();
    //Codigo de verifacion
    let CodigoVerificado = localStorage.getItem("CodigoGenerado").trim();

    //Validar
    if(CodigoIngresado === CodigoVerificado){
        Alerta(false,"IconoExito.png","Codigo correcto");
        setTimeout(()=>{
            window.location.href="/cambiar_contraseña";
        },1000);
    }else{
        Alerta(false,"IconoAdvertencia.png","Codigo no valido");
    }
}