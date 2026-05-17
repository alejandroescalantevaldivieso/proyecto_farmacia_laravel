document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("btnCerrar").onclick = function () {
        Alerta(true);
    };
    document.getElementById("btnEmpleadoRegistrar").onclick = EmpleadoRegistrar;

    OcultaTabla(false, true);
    Alerta(true);
    EmpleadoListar();
    EmpleadoListarEliminado();
    EmpleadoBuscar();
    EmpleadoBuscarEliminado();
    EmpleadoModal(true);

    document.getElementById("btnEmpleadoActivo").addEventListener("click", function () {
        OcultaTabla(false, true);
    });
    document.getElementById("btnEmpleadoEliminado").addEventListener("click", function () {
        OcultaTabla(true, false);
    });
    document.getElementById("btnEmpleadoMostrarModal").addEventListener("click", function () {
        EmpleadoModal(false);
        EmpleadoUltimoCodigo();
        Limpiar();
    })
    document.getElementById("btnEmpleadoCerrarModal").addEventListener("click", function () {
        EmpleadoModal(true);
        Limpiar(); 
        // Cambiar datos del modal
        document.getElementById("imgIconoModal").src = "/imagen/Icono/IconoUsuarioRegistrar.png";
        document.getElementById("txtTituloModal").innerText = "Registrar Nuevo Empleado"
        document.getElementById("txtParrafoModal").innerText = "Complete los datos del nuevo empleado para agregarlo al sistema";
        document.getElementById("btnEmpleadoRegistrar").innerText = "Registrar Empleado";        
    })
});


const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');//Obtener token CSRF

//VARIABLE PARA PERMITIR SELECCIONAR FILA
let PermitirSeleccionarFila = true;

// =============================================================
// FUNCTION PARA OCULTAR TABLAS
// =============================================================
function OcultaTabla(tblEmpleado, tblEmpleadoEliminado) {
    // Ocultar o mostrar tabla de empleados
    if (tblEmpleado) {
        document.querySelector(".panel-tabla-empleado").classList.add("Ocultar");
    } else {
        document.querySelector(".panel-tabla-empleado").classList.remove("Ocultar");
    }

    // Ocultar o mostrar tabla de empleados eliminados
    if (tblEmpleadoEliminado) {
        document.querySelector(".panel-tabla-empleado-eliminado").classList.add("Ocultar");
    } else {
        document.querySelector(".panel-tabla-empleado-eliminado").classList.remove("Ocultar");
    }
}
// =============================================================
// FUNCTION PARA ALERTA
// =============================================================
function Alerta(Ocultar, Icono = "", Mensaje = "") {
    if (Ocultar) {
        document.querySelector(".alerta-uno").classList.add("Ocultar");
    } else {
        document.querySelector(".alerta-uno").classList.remove("Ocultar");
        document.getElementById("imgIcono").src = "/imagen/Icono/" + Icono;
        document.getElementById("pMensaje").innerText = Mensaje;
    }
}
// =============================================================
// FUNCTION PARA LIMPIAR
// =============================================================
function Limpiar() {
    // Limpiar campos de texto e inputs
    document.getElementById("txtCodigo").value = "";
    document.getElementById("txtNombre").value = "";
    document.getElementById("txtApellidoPaterno").value = "";
    document.getElementById("txtApellidoMaterno").value = "";
    document.getElementById("txtFechaNacimiento").value = "";
    document.getElementById("txtNumeroTelefono").value = "";
    document.getElementById("txtCorreo").value = "";
    document.getElementById("cbxTipoDocumento").value = "";
    document.getElementById("txtNumeroDocumento").value = "";

    // Limpiar filas seleccionadas en ambas tablas
    document.querySelectorAll("#tblEmpleado tbody tr.SeleccionarFila").forEach(FilaActual => FilaActual.classList.remove("SeleccionarFila"));
    document.querySelectorAll("#tblEmpleadoEliminado tbody tr.SeleccionarFila").forEach(FilaActual => FilaActual.classList.remove("SeleccionarFila"));

    // Volver a listar empleados y empleados eliminados
    EmpleadoListar();
    EmpleadoListarEliminado();
}
function ValidarCampo(D) {

    // -----------------------------
    // VALIDAR CAMPOS VACÍOS
    // -----------------------------
    const camposObligatorios = {
        codigo: "Ingresa un código",
        nombre: "Ingresa un nombre",
        apellido_paterno: "Ingresa un apellido paterno",
        apellido_materno: "Ingresa un apellido materno",
        fecha_nacimiento: "Ingresa la fecha de nacimiento",
        numero_telefono: "Ingresa un número de teléfono",
        correo: "Ingresa un correo",
        tipo_documento: "Ingresa un tipo de documento",
        numero_documento: "Ingresa un número de documento"
    };

    for (let campo in camposObligatorios) {
        if (!D[campo] || D[campo].trim() === "") {
            return camposObligatorios[campo];
        }
    }

    // -----------------------------
    // VALIDAR SOLO LETRAS EN NOMBRE Y APELLIDOS
    // -----------------------------
    const soloLetras = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]+$/;

    if (!soloLetras.test(D.nombre)) return "El nombre solo debe contener letras";
    if (!soloLetras.test(D.apellido_paterno)) return "El apellido paterno solo debe contener letras";
    if (!soloLetras.test(D.apellido_materno)) return "El apellido materno solo debe contener letras";

    // -----------------------------
    // VALIDAR EDAD >= 18
    // -----------------------------
    const nacimiento = new Date(D.fecha_nacimiento);
    const hoy = new Date();

    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    let mes = hoy.getMonth() - nacimiento.getMonth();

    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
        edad--;
    }

    if (edad < 18) {
        return "El empleado debe tener al menos 18 años";
    }

    // -----------------------------
    // VALIDAR TELÉFONO (9 dígitos, empieza con 9)
    // -----------------------------
    if (!/^[9]\d{8}$/.test(D.numero_telefono)) {
        return "El número de teléfono debe tener 9 dígitos y empezar con 9";
    }

    // -----------------------------
    // VALIDAR CORREO FORMATO
    // -----------------------------
    const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!correoRegex.test(D.correo)) {
        return "Correo inválido";
    }

    // -----------------------------
    // VALIDAR DOCUMENTO (solo números, mínimo 8 dígitos)
    // -----------------------------
    if (!/^\d{8,}$/.test(D.numero_documento)) {
        return "El número de documento debe tener solo números y mínimo 8 dígitos";
    }

    return 1; // Todo correcto
}


