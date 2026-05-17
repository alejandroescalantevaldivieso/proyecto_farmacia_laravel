document.addEventListener("DOMContentLoaded", function () {
    OcultarTabla(false, true);
    Alerta(true);
    UsuarioListar();
    UsuarioListarEliminado();
    UsuarioMostrarModal(true);
    RolListar();
    EmpleadoListar();
    EmpleadoBuscar();
    UsuarioBuscar();
    UsuarioBuscarEliminado();
    EmpleadoMostrarModal(true);
    document.getElementById("btnUsuarioRegistrar").onclick = UsuarioRegistrar;

    document.getElementById("btnCerrar").onclick = function () {
        Alerta(true);
    };
    document.getElementById("btnEmpleadoCancelar").onclick = function () {
        EmpleadoMostrarModal(true)
    };
    document.getElementById("btnUsuarioActivo").addEventListener("click", function () {
        OcultarTabla(false, true);
    });
    document.getElementById("btnUsuarioEliminado").addEventListener("click", function () {
        OcultarTabla(true, false);
    });
    document.getElementById("btnUsuarioMostrarModal").onclick = function () {
        UsuarioMostrarModal(false);
        UsuarioUltimoCodigo();
    };
    document.getElementById("btnUsuarioCancelarModal").onclick = function () {
        UsuarioMostrarModal(true);
        Limpiar();  
    };
    document.getElementById("btnEmpleadoBuscar").onclick = function () {
        EmpleadoMostrarModal(false);
    };
});

const csrfToken = document.querySelector("meta[name='csrf-token']").getAttribute('content');//Obtener token CSRF


