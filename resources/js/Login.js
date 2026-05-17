const csrfToken = document.querySelector("meta[name='csrf-token']").getAttribute("content");

document.addEventListener("DOMContentLoaded", function () {
    Alerta(true);                           // Oculta alerta al inicio
    document.getElementById("btnCerrar").onclick = () => Alerta(true);
    BarraCarga(true);                       // Oculta barra de carga
    document.getElementById("btnIniciar").onclick = UsuarioValidar;
    UsuarioValidarEnter();
    document.getElementById("chkMostrarContraseña").onclick = MostrarContraseña;
});

function ValidarCampo(Datos) {
    if (Datos.nombre === "") {
        return "INGRESA TU USUARIO";
    } else if (Datos.contrasena === "") {
        return "INGRESA TU CONTRASEÑA";
    }
    return 1; // Campos completos
}
// ==================== ALERTA ====================
function Alerta(Ocultar, Icono = "", Mensaje = "") {
    if (Ocultar) {
        document.querySelector(".alerta-uno").classList.add("Ocultar");
    } else {
        document.querySelector(".alerta-uno").classList.remove("Ocultar");
        document.getElementById("imgIcono").src = "/imagen/Icono/" + Icono;
        document.getElementById("pMensaje").innerText = Mensaje;
    }
}
// ==================== ENVIAR FETCH ====================
async function EnviarFetch(Url, Metodo, Datos) {
    try {
        let Respuesta = await fetch(Url, {
            method: Metodo,
            headers: { 
                "Content-Type": "application/json", 
                "X-CSRF-TOKEN":csrfToken
            },
            body: JSON.stringify(Datos),
            credentials: 'same-origin'
        });
        if (!Respuesta.ok) {
            throw new Error(`Error: ${Respuesta.status}: ${Respuesta.statusText}`);
        }
        return await Respuesta.json();
    } catch (e) {
        throw e;
    }
}

// ==================== VALIDAR USUARIO ====================
async function UsuarioValidar() {
    try {
        let Datos = {
            nombre: document.getElementById("txtNombre").value.trim(),
            contrasena: document.getElementById("txtContraseña").value.trim()
        };

        let Valor = ValidarCampo(Datos);

        if (Valor == 1) {
            BarraCarga(false);
            let Mensaje = await EnviarFetch("/login/validar_sesion", "POST", Datos);

            setTimeout(() => {
                if (Mensaje.mensaje) { // Credenciales correctas
                    Alerta(false, "IconoExito.png", Mensaje.mensaje);
                    setTimeout(() => {
                        window.location.href = "/principal";
                        let Usuario = document.getElementById("txtNombre").value;
                        speechSynthesis.speak(new SpeechSynthesisUtterance(`Bienvenido ${Usuario}`));
                    }, 1000);
                } else if (Mensaje.mensaje1) { // Credenciales incorrectas
                    Alerta(false, "IconoError.png", Mensaje.mensaje1);
                    BarraCarga(true);
                } else if (Mensaje.error) { // Error de servidor
                    Alerta(false, "IconoError.png", "Revisar consola");
                    console.log(Mensaje.error);
                    BarraCarga(true);
                }
            }, 2000);

        } else {
            Alerta(false, "IconoError.png", Valor);
        }

    } catch (e) {
        Alerta(false, "IconoError.png", "Revisar consola");
        console.log(e.stack);
    }
}


// ==================== VALIDAR USUARIO AL PRESIONAR ENTER ====================
function UsuarioValidarEnter() {
    //Obtener el input de contraseña
    let txtContraseña = document.getElementById("txtContraseña");
    //Obtener el boton de inciar
    let btnIniciar = document.getElementById("btnIniciar");

    //Escuchar cuando se haga enter en el ultimo input(txtContraseña)
    txtContraseña.addEventListener("keypress", function (event) {
        if (event.key == "Enter") {
            btnIniciar.click();
        }
    });
}
// ==================== BARRA DE CARGA ====================
function BarraCarga(Ocultar) {
    if (Ocultar) {
        document.querySelector(".barra-carga-uno").classList.add("Ocultar");
    } else {
        document.querySelector(".barra-carga-uno").classList.remove("Ocultar");
    }
}

function MostrarContraseña() {
    let chkMostrarContraseña = document.getElementById("chkMostrarContraseña");
    let txtContraseña = document.getElementById("txtContraseña");

    if (chkMostrarContraseña.checked) {
        txtContraseña.type="text";
    }else{
        txtContraseña.type="password";
    }
}