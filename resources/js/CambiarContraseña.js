const csrfToken = document.querySelector("meta[name='csrf-token']").getAttribute("content");
document.addEventListener("DOMContentLoaded",function(){
    Alerta(true);
    document.getElementById("btnCerrar").onclick = function () {
        Alerta(true);
    };     
    document.getElementById("btnCambiarContraseña").onclick = UsuarioCambiarContraseña;


    document.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        document.getElementById("btnCambiarContraseña").onclick= UsuarioCambiarContraseña;
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


// =============================================================
// VALIDAR CAMPOS DE USUARIO
// =============================================================
function ValidarCampo(D) {

    // Validar campos vacíos
    if (!D.codigo)          return "Ingresa el código del usuario";
    if (!D.contrasena)      return "Ingresa una contraseña";

    // Validar contraseña (mínimo 8 caracteres, letras y números)
    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(D.contrasena)) {
        return "La contraseña debe tener mínimo 8 caracteres y contener letras y números";
    }

    return 1;
}
async function UsuarioCambiarContraseña(){
    try{
        //OBtener contraseñas
        let Contraseña = document.getElementById("txtContraseña").value.trim();
        let ContraseñaRepetida = document.getElementById("txtContraseñaRepetida").value.trim();
        let UsuarioCodigo = localStorage.getItem("UsuarioCodigo");        
        if(Contraseña === ContraseñaRepetida){
            //Obtener datos
            let Datos={                
                codigo:UsuarioCodigo,
                contrasena:ContraseñaRepetida
            }
            //Enviar peticion
            let Mensaje = await EnviarFetch("/cambiar_contraseña","POST",Datos);
            if(Mensaje.mensaje){
                Alerta(false,"IconoExito.png",Mensaje.mensaje);
                setTimeout(()=>{
                    window.location.href="/login";
                },1000);
            }else if(Mensaje.mensaje1){
                Alerta(false,"IconoAdvertencia.png",Mensaje.mensaje1);
            }else if(Mensaje.error){
                Alerta(false,"IconoError.png","Revisar consola");
                console.log(Mensaje.error);
            }
        }else{
            Alerta(false,"IconoAdvertencia.png","Las Contraseñas no coinciden");
        }        

    }catch(e){
        Alerta(false,"IconoError.png","Revisar consola");
        console.log(e.stack);
    }
}