// =============================================================
// FUNCTION PARA OCULTAR Y MOSTRAR TABLAS DE USUARIO
// =============================================================
function OcultarTabla(tblUsuario, tblUsuarioEliminado) {
    //Verificar si la tabla de usuarios activos debe ocultarse o mostrarse
    if (tblUsuario) {
        document.querySelector(".panel-tabla-usuario").classList.add("ocultar");
    } else {
        document.querySelector(".panel-tabla-usuario").classList.remove("ocultar");
    }

    //Verificar si la tabla de usuarios eliminados debe ocultarse o mostrarse
    if (tblUsuarioEliminado) {
        document.querySelector(".panel-tabla-usuario-eliminado").classList.add("ocultar");
    } else {
        document.querySelector(".panel-tabla-usuario-eliminado").classList.remove("ocultar");
    }
}
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
// FUNCTION PARA OCULTAR DATOS EMPLEADO
// =============================================================
function EmpleadoMostrarModal(Estado) {
    if (Estado) {
        document.querySelector(".modal-dos").classList.add("ocultar");
    } else {
        document.querySelector(".modal-dos").classList.remove("ocultar");
    }
}
// =============================================================
// FUNCTION PARA LIMPIAR TODOS LOS CAMPOS Y TABLAS DE SELECCIÓN
// =============================================================
function Limpiar() {
    //Limpiar los campos de texto y selección
    document.getElementById("txtUsuarioCodigo").value = "";
    document.getElementById("txtUsuarioNombre").value = "";
    document.getElementById("txtUsuarioContraseña").value = "";
    document.getElementById("txtEmpleadoCodigo").value = "";
    document.getElementById("txtEmpleadoNombre").value = "";
    document.getElementById("cbxRol").value = "";

    //Limpiar la selección de filas en ambas tablas
    document.querySelectorAll("#tblUsuario tbody tr.SeleccionarFila").forEach(FilaActual => FilaActual.classList.remove("SeleccionarFila"));
    document.querySelectorAll("#tblUsuarioEliminado tbody tr.SeleccionarFila").forEach(FilaActual => FilaActual.classList.remove("SeleccionarFila"));

    document.getElementById("imgIconoModalUsuario").src="/imagen/Icono/IconoUsuarioRegistrar.png";
    document.getElementById("txtModalUsuario").innerText="Registrar Nuevo Usuario";
    document.getElementById("pModalUsuario").innerText="Complete los datos del nuevo usuario para agregarlo al sistema";
    document.getElementById("btnUsuarioRegistrar").innerText="Registrar Usuario";

    UsuarioListar();
    UsuarioListarEliminado();
}
// =============================================================
// FUNCTION PARA SELECCIONAR FILA
// =============================================================
function SeleccionarFila(Fila) {
    //Verificar si la fila ya está seleccionada
    if (Fila.classList.contains("seleccionar-fila")) {
        Fila.classList.remove("seleccionar-fila");
    } else {
        //Limpiar la selección de todas las tablas
        document.querySelectorAll("#tblUsuario tbody tr.seleccionar-fila").forEach(FilaActual => FilaActual.classList.remove("seleccionar-fila"));
        document.querySelectorAll("#tblUsuarioEliminado tbody tr.seleccionar-fila").forEach(FilaActual => FilaActual.classList.remove("seleccionar-fila"));
        document.querySelectorAll("#tblEmpleado tbody tr.seleccionar-fila").forEach(FilaActual => FilaActual.classList.remove("seleccionar-fila"));

        //Aplicar la selección a la fila actual
        Fila.classList.add("seleccionar-fila");
    }
}
// =============================================================
// VALIDAR CAMPOS DE USUARIO
// =============================================================
function ValidarCampo(D) {

    // Validar campos vacíos
    if (!D.codigo)          return "Ingresa el código del usuario";
    if (!D.nombre)          return "Ingresa el nombre del usuario";
    if (!D.contrasena)      return "Ingresa una contraseña";
    if (!D.empleado_codigo) return "Selecciona un empleado";
    if (!D.rol_codigo)      return "Selecciona un rol";

    // Validar nombre (al menos una mayúscula)
    if (!/[A-Z]/.test(D.nombre)) {
        return "El nombre de usuario debe contener al menos una letra mayúscula";
    }

    // Validar contraseña (mínimo 8 caracteres, letras y números)
    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(D.contrasena)) {
        return "La contraseña debe tener mínimo 8 caracteres y contener letras y números";
    }

    return 1;
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
// FUNCTION PARA BUSCAR EMPLEADO
// =============================================================
function EmpleadoBuscar() {
    document.getElementById("txtEmpleadoBuscar").addEventListener("input", function () {
        //Obtener el valor ingresado por el input
        let Filtro = this.value.trim().toLowerCase();
        //Obtener todas las filas de la tabla de empleado 
        let Filas = document.querySelectorAll("#tblEmpleado tbody tr");
        Filas.forEach(FilaActual => {
            let texFila = FilaActual.innerText.toLowerCase();//Obtener el contenido de la fila
            if (texFila.includes(Filtro)) {
                FilaActual.style.display = "";
            } else {
                FilaActual.style.display = "none";
            }
        });
    });
}
//FUNCTION PARA REGISTRAR USUARIO
async function UsuarioRegistrar() {
    try {
        //Obtener datos
        let Datos = {
            accion: "usuario_registrar",
            codigo: document.getElementById("txtUsuarioCodigo").value,
            nombre: document.getElementById("txtUsuarioNombre").value,
            contrasena: document.getElementById("txtUsuarioContraseña").value,
            empleado_codigo: document.getElementById("txtEmpleadoCodigo").value,
            rol_codigo: document.getElementById("cbxRol").value
        }
        //Validar si estan completos los datos
        let Valor = ValidarCampo(Datos);
        if (Valor == 1) {
            //Enviar peticion
            let Mensaje = await EnviarFetch("/control_usuario", "POST", Datos);
            if (Mensaje.mensaje) {
                Alerta(false, "IconoExito.png", Mensaje.mensaje);
                Limpiar();
                UsuarioMostrarModal(true);
            }else if (Mensaje.error) {
                Alerta(false, "IconoError.png", "Revisar consola");
                Limpiar();
                UsuarioMostrarModal(true);
                console.log(Mensaje.error);
            }
        } else {
            Alerta(false, "IconoAdvertencia.png", Valor);
        }

    } catch (e) {
        Alerta(false, "IconoError.png", "Revisar consola");
        console.log(e.stack);
    }
}
//FUNCTION PARA ACTUALIZAR USUARIO
async function UsuarioActualizar() {
    try {
        //Obtener los datos
        let Datos = {
            accion: "usuario_actualizar",
            codigo: document.getElementById("txtUsuarioCodigo").value,
            nombre: document.getElementById("txtUsuarioNombre").value,
            contrasena: document.getElementById("txtUsuarioContraseña").value,
            empleado_codigo: document.getElementById("txtEmpleadoCodigo").value,
            rol_codigo: document.getElementById("cbxRol").value
        }
        //Validar datos completos
        let Valor = ValidarCampo(Datos);
        if (Valor == 1) {

            //Enviamos peticion
            let Mensaje = await EnviarFetch("/control_usuario", "POST", Datos);
            if (Mensaje.mensaje) {
                Alerta(false, "IconoExito.png", Mensaje.mensaje);
                Limpiar();
                UsuarioMostrarModal(true);
            } else if (Mensaje.mensaje1) {
                Alerta(false, "IconoAdvertencia.png", Mensaje.mensaje1);
                Limpiar();
                UsuarioMostrarModal(true);
            } else if (Mensaje.error) {
                Alerta(false, "IconoError.png", "Revisar consola");
                console.log(Mensaje.error);
                Limpiar();
                UsuarioMostrarModal(true);
            }
        } else {
            Alerta(false, "IconoAdvertencia.png", Valor);
        }
    } catch (e) {
        Alerta(false, "IconoError.png", "Revisar consola");
        console.log(e.stack);
    }
}
// =============================================================
// FUNCTION PARA ELIMINAR USUARIO
// =============================================================
async function UsuarioEliminar(UsuarioCodigo) {
    try {
        // Crear el objeto con los datos necesarios para la petición
        let Datos = {
            accion: "usuario_eliminar",
            codigo: UsuarioCodigo
        }

        // Enviar la petición al controlador y esperar la respuesta
        let Mensaje = await EnviarFetch("/control_usuario", "POST", Datos);

        if (Mensaje.mensaje) {
            // Si la eliminación fue exitosa, mostrar alerta y limpiar campos
            Alerta(false, "IconoExito.png", Mensaje.mensaje);
            Limpiar();
        }else if (Mensaje.error) {
            // Si ocurrió un error técnico
            Alerta(false, "IconoError.png", "Revisar consola");
            console.log(Mensaje.error);
        }

    } catch (e) {
        // Capturar cualquier error en el proceso y mostrar alerta
        Alerta(false, "IconoError.png", "Revisar consola");
        console.log(e.stack);
    }
}
// =============================================================
// FUNCTION PARA RECUPERAR USUARIO
// =============================================================
async function UsuarioRecuperar(UsuarioCodigo) {
    try {
        // Crear el objeto con los datos necesarios para la petición
        let Datos = {
            accion: "usuario_recuperar",
            codigo: UsuarioCodigo
        }

        // Enviar la petición al controlador y esperar la respuesta
        let Mensaje = await EnviarFetch("/control_usuario", "POST", Datos);

        if (Mensaje.mensaje) {
            // Si la recuperación fue exitosa, mostrar alerta y limpiar campos
            Alerta(false, "IconoExito.png", Mensaje.mensaje);
            Limpiar();
        }else if (Mensaje.error) {
            // Si ocurrió un error técnico
            Alerta(false, "IconoError.png", "Revisar consola");
            console.log(Mensaje.error);
        }

    } catch (e) {
        // Capturar cualquier error en el proceso y mostrar alerta
        Alerta(false, "IconoError.png", "Revisar consola");
        console.log(e.stack);
    }
}
// =============================================================
// FUNCTION PARA BUSCAR USUARIO
// =============================================================
function UsuarioBuscar() {
    // Agrega un evento 'input' al campo de búsqueda de usuarios activos
    document.getElementById("txtUsuarioBuscar").addEventListener("input", function () {
        let Filtro = this.value.trim().toLowerCase();
        let Filas = document.querySelectorAll("#tblUsuario tbody tr");

        // Recorrer cada fila para verificar si coincide con el filtro
        Filas.forEach(FilaActual => {
            let textFila = FilaActual.innerText.toLowerCase();
            // Mostrar la fila si contiene el texto buscado, o esconderla si no
            if (textFila.includes(Filtro)) {
                FilaActual.style.display = "";
            } else {
                FilaActual.style.display = "none";
            }
        });
    });
}
// =============================================================
// FUNCTION PARA BUSCAR USUARIO ELIMINADO
// =============================================================
function UsuarioBuscarEliminado() {
    // Agrega un evento 'input' al campo de búsqueda de usuarios eliminados
    document.getElementById("txtUsuarioBuscarEliminado").addEventListener("input", function () {
        let Filtro = this.value.trim().toLowerCase();
        let Filas = document.querySelectorAll("#tblUsuarioEliminado tbody tr");

        // Recorrer cada fila para verificar si coincide con el filtro
        Filas.forEach(FilaActual => {
            // Obtener todo el texto contenido en la fila actual
            let Fila = FilaActual.innerText.toLowerCase();

            // Mostrar la fila si contiene el texto buscado, o esconderla si no
            if (Fila.includes(Filtro)) {
                FilaActual.style.display = "";
            } else {
                FilaActual.style.display = "none";
            }
        });
    });
}
// =============================================================
// FUNCTION PARA LISTAR USUARIO
// =============================================================
async function UsuarioListar() {
    try {
        //Obtener datos
        let Datos = {
            accion: "usuario_listar"
        }
        //Enviar peticion
        let Mensaje = await EnviarFetch("/control_usuario", "POST", Datos);
        if (Mensaje.mensaje) {
            let Usuarios = Mensaje.mensaje;//Obtener el array con usuarios
            //Obtener el cuerpo de la tabla
            let tbody = document.querySelector("#tblUsuario tbody");
            tbody.innerHTML = "";//LImpiamos cuerpo de la tabla
            for (let i = Usuarios.length - 1; i >= 0; i--) {
                let Fila = tbody.insertRow();//Insertamos fila
                
                Fila.insertCell().innerText = Usuarios[i].codigo;
                Fila.insertCell().innerText = Usuarios[i].nombre;
                Fila.insertCell().innerText = Usuarios[i].empleado_codigo;
                Fila.insertCell().innerText = Usuarios[i].rol_codigo;

                let btnEliminar = Fila.insertCell();
                btnEliminar.innerHTML = "<img src='/imagen/Icono/IconoEliminar.png' title='Eliminar'>";

                btnEliminar.onclick = function (e) {                    
                    UsuarioEliminar(Usuarios[i].codigo);
                }

                let btnEditar = Fila.insertCell();
                btnEditar.innerHTML = "<img src='/imagen/Icono/IconoEditar.png' title='Editar'>";

                btnEditar.onclick=function(e){                    
                    UsuarioMostrarModalEditar(Usuarios[i].codigo,Usuarios[i].nombre,Usuarios[i].empleado_codigo,Usuarios[i].empleado.nombre,Usuarios[i].rol_codigo);
                }
            }
        } else if (Mensaje.mensaje1) {
            console.log(Mensaje.mensaje1);
            //Limpiamos la tabla
            let tbody = document.querySelector("#tblUsuario tbody");
            tbody.innerHTML = "";
        } else if (Mensaje.error) {
            Alerta(false, "IconoError.png", "Revisar consola");
            console.log(Mensaje.error);
            return;
        }
    } catch (e) {
        // =============================================================
        // BLOQUE CATCH → CAPTURA CUALQUIER ERROR EN EL PROCESO
        // =============================================================
        /*Alerta(false,"IconoError.png","ERROR:Revisar consola");*/
        console.log(e.stack);
    }
}
// =============================================================
// FUNCTION PARA LISTAR USUARIOS ELIMINADOS
// =============================================================
async function UsuarioListarEliminado() {
    try {
        // Obtener los datos a enviar al controlador
        let Datos = {
            accion: "usuario_listar_eliminado"
        }

        // Enviar la petición al controlador y esperar la respuesta
        let Mensaje = await EnviarFetch("/control_usuario", "POST", Datos);

        if (Mensaje.mensaje) {
            let Usuarios = Mensaje.mensaje;
            let tbody = document.querySelector("#tblUsuarioEliminado tbody");
            tbody.innerHTML = "";

            for (let i = Usuarios.length - 1; i >= 0; i--) {
                let Fila = tbody.insertRow();

                // Insertar las celdas con los datos del usuario eliminado
                Fila.insertCell().innerText = Usuarios[i].codigo;
                Fila.insertCell().innerText = Usuarios[i].nombre;
                Fila.insertCell().innerText = Usuarios[i].empleado_codigo;
                Fila.insertCell().innerText = Usuarios[i].rol_codigo;

                // Insertar el botón de recuperar usuario
                let btnRecuperar = Fila.insertCell();
                btnRecuperar.innerHTML = "<img src='/imagen/Icono/IconoRecuperar.png' title='Recuperar'>";

                //accion para recuperar 
                btnRecuperar.onclick = function () {                    
                    UsuarioRecuperar(Usuarios[i].codigo);
                }
            }
        } else if (Mensaje.mensaje1) {
            console.log(Mensaje.mensaje1);
            let tbody = document.querySelector("#tblUsuarioEliminado tbody");
            tbody.innerHTML = "";            
        } else if (Mensaje.error) {
            Alerta(false, "IconoError.png", "Revisar consola");     
            console.log(Mensaje.error);     
        }
    } catch (e) {
        // Capturar y mostrar cualquier error en consola y alerta
        Alerta(false, "IconoError.png", "Revisar consola");
        console.log(e.stack);
    }
}