// =============================================================
// FUNCTION PARA ENVIAR FETCH
// =============================================================
async function EnviarFetch(Url, Metodo, Datos) {
    try {
        // Realizar petición fetch con los datos recibidos
        let Respuesta = await fetch(Url, {
            method: Metodo,
            headers: { "Content-Type": "application/json",
                "X-CSRF-TOKEN": csrfToken 
             },
            body: JSON.stringify(Datos)
        });

        // Validar que la respuesta sea correcta
        if (!Respuesta.ok) {
            throw new Error(`Error: ${Respuesta.status}: ${Respuesta.statusText}`);
        }

        // Convertir la respuesta a JSON
        let Mensaje = await Respuesta.json();

        // Retornar el mensaje recibido
        return Mensaje;
    } catch (e) {
        // Re-lanzar cualquier error para manejarlo externamente
        throw e;
    }
}
// =============================================================
// FUNCTION PARA REGISTRAR EMPLEADO
// =============================================================
async function EmpleadoRegistrar() {
    try {
        // Obtener datos desde los campos del formulario
        let Datos = {
            accion: "empleado_registrar",
            codigo: document.getElementById("txtCodigo").value,
            nombre: document.getElementById("txtNombre").value,
            apellido_paterno: document.getElementById("txtApellidoPaterno").value,
            apellido_materno: document.getElementById("txtApellidoMaterno").value,
            fecha_nacimiento: document.getElementById("txtFechaNacimiento").value,
            numero_telefono: document.getElementById("txtNumeroTelefono").value,
            correo: document.getElementById("txtCorreo").value,
            tipo_documento: document.getElementById("cbxTipoDocumento").value,
            numero_documento: document.getElementById("txtNumeroDocumento").value
        }

        // Validar los campos del formulario
        let Valor = ValidarCampo(Datos);
        if (Valor === 1) {
            // Enviar datos al controlador
            let Mensaje = await EnviarFetch("/control_empleado", "POST", Datos);

            // Manejar respuesta exitosa
            if (Mensaje.mensaje) {
                Alerta(false, "IconoExito.png", Mensaje.mensaje);
                Limpiar();
                EmpleadoModal(true);
                return;
            }
            // Manejar advertencia del controlador
            else if (Mensaje.mensaje1) {
                Alerta(false, "IconoAdvertencia.png", Mensaje.mensaje1);
                return;
            }
            // Manejar error del controlador
            else if (Mensaje.error) {
                Alerta(false, "IconoError.png", "Revisar consola");
                console.log(Mensaje.error);
                return;
            }
        }
        // Manejar errores de validación
        else {
            Alerta(false, "IconoAdvertencia.png", Valor);
            return;
        }
    } catch (e) {
        // =============================================================
        // BLOQUE CATCH → CAPTURA CUALQUIER ERROR EN EL PROCESO
        // =============================================================
        Alerta(false, "IconoError.png", "ERROR:Revisar consola");
        console.log(e.stack);
    }
}
//FUNCTION PARA ACTUALIZAR EMPLEADOS
async function EmpleadoActualizar() {
    try {
        //Obtener datos
        let Datos = {
            accion: "empleado_actualizar",
            codigo: document.getElementById("txtCodigo").value,
            nombre: document.getElementById("txtNombre").value,
            apellido_paterno: document.getElementById("txtApellidoPaterno").value,
            apellido_materno: document.getElementById("txtApellidoMaterno").value,
            fecha_nacimiento: document.getElementById("txtFechaNacimiento").value,
            numero_telefono: document.getElementById("txtNumeroTelefono").value,
            correo: document.getElementById("txtCorreo").value,
            tipo_documento: document.getElementById("cbxTipoDocumento").value,
            numero_documento: document.getElementById("txtNumeroDocumento").value
        }

        let Valor = ValidarCampo(Datos);//Validar datos
        if (Valor == 1) {//Campos completos
            //Enviar peticion
            let Mensaje = await EnviarFetch("/control_empleado", "POST", Datos);
            if (Mensaje.mensaje) {
                Alerta(false, "IconoExito.png", Mensaje.mensaje);
                Limpiar();
                //Cambiar datos del modal
                document.getElementById("imgIconoModal").src = "/imagen/Icono/IconoUsuarioRegistrar.png";
                document.getElementById("txtTituloModal").innerText = "Registrar Nuevo Empleado"
                document.getElementById("txtParrafoModal").innerText = "Complete los datos del nuevo empleado para agregarlo al sistema";
                document.getElementById("btnEmpleadoRegistrar").innerText = "Registrar Empleado";

                //Ocultamos modal
                EmpleadoModal(true);
                return;
            }else if (Mensaje.error) {
                Alerta(false, "IconoError.png", "Revisar consola");
                console.log(Mensaje.error);
                Limpiar();
                //Cambiar datos del modal
                document.getElementById("imgIconoModal").src = "/imagen/Icono/IconoUsuarioRegistrar.png";
                document.getElementById("txtTituloModal").innerText = "Registrar Nuevo Empleado"
                document.getElementById("txtParrafoModal").innerText = "Complete los datos del nuevo empleado para agregarlo al sistema";
                document.getElementById("btnEmpleadoRegistrar").innerText = "Registrar Empleado";

                //Ocultamos modal
                EmpleadoModal(true);
                return;
            }
        } else {
            Alerta(false, "IconoAdvertencia.png", Valor);
            return;
        }

    } catch (e) {
        Alerta(false, "IconoError.png", "ERROR:Revisar consola");
        console.log(e.stack);
    }
}
// =============================================================
// FUNCTION PARA ELIMINAR EMPLEADO
// =============================================================
async function EmpleadoEliminar(EmpleadoCodigo) {
    try {
        // Preparar datos a enviar al controlador
        let Datos = {
            accion: "empleado_eliminar",
            codigo: EmpleadoCodigo
        }

        // Enviar petición al controlador usando fetch
        let Mensaje = await EnviarFetch("/control_empleado", "POST", Datos);

        // Manejar respuesta exitosa
        if (Mensaje.mensaje) {
            Alerta(false, "IconoExito.png", Mensaje.mensaje);
            Limpiar();
            return;
        }else if (Mensaje.error) {
            Alerta(false, "IconoError.png", "Revisar consola");
            console.log(Mensaje.error);
            return;
        }
    } catch (e) {
        // =============================================================
        // BLOQUE CATCH → CAPTURA CUALQUIER ERROR EN EL PROCESO
        // =============================================================
        Alerta(false, "IconoError.png", "ERROR:Revisar consola");
        console.log(e.stack);
    }
}
// =============================================================
// FUNCTION PARA BUSCAR EMPLEADO
// =============================================================
function EmpleadoBuscar() {
    // Agregar evento al input de búsqueda
    document.getElementById("txtEmpleadoBuscar").addEventListener("input", function () {
        let Filtro = this.value.trim().toLowerCase(); // Obtener el valor de ingreso
        let Filas = document.querySelectorAll("#tblEmpleado tbody tr"); // Obtener las filas

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
// FUNCTION PARA BUSCAR EMPLEADO ELIMINADO
// =============================================================
function EmpleadoBuscarEliminado() {
    // Agregar evento al input de búsqueda
    document.getElementById("txtEmpleadoBuscarEliminado").addEventListener("input", function () {
        let Filtro = this.value.trim().toLowerCase(); // Obtener el valor que se ingresa por el input
        let Filas = document.querySelectorAll("#tblEmpleadoEliminado tbody tr"); // Obtener todas las filas de la tabla

        /*
        "Este código revisa cada fila de tu tabla y muestra u oculta 
        la fila dependiendo de si contiene el texto que el 
        usuario escribió en el buscador."
        */
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
// FUNCTION PARA RECUPERAR EMPLEADO
// =============================================================
async function EmpleadoRecuperar(EmpleadoCodigo) {
    try {
        // Preparar datos a enviar al controlador
        let Datos = {
            accion: "empleado_recuperar",
            codigo: EmpleadoCodigo
        }

        // Enviar petición al controlador usando fetch
        let Mensaje = await EnviarFetch("/control_empleado", "POST", Datos);
        // Manejar respuesta exitosa
        if (Mensaje.mensaje) {
            Alerta(false, "IconoExito.png", Mensaje.mensaje);
            Limpiar();
        }else if (Mensaje.error) {
            Alerta(false, "IconoError.png", "Revisar consola");
            console.log(Mensaje.error);
            return;
        }

    } catch (e) {
        // =============================================================
        // BLOQUE CATCH → CAPTURA CUALQUIER ERROR EN EL PROCESO
        // =============================================================
        Alerta(false, "IconoError.png", "ERROR:Revisar consola");
        console.log(e.stack);
    }
}
// =============================================================
// FUNCTION PARA LISTAR EMPLEADO
// =============================================================
async function EmpleadoListar() {
    try {
        // Crear objeto con la acción a enviar al controlador
        let Datos = {
            accion: "empleado_listar"
        }

        // Enviar la petición mediante la función EnviarFetch
        let Mensaje = await EnviarFetch("/control_empleado", "POST", Datos);

        // Si la respuesta contiene la clave "mensaje", hay empleados registrados
        if (Mensaje.mensaje) {
            let Empleados = Mensaje.mensaje; // Obtener el arreglo de empleados

            // Obtener el cuerpo de la tabla empleado
            let tbody = document.querySelector("#tblEmpleado tbody");

            // Limpiar el cuerpo antes de insertar nuevas filas
            tbody.innerHTML = "";

            // Recorrer el arreglo de empleados (del último al primero)
            for (let i = Empleados.length - 1; i >= 0; i--) {
                let Fila = tbody.insertRow(); // Insertar una nueva fila
                // Insertar las celdas con los datos del empleado
                Fila.insertCell().innerText = Empleados[i].codigo;
                Fila.insertCell().innerText = Empleados[i].nombre + " " +
                    Empleados[i].apellido_paterno + " " +
                    Empleados[i].apellido_materno;
                Fila.insertCell().innerText = Empleados[i].fecha_nacimiento;
                Fila.insertCell().innerText = Empleados[i].numero_telefono;
                Fila.insertCell().innerText = Empleados[i].correo;
                Fila.insertCell().innerText = Empleados[i].tipo_documento;
                Fila.insertCell().innerText = Empleados[i].numero_documento;

                // Insertar celda con botón Eliminar (icono)
                let btnEliminar = Fila.insertCell();
                btnEliminar.innerHTML = "<img src='/imagen/Icono/IconoEliminar.png'>";
                btnEliminar.onclick = function (e) {
                    e.stopPropagation();
                    EmpleadoEliminar(Empleados[i].codigo);
                }

                // Insertar celda con botón Editar (icono)
                let btnEditar = Fila.insertCell();
                btnEditar.innerHTML = "<img src='/imagen/Icono/IconoEditar.png'>";
                btnEditar.onclick = function (e) {
                    e.stopPropagation();
                    EmpleadoModalEditar(Empleados[i].codigo, Empleados[i].nombre, Empleados[i].apellido_paterno, Empleados[i].apellido_materno, Empleados[i].fecha_nacimiento, Empleados[i].numero_telefono, Empleados[i].correo, Empleados[i].tipo_documento, Empleados[i].numero_documento);
                }
            }

            // Si la respuesta contiene la clave "mensaje1", no hay empleados registrados
        } else if (Mensaje.mensaje1) {
            console.log(Mensaje.mensaje1);
            let tbody = document.querySelector("#tblEmpleado tbody");
            tbody.innerHTML = ""; // Limpiar el cuerpo de la tabla

            // Si la respuesta contiene "error", ocurrió un problema en el servidor
        } else if (Mensaje.error) {
            Alerta(false, "IconoError.png", "Revisar consola");
            console.log(Mensaje.error);
            return;
        }

        // =============================================================
        // BLOQUE CATCH → CAPTURA CUALQUIER ERROR EN EL PROCESO
        // =============================================================
    } catch (e) {
        Alerta(false, "IconoError.png", "ERROR: Revisar consola..");
        console.log(e.stack);
    }
}
// =============================================================
// FUNCTION PARA LISTAR EMPLEADO ELIMINADO
// =============================================================
async function EmpleadoListarEliminado() {
    try {
        // Obtener datos para la petición
        let Datos = {
            accion: "empleado_listar_eliminado"
        }

        // Enviar datos al controlador y recibir respuesta
        let Mensaje = await EnviarFetch("/control_empleado", "POST", Datos);
        if (Mensaje.mensaje) {
            let Empleados = Mensaje.mensaje; // Array con datos de empleados
            let tbody = document.querySelector("#tblEmpleadoEliminado tbody"); // Obtener cuerpo de la tabla
            tbody.innerHTML = ""; // Limpiar tabla

            // Recorrer empleados en orden inverso
            for (let i = Empleados.length - 1; i >= 0; i--) {
                let Fila = tbody.insertRow(); // Insertar fila               

                // Insertar celdas con datos del empleado
                Fila.insertCell().innerText = Empleados[i].codigo;
                Fila.insertCell().innerText = Empleados[i].nombre + " " +
                    Empleados[i].apellido_paterno + " " +
                    Empleados[i].apellido_materno;
                Fila.insertCell().innerText = Empleados[i].fecha_nacimiento;
                Fila.insertCell().innerText = Empleados[i].numero_telefono;
                Fila.insertCell().innerText = Empleados[i].correo;
                Fila.insertCell().innerText = Empleados[i].tipo_documento;
                Fila.insertCell().innerText = Empleados[i].numero_documento;

                // Agregar botones de acción
                let btnRecuperar = Fila.insertCell();
                btnRecuperar.innerHTML = "<img src='/imagen/Icono/IconoRecuperar.png' title='Recuperar'>";

                btnRecuperar.onclick = function (e) {
                    e.stopPropagation(); // Evitar que seleccione la fila al hacer click en el botón
                    EmpleadoRecuperar(Empleados[i].codigo); // Llamar a la función para recuperar empleado
                }
            }
        } else if (Mensaje.mensaje1) {
            console.log(Mensaje.mensaje1);
            let tbody = document.querySelector("#tblEmpleadoEliminado tbody");
            tbody.innerHTML = ""; // Limpiar tabla si no hay datos
            return;
        } else if (Mensaje.error) {
            console.log(Mensaje.error);
        }
    } catch (e) {
        // =============================================================
        // BLOQUE CATCH → CAPTURA CUALQUIER ERROR EN EL PROCESO
        // =============================================================
        Alerta(false, "IconoError.png", "ERROR:Revisar consola");
        console.log(e.stack);
    }
}
//FUNCTION PARA OBTENER ULTIMO CODIGO DE EMPLEADO
async function EmpleadoUltimoCodigo() {
    try {
        //Obtener los datos
        let Datos = {
            accion: "empleado_ultimo_codigo"
        }
        //Enviamos peticion y almacenamos la respuesta en Mensaje
        let Mensaje = await EnviarFetch("/control_empleado", "POST", Datos);
        if (Mensaje.mensaje) {//Si hay datos
            let Codigo = Mensaje.mensaje;//Obtener el codigo 
            let Prefijo = Codigo.slice(0, 3);//Obtener el prefijo
            let Numero = parseInt(Codigo.slice(3)) + 1;//Obtenemos el numero del codigo
            let Num = Numero.toString().padStart(4, "0");//Agregar 0 al numero
            let CodigoNuevo = Prefijo + Num;//Codigo Nuevo
            document.getElementById("txtCodigo").value = CodigoNuevo;
        } else if (Mensaje.mensaje1) {//No hay datos
            document.getElementById("txtCodigo").value = "EMP0001";
            console.log(Mensaje.mensaje1);
        } else if (Mensaje.error) {//hay un error
            Alerta(false, "IconoError.png", "Revisar consola");
            console.log(Mensaje.error);
        }
    } catch (e) {
        Alerta(false, "IconoError.png", "ERROR:Revisar consola");
        console.log(e);
    }
}
// =============================================================
// FUNCTION PARA MOSTRAR Y OCULTAR MODAL EMPLEADO
// =============================================================
function EmpleadoModal(Estado) {
    // Si Estado es true, ocultar modal
    if (Estado) {
        document.querySelector(".modal-uno").classList.add("Ocultar");
    }
    // Si Estado es false, mostrar modal
    else {
        document.querySelector(".modal-uno").classList.remove("Ocultar");
    }
}
//FUNCTION PARA MOSTRAR EL MODAL DE EDITAR EMPLEADO
function EmpleadoModalEditar(EmpleadoCodigo, EmpleadoNombre, EmpleadoApellidoPaterno, EmpleadoApellidoMaterno, EmpleadoFechaNacimiento, EmpleadoNumeroTelefono, EmpleadoCorreo, EmpleadoTipoDocumento, EmpleadoNumeroDocumento) {
    //Mostrar los datos en los campos 
    document.getElementById("txtCodigo").value = EmpleadoCodigo;
    document.getElementById("txtNombre").value = EmpleadoNombre;
    document.getElementById("txtApellidoPaterno").value = EmpleadoApellidoPaterno;
    document.getElementById("txtApellidoMaterno").value = EmpleadoApellidoMaterno;
    document.getElementById("txtFechaNacimiento").value = EmpleadoFechaNacimiento;
    document.getElementById("txtNumeroTelefono").value = EmpleadoNumeroTelefono;
    document.getElementById("txtCorreo").value = EmpleadoCorreo;
    document.getElementById("cbxTipoDocumento").value = EmpleadoTipoDocumento;
    document.getElementById("txtNumeroDocumento").value = EmpleadoNumeroDocumento;
    //Cambiar datos del modal
    document.getElementById("imgIconoModal").src = "/imagen/Icono/IconoEditarAguamarina.png";
    document.getElementById("txtTituloModal").innerText = "Editar Empleado"
    document.getElementById("txtParrafoModal").innerText = "Modifique los datos del empleado " + EmpleadoCodigo;
    document.getElementById("btnEmpleadoRegistrar").innerText = "Guardar Cambios";

    document.getElementById("btnEmpleadoRegistrar").onclick = EmpleadoActualizar;

    //Mostrar modal
    EmpleadoModal(false);
}