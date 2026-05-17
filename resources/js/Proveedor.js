const csrfToken = document.querySelector("meta[name='csrf-token']").getAttribute("content");

document.addEventListener("DOMContentLoaded", function () {
    OcultaTabla(false, true);
    Alerta(true);
    ProveedorListar();
    ProveedorListarEliminado();
    ProveedorBuscar();
    ProveedorBuscarEliminado();
    ProveedorMostrarModal(true);

    document.getElementById("btnProveedorRegistrar").onclick = ProveedorRegistrar;
    
    document.getElementById("btnCerrar").onclick = function () {
        Alerta(true);
    };
    document.getElementById("btnProveedorActivo").addEventListener("click", function () {
        OcultaTabla(false, true);
    });
    document.getElementById("btnProveedorEliminado").addEventListener("click", function () {
        OcultaTabla(true, false);
    });
    document.getElementById("btnProveedorMostrarModal").onclick = function () {
        Limpiar();
        ProveedorMostrarModal(false);
        ProveedorUltimoCodigo();
    };
    document.getElementById("btnProveedorCerrarModal").onclick = function () {
        ProveedorMostrarModal(true);    
        Limpiar(); 
    };
});

// =============================================================
// FUNCTION PARA OCULTAR TABLAS
// =============================================================
function OcultaTabla(tblProveedor, tblProveedorEliminado) {
    // Ocultar o mostrar tabla de proveedores
    if (tblProveedor) {
        document.querySelector(".panel-tabla-proveedor").classList.add("ocultar");
    } else {
        document.querySelector(".panel-tabla-proveedor").classList.remove("ocultar");
    }

    // Ocultar o mostrar tabla de proveedores eliminados
    if (tblProveedorEliminado) {
        document.querySelector(".panel-tabla-proveedor-eliminado").classList.add("ocultar");
    } else {
        document.querySelector(".panel-tabla-proveedor-eliminado").classList.remove("ocultar");
    }
}

// =============================================================
// FUNCTION PARA ALERTA
// =============================================================
function Alerta(Ocultar, Icono = "", Mensaje = "") {
    if (Ocultar) {
        document.querySelector(".alerta-uno").classList.add("ocultar");
    } else {
        document.querySelector(".alerta-uno").classList.remove("ocultar");
        document.getElementById("imgIcono").src = "/imagen/Icono/" + Icono;
        document.getElementById("pMensaje").innerText = Mensaje;
    }
}

// =============================================================
// FUNCTION PARA LIMPIAR
// =============================================================
function Limpiar() {
    // Limpiar campos de texto e inputs
    document.getElementById("txtProveedorCodigo").value = "";
    document.getElementById("txtProveedorRazonSocial").value = "";
    document.getElementById("txtProveedorCorreo").value = "";
    document.getElementById("txtProveedorNumeroTelefono").value = "";

    // Limpiar filas seleccionadas en ambas tablas
    document.querySelectorAll("#tblProveedor tbody tr.SeleccionarFila").forEach(FilaActual => FilaActual.classList.remove("SeleccionarFila"));
    document.querySelectorAll("#tblProveedorEliminado tbody tr.SeleccionarFila").forEach(FilaActual => FilaActual.classList.remove("SeleccionarFila"));

    document.getElementById("imgIconoModal").src="/imagen/Icono/IconoUsuarioRegistrar.png";
    document.getElementById("txtTituloModal").innerText="Registrar Nuevo Proveedor";
    document.getElementById("txtParrafoModal").innerText="Complete los datos del nuevo proveedor para agregarlo al sistema";
    document.getElementById("btnProveedorRegistrar").innerText="Registrar proveedor";

    document.getElementById("btnProveedorRegistrar").onclick = ProveedorRegistrar;

    // Volver a listar proveedores y proveedores eliminados
    ProveedorListar();
    ProveedorListarEliminado();
}

// =============================================================
// FUNCTION PARA VALIDAR CAMPOS DEL PROVEEDOR
// =============================================================
function ValidarCampo(Datos) {
    // Validar campos vacíos
    if (Datos.codigo === "") {
        return "Ingresa un código";
    } else if (Datos.razon_social === "") {
        return "Ingresa una razón social";
    } else if (Datos.correo === "") {
        return "Ingresa un correo";
    } else if (Datos.numero_telefono === "") {
        return "Ingresa un número de teléfono";
    }

    return 1; // Todo está correcto
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

        // Convertir la respuesta a JSON
        let Mensaje = await Respuesta.json();
        return Mensaje;
    } catch (e) {
        throw e;
    }
}

