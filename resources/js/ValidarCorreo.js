const csrfToken = document.querySelector("meta[name='csrf-token']").getAttribute("content");

document.addEventListener("DOMContentLoaded", function () {
    Alerta(true);
    document.getElementById("btnValidarCorreo").onclick=function(){
        UsuarioValidarCorreo();
    }
    document.getElementById("btnCerrar").onclick = function () {
        Alerta(true);
    };
    document.getElementById("btnRegresar").onclick = function(){
        window.location.href="/loginx";
    }

    //Permitir enviar formulario con enter
    document.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        document.getElementById("btnValidarCorreo").click();
    }
    });

});

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
        document.getElementById("imgIcono").src = "/imagen/Icono/" + Icono;
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

async function UsuarioValidarCorreo(){
    try{
        if(document.getElementById("txtEmpleadoCorreo").value ==""){
            Alerta(false,"IconoAdvertencia.png","Ingresa un correo");
        }else{
            //Obtener datos
            let Datos={                
                correo:document.getElementById("txtEmpleadoCorreo").value
            }
            Alerta(false,"IconoCarga.png","Procesando...");
            //Enviar peticion
            let Mensaje = await EnviarFetch("/validar_correo", "POST", Datos);
            if(Mensaje.mensaje){
                Alerta(false,"IconoExito.png",Mensaje.mensaje);
                setTimeout(()=>{
                    localStorage.setItem("UsuarioCodigo",Mensaje.usuario_codigo);
                    localStorage.setItem("CodigoGenerado",Mensaje.codigo_generado);
                    window.location.href=`/validar_codigo`;
                }, 1000);
               
                
            }else if(Mensaje.mensaje1){
                Alerta(false,"IconoAdvertencia.png",Mensaje.mensaje1);
            }else if(Mensaje.error){
                Alerta(false,"IconoError.png","Revisar consola");
                console.log(Mensaje.error);
            } 
        }
        
    }catch(e){
        console.log(e.stack);
    }
}