async function UsuarioUltimoCodigo() {
    try {
        //Obtener datos
        let Datos = {
            accion: "usuario_ultimo_codigo"
        }
        //Enviar petición
        let Mensaje = await EnviarFetch("/control_usuario", "POST", Datos);
        if (Mensaje.mensaje) {
            //Obtenemos el codigo 
            let Codigo = Mensaje.mensaje;
            //Prefijo
            let Prefijo = Codigo.toString().slice(0, 3);
            //Numero 
            let Numero = parseInt(Codigo.toString().slice(3)) + 1;
            //Nuevo numero<
            let Num = Numero.toString().padStart(4, "0");
            //Nuevo codigo 
            let CodigoNuevo = Prefijo + Num;
            document.getElementById("txtUsuarioCodigo").value = CodigoNuevo;
        } else if (Mensaje.mensaje1) {
            //Mostrar codigo default
            document.getElementById("txtUsuarioCodigo").value = "USU0001";
        } else if (Mensaje.error) {
            Alerta(false, "IconoAdvertencia.png", "Revisar consola");
            console.log(Mensaje.error);
        }
    } catch (e) {
        Alerta(false, "IconoError.png", "Revisar consola");
        console.log(e.stack);
    }
}
//FUNCTION PARA LISTAR EMPLEADO
async function EmpleadoListar() {
    try {
        //Obtener datos
        let Datos = {
            accion: "empleado_listar"
        }
        //Enviar petición
        let Mensaje = await EnviarFetch("/control_empleado", "POST", Datos);
        if (Mensaje.mensaje) {
            //Obtener los empleados
            let Empleados = Mensaje.mensaje;
            //Obtener el cuerpo de la tabla
            let tbody = document.querySelector("#tblEmpleado tbody");
            tbody.innerHTML = "";
            for (let i = Empleados.length - 1; i >= 0; i--) {
                //Insertamos una fila
                let Fila = tbody.insertRow();
                Fila.insertCell().innerText = Empleados[i].codigo;
                Fila.insertCell().innerText = Empleados[i].nombre;
                Fila.insertCell().innerText = Empleados[i].numero_documento;

                let btnSeleccionar = Fila.insertCell();
                btnSeleccionar.innerHTML = "<img src='/imagen/Icono/IconoSeleccionar.png' title='Seleccionar'>";

                btnSeleccionar.onclick = function () {                   
                    document.getElementById("txtEmpleadoCodigo").value = Empleados[i].codigo;
                    document.getElementById("txtEmpleadoNombre").value = Empleados[i].nombre;
                    EmpleadoMostrarModal(true);
                }
            }
        } else if (Mensaje.mensaje1) {
            console.log(Mensaje.mensaje1);
            //Limpiar filas
            let tbody = document.querySelector("#tblEmpleado tbody");
            tbody.innerHTML = "";
        } else if (Mensaje.error) {
            Alerta(false, "IconoError.png", "Revisar consola");
            console.log(Mensaje.error);
        }
    } catch (e) {
        Alerta(false, "IconoError.png", "Revisar consola");
        console.log(e.stack);
    }
}
// =============================================================
// FUNCTION PARA LISTAR ROL
// =============================================================
async function RolListar() {
    try {
        //Obtener los datos 
        let Datos = {
            accion: "rol_listar"
        }
        //Enviar peticion
        let Mensaje = await EnviarFetch("/control_rol", "POST", Datos);
        if (Mensaje.mensaje) {
            let Roles = Mensaje.mensaje;//Obtener roles
            let cbxRol = document.getElementById("cbxRol");//Obtener el select
            cbxRol.innerHTML = "";//Limpiamos select
            //Agregar una opcion incial
            let option = document.createElement("option");
            option.value = "";
            option.innerText = "Codigo de rol";
            cbxRol.appendChild(option);
            for (let i = Roles.length - 1; i >= 0; i--) {
                let option = document.createElement("option");//Creo un option
                option.value = Roles[i].codigo;
                option.innerText = Roles[i].nombre;
                //Inserta la option en el select
                cbxRol.appendChild(option);
            }
        } else if (Mensaje.mensaje1) {
            console.log(Mensaje.mensaje1);
        } else if (Mensaje.error) {
            Alerta(false, "IconoError.png", "Revisar consola");
            console.log(Mensaje.error);
        }
    } catch (e) {
        Alerta(false, "IconoError.png", "Revisar consola");
        console.log(e.stack);
    }
}
// =============================================================
// FUNCTION PARA MOSTRAR VENTANA MODAL USUARIO
// =============================================================
function UsuarioMostrarModal(Estado) {
    if (Estado) {
        document.querySelector(".modal-uno").classList.add("ocultar");
    } else {
        document.querySelector(".modal-uno").classList.remove("ocultar");        
    }
}

function UsuarioMostrarModalEditar(txtUsuarioCodigo,txtUsuarioNombre,txtEmpleadoCodigo,txtEmpleadoNombre,cbxRol){
    UsuarioMostrarModal(false);
    Limpiar();
    document.getElementById("txtUsuarioCodigo").value=txtUsuarioCodigo;
    document.getElementById("txtUsuarioNombre").value=txtUsuarioNombre;
    document.getElementById("txtEmpleadoCodigo").value=txtEmpleadoCodigo;
    document.getElementById("txtEmpleadoNombre").value=txtEmpleadoNombre;
    document.getElementById("cbxRol").value=cbxRol;

    document.getElementById("imgIconoModalUsuario").src="/imagen/Icono/IconoEditarAguamarina.png";
    document.getElementById("txtModalUsuario").innerText="Editar Usuario";
    document.getElementById("pModalUsuario").innerText="Modifique los datos del usuario "+ txtUsuarioCodigo;
    document.getElementById("btnUsuarioRegistrar").innerText="Guardar Cambios";

    document.getElementById("btnUsuarioRegistrar").onclick=UsuarioActualizar;
}