// =============================================================
// FUNCTION PARA REGISTRAR PROVEEDOR
// =============================================================
async function ProveedorRegistrar() {
    try {
        // Obtener datos desde los campos del formulario
        let Datos = {
            accion: "proveedor_registrar",
            codigo: document.getElementById("txtProveedorCodigo").value,
            razon_social: document.getElementById("txtProveedorRazonSocial").value,
            correo: document.getElementById("txtProveedorCorreo").value,
            numero_telefono: document.getElementById("txtProveedorNumeroTelefono").value
        }

        // Validar los campos del formulario
        let Valor = ValidarCampo(Datos);
        if (Valor === 1) {
            // Enviar datos al controlador
            let Mensaje = await EnviarFetch("/control_proveedor", "POST", Datos);
            if (Mensaje.mensaje) {
                Alerta(false, "IconoExito.png", Mensaje.mensaje);
                Limpiar();
                ProveedorMostrarModal(true);
            }else if (Mensaje.error) {
                Alerta(false, "IconoError.png", "Revisar consola");
                Limpiar();
                ProveedorMostrarModal(true);
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
// =============================================================
// FUNCTION PARA ACTUALIZAR PROVEEDORES
// =============================================================
async function ProveedorActualizar() {
    try {
        //Obtener datos
        let Datos = {
            accion: "proveedor_actualizar",
            codigo: document.getElementById("txtProveedorCodigo").value,
            razon_social: document.getElementById("txtProveedorRazonSocial").value,
            correo: document.getElementById("txtProveedorCorreo").value,
            numero_telefono: document.getElementById("txtProveedorNumeroTelefono").value
        }

        let Valor = ValidarCampo(Datos);
        if (Valor == 1) {
            //Enviamos peticion
            let Mensaje = await EnviarFetch("/control_proveedor", "POST", Datos);
            if (Mensaje.mensaje) {
                Alerta(false, "IconoExito.png", Mensaje.mensaje);
                Limpiar();
                ProveedorMostrarModal(true);
            } else if (Mensaje.mensaje1) {
                Alerta(false, "IconoAdvertencia.png", Mensaje.mensaje1);
                Limpiar();
                ProveedorMostrarModal(true);
            } else if (Mensaje.error) {
                Alerta(false, "IconoError.png", "Revisar consola");
                console.log(Mensaje.error);
                Limpiar();
                ProveedorMostrarModal(true);
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
// FUNCTION PARA ELIMINAR PROVEEDOR
// =============================================================
async function ProveedorEliminar(codigo) {
    try {
        // Preparar datos a enviar al controlador
        let Datos = {
            accion: "proveedor_eliminar",
            codigo: codigo
        }

        // Enviar petición al controlador usando fetch
        let Mensaje = await EnviarFetch("/control_proveedor", "POST", Datos);

        // Manejar respuesta exitosa
        if (Mensaje.mensaje) {
            Alerta(false, "IconoExito.png", Mensaje.mensaje);
            Limpiar();
        }else if (Mensaje.error) {
            Alerta(false, "IconoError.png","Revisar consola");
            console.log(Mensaje.error);
        }
    } catch (e) {
        Alerta(false, "IconoError.png", "Revisar consola");
        console.log(e.stack);
    }
}

// =============================================================
// FUNCTION PARA RECUPERAR PROVEEDOR
// =============================================================
async function ProveedorRecuperar(codigo) {
    try {
        // Preparar datos a enviar al controlador
        let Datos = {
            accion: "proveedor_recuperar",
            codigo: codigo
        }

        // Enviar petición al controlador usando fetch
        let Mensaje = await EnviarFetch("/control_proveedor", "POST", Datos);

        // Manejar respuesta exitosa
        if (Mensaje.mensaje) {
            Alerta(false, "IconoExito.png", Mensaje.mensaje);
            Limpiar();
        }else if (Mensaje.error) {
            Alerta(false, "IconoError.png", "Revisar consola");
            console.log(Mensaje.error);
        }
    } catch (e) {
        Alerta(false, "IconoError.png", "Revisar consola");
        console.log(e.stack);
    }
}

// =============================================================
// FUNCTION PARA BUSCAR PROVEEDOR
// =============================================================
function ProveedorBuscar() {
    // Agregar evento al input de búsqueda
    document.getElementById("txtProveedorBuscar").addEventListener("input", function () {
        let Filtro = this.value.trim().toLowerCase(); // Obtener el valor de ingreso
        let Filas = document.querySelectorAll("#tblProveedor tbody tr"); // Obtener las filas

        // Recorremos cada fila
        Filas.forEach(Fila => {
            let TextoFila = Fila.textContent.toLowerCase(); // Obtener texto de la fila           
            // Si el texto de la fila incluye algo del filtro
            if (TextoFila.includes(Filtro)) {
                Fila.style.display = ""; // Mostrar
            } else {
                Fila.style.display = "none"; // Ocultar
            }
        });
    });
}

// =============================================================
// FUNCTION PARA BUSCAR PROVEEDOR ELIMINADO
// =============================================================
function ProveedorBuscarEliminado() {
    // Agregar evento al input de búsqueda
    document.getElementById("txtProveedorBuscarEliminado").addEventListener("input", function () {
        let Filtro = this.value.trim().toLowerCase(); // Obtener el valor que se ingresa por el input
        let Filas = document.querySelectorAll("#tblProveedorEliminado tbody tr"); // Obtener todas las filas de la tabla

        Filas.forEach(FilaActual => {
            let TextoFila = FilaActual.innerText.trim().toLowerCase(); // Obtengo el contenido de la fila
            // Validar si la fila contiene algo del filtro
            if (TextoFila.includes(Filtro)) {
                FilaActual.style.display = "";
            } else {
                FilaActual.style.display = "none";
            }
        });

    });
}

// =============================================================
// FUNCTION PARA LISTAR PROVEEDOR
// =============================================================
async function ProveedorListar() {
    try {
        // Crear objeto con la acción a enviar al controlador
        let Datos = {
            accion: "proveedor_listar"
        }

        // Enviar la petición mediante la función EnviarFetch
        let Mensaje = await EnviarFetch("/control_proveedor", "POST", Datos);
        if (Mensaje.mensaje) {
            let Proveedores = Mensaje.mensaje; // Obtener el arreglo de proveedores
            let tbody = document.querySelector("#tblProveedor tbody");
            tbody.innerHTML = "";

            // Recorrer el arreglo de proveedores (del último al primero)
            for (let i = Proveedores.length - 1; i >= 0; i--) {
                let Fila = tbody.insertRow(); // Insertar una nueva fila

                // Insertar las celdas con los datos del proveedor
                Fila.insertCell().innerText = Proveedores[i].codigo;
                Fila.insertCell().innerText = Proveedores[i].razon_social;
                Fila.insertCell().innerText = Proveedores[i].correo;
                Fila.insertCell().innerText = Proveedores[i].numero_telefono;

                let btnEliminar = Fila.insertCell();
                btnEliminar.innerHTML = "<img src='/imagen/Icono/IconoEliminar.png' title='Eliminar'>";
                
                btnEliminar.onclick = function (e) {
                    ProveedorEliminar(Proveedores[i].codigo);
                }

                let btnEditar = Fila.insertCell();
                btnEditar.innerHTML = "<img src='/imagen/Icono/IconoEditar.png'>";
                
                btnEditar.onclick = function (e) {
                    ProveedorMostrarModalEditar(Proveedores[i].codigo, Proveedores[i].razon_social, Proveedores[i].correo, Proveedores[i].numero_telefono);
                }
            }
        } else if (Mensaje.mensaje1) {
            console.log(Mensaje.mensaje1);
            let tbody = document.querySelector("#tblProveedor tbody");
            tbody.innerHTML = ""; // Limpiar el cuerpo de la tabla
        } else if (Mensaje.error) {
            Alerta(false, "IconoError.png", "Revisar consola");
            console.log(Mensaje.error);
        }
    } catch (e) {
        Alerta(false,"IconoError.png", "Revisar consola");
        console.log(e.stack);
    }
}

// =============================================================
// FUNCTION PARA LISTAR PROVEEDOR ELIMINADO
// =============================================================
async function ProveedorListarEliminado() {
    try {
        // Obtener datos para la petición
        let Datos = {
            accion: "proveedor_listar_eliminado"
        }

        // Enviar datos al controlador y recibir respuesta
        let Mensaje = await EnviarFetch("/control_proveedor", "POST", Datos);

        if (Mensaje.mensaje) {
            let Proveedores = Mensaje.mensaje; // Array con datos de proveedores
            let tbody = document.querySelector("#tblProveedorEliminado tbody"); // Obtener cuerpo de la tabla
            tbody.innerHTML = ""; // Limpiar tabla

            // Recorrer proveedores en orden inverso
            for (let i = Proveedores.length - 1; i >= 0; i--) {
                let Fila = tbody.insertRow(); // Insertar fila
                Fila.onclick = function () { // Función para seleccionar fila
                    SeleccionarFila(this);
                };

                // Insertar celdas con datos del proveedor
                Fila.insertCell().innerText = Proveedores[i].codigo;
                Fila.insertCell().innerText = Proveedores[i].razon_social;
                Fila.insertCell().innerText = Proveedores[i].correo;
                Fila.insertCell().innerText = Proveedores[i].numero_telefono;

                // Agregar botones de acción
                let btnRecuperar = Fila.insertCell();
                btnRecuperar.innerHTML = "<img src='/imagen/Icono/IconoRecuperar.png' title='Recuperar'>";

                btnRecuperar.onclick = function (e) {
                    e.stopPropagation(); // Evitar que seleccione la fila al hacer click en el botón
                    ProveedorRecuperar(Proveedores[i].codigo);
                }
            }
        } else if (Mensaje.mensaje1) {
            console.log(Mensaje.mensaje1);
            let tbody = document.querySelector("#tblProveedorEliminado tbody");
            tbody.innerHTML = ""; // Limpiar tabla si no hay datos
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
// FUNCTION PARA OBTENER ULTIMO CODIGO DE PROVEEDOR
// =============================================================
async function ProveedorUltimoCodigo() {
    try {
        //Obtener los datos
        let Datos = {
            accion: "proveedor_ultimo_codigo"
        }
        //Enviamos peticion y almacenamos la respuesta en Mensaje
        let Mensaje = await EnviarFetch("/control_proveedor", "POST", Datos);
        if (Mensaje.mensaje) {//Si hay datos
            let Codigo = Mensaje.mensaje;
            //Obtener el prefijo 
            let Prefijo = Codigo.toString().slice(0, 3);
            //Obtener el número
            let Numero = parseInt(Codigo.toString().slice(3)) + 1;
            //Obtenemos el nuevo número
            let Num = Numero.toString().padStart(4, "0");
            //Nuevo código
            let CodigoNuevo = Prefijo + Num;
            document.getElementById("txtProveedorCodigo").value = CodigoNuevo;
        } else if (Mensaje.mensaje1) {//No hay datos
            document.getElementById("txtProveedorCodigo").value = "PRV0001";
        }
    } catch (e) {
        Alerta(false, "IconoError.png", "Revisar consola");
        console.log(e.stack);
    }
}

// =============================================================
// FUNCTION PARA MOSTRAR Y OCULTAR MODAL PROVEEDOR
// =============================================================
function ProveedorMostrarModal(Estado) {
    // Si Estado es true, ocultar modal
    if (Estado) {
        document.querySelector(".modal-uno").classList.add("ocultar");
    } else {
        document.querySelector(".modal-uno").classList.remove("ocultar");
    }
}

// =============================================================
// FUNCTION PARA MOSTRAR EL MODAL DE EDITAR PROVEEDOR
// =============================================================
function ProveedorMostrarModalEditar(codigo, razon_social, correo, numero_telefono) {
    ProveedorMostrarModal(false);
    Limpiar();
    //Mostrar los datos en los campos 
    document.getElementById("txtProveedorCodigo").value=codigo;
    document.getElementById("txtProveedorRazonSocial").value=razon_social;
    document.getElementById("txtProveedorCorreo").value=correo;
    document.getElementById("txtProveedorNumeroTelefono").value=numero_telefono;
    //Cambiar datos del modal
    document.getElementById("imgIconoModal").src ="/imagen/Icono/IconoEditarAguamarina.png";
    document.getElementById("txtTituloModal").innerText="Editar Proveedor"
    document.getElementById("txtParrafoModal").innerText="Modifique los datos del proveedor " + codigo;
    document.getElementById("btnProveedorRegistrar").innerText="Guardar Cambios";

    document.getElementById("btnProveedorRegistrar").onclick=ProveedorActualizar;
}