const csrfToken = document.querySelector("meta[name='csrf-token']").getAttribute("content");

document.addEventListener("DOMContentLoaded", function () {
    OcultaTabla(false, true);
    Alerta(true);
    ProductoListar();
    TipoProductoListar();
    ProductoListarEliminado();
    ProductoBuscar();
    ProductoBuscarEliminado();
    ProductoMostrarModal(true);

    document.getElementById("btnProductoRegistrar").onclick = ProductoRegistrar;

    document.getElementById("btnCerrar").onclick = function () {
        Alerta(true);
    };
    document.getElementById("btnProductoActivo").addEventListener("click", function () {
        OcultaTabla(false, true);
    });
    document.getElementById("btnProductoEliminado").addEventListener("click", function () {
        OcultaTabla(true, false);
    });
    document.getElementById("btnProductoMostrarModal").onclick = function () {
        Limpiar();
        ProductoMostrarModal(false);
        ProductoUltimoCodigo();
    };
    document.getElementById("btnProductoCerrarModal").onclick = function () {
        ProductoMostrarModal(true);
        Limpiar(); 
    };
});

// =============================================================
// FUNCTION PARA OCULTAR TABLAS
// =============================================================
function OcultaTabla(tblProducto, tblProductoEliminado) {
    // ocultar o mostrar tabla de productos
    if (tblProducto) {
        document.querySelector(".panel-tabla-producto").classList.add("ocultar");
    } else {
        document.querySelector(".panel-tabla-producto").classList.remove("ocultar");
    }

    // ocultar o mostrar tabla de productos eliminados
    if (tblProductoEliminado) {
        document.querySelector(".panel-tabla-producto-eliminado").classList.add("ocultar");
    } else {
        document.querySelector(".panel-tabla-producto-eliminado").classList.remove("ocultar");
    }
}

// =============================================================
// FUNCTION PARA MOSTRAR U OCULTAR ALERTA
// =============================================================
function Alerta(ocultar, Icono = "", Mensaje = "") {
    if (ocultar) {
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
    document.getElementById("txtProductoCodigo").value = "";
    document.getElementById("txtProductoNombre").value = "";
    document.getElementById("txaProductoDescripcion").value = "";
    document.getElementById("txtProductoPrecioUnitario").value = "";
    document.getElementById("cbxProductoTipoProducto").value = "";

    // Limpiar filas seleccionadas en ambas tablas
    document.querySelectorAll("#tblProducto tbody tr.SeleccionarFila").forEach(FilaActual => FilaActual.classList.remove("SeleccionarFila"));
    document.querySelectorAll("#tblProductoEliminado tbody tr.SeleccionarFila").forEach(FilaActual => FilaActual.classList.remove("SeleccionarFila"));

    document.getElementById("imgIconoModal").src="/imagen/Icono/IconoUsuarioRegistrar.png";
    document.getElementById("txtTituloModal").innerText="Registrar Nuevo Producto";
    document.getElementById("txtParrafoModal").innerText="Complete los datos del nuevo producto para agregarlo al sistema";
    document.getElementById("btnProductoRegistrar").innerText="Registrar producto";

    document.getElementById("btnProductoRegistrar").onclick = ProductoRegistrar;

    // Volver a listar productos y productos eliminados
    ProductoListar();
    ProductoListarEliminado();
}

// =============================================================
// FUNCTION PARA VALIDAR CAMPOS DE USUARIO
// =============================================================
function ValidarCampo(Datos) {
    // Validar campos vacíos
    if (Datos.codigo === "") {
        return "Ingresa el código de producto";
    } else if (Datos.nombre === "") {
        return "Ingresa el nombre del producto";
    } else if (Datos.descripcion === "") {
        return "Ingresa la descripción del producto";
    } else if (Datos.precio_unitario === "") {
        return "Ingresa el precio unitario del producto";
    } else if (Datos.tipo_producto_codigo === "") {
        return "Ingresa el tipo de producto";
    }

    return 1; // Todo está correcto
}
// =============================================================
// FUNCTION PARA ENVIAR FETCH
// =============================================================
async function EnviarFetch(Url, Metodo, Datos) {
    try {
        // Realizar petición fetch con los datos recibidos
        let Respuesta = await fetch(Url, {
            method: Metodo,
            headers: {
                "Content-Type": "application/json",
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
// FUNCTION PARA REGISTRAR PRODUCTO
// =============================================================
async function ProductoRegistrar() {
    try {
        // Obtener datos desde los campos del formulario
        let Datos = {
            accion: "producto_registrar",
            codigo: document.getElementById("txtProductoCodigo").value,
            nombre: document.getElementById("txtProductoNombre").value,
            descripcion: document.getElementById("txaProductoDescripcion").value,
            precio_unitario: document.getElementById("txtProductoPrecioUnitario").value,
            tipo_producto_codigo: document.getElementById("cbxProductoTipoProducto").value
        }

        // Validar los campos del formulario
        let Valor = ValidarCampo(Datos);
        if (Valor === 1) {
            // Enviar datos al controlador
            let Mensaje = await EnviarFetch("/control_producto", "POST", Datos);
            if (Mensaje.mensaje) {
                Alerta(false, "IconoExito.png", Mensaje.mensaje);
                Limpiar();
                ProductoMostrarModal(true);
            }else if (Mensaje.error) {
                Alerta(false, "IconoError.png", "Revisar consola");
                Limpiar();
                ProductoMostrarModal(true);
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
// FUNCTION PARA ACTUALIZAR PRODUCTOS
// =============================================================
async function ProductoActualizar() {
    try {
        //Obtener datos
        let Datos = {
            accion: "producto_actualizar",
            codigo: document.getElementById("txtProductoCodigo").value,
            nombre: document.getElementById("txtProductoNombre").value,
            descripcion: document.getElementById("txaProductoDescripcion").value,
            precio_unitario: document.getElementById("txtProductoPrecioUnitario").value,
            tipo_producto_codigo: document.getElementById("cbxProductoTipoProducto").value
        }

        let Valor = ValidarCampo(Datos);
        if (Valor == 1) {
            //Enviar peticion
            let Mensaje = await EnviarFetch("/control_producto", "POST", Datos);
            if (Mensaje.mensaje) {
                Alerta(false, "IconoExito.png", Mensaje.mensaje);
                Limpiar();
                ProductoMostrarModal(true);
            }else if (Mensaje.error) {
                Alerta(false, "IconoError.png", "Revisar consola");
                console.log(Mensaje.error);
                Limpiar();
                ProductoMostrarModal(true);   
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
// FUNCTION PARA ELIMINAR PRODUCTO
// =============================================================
async function ProductoEliminar(codigo) {
    try {
        // Preparar datos a enviar al controlador
        let Datos = {
            accion: "producto_eliminar",
            codigo: codigo
        }

        // Enviar petición al controlador usando fetch
        let Mensaje = await EnviarFetch("/control_producto", "POST", Datos);

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
// FUNCTION PARA RECUPERAR PRODUCTO
// =============================================================
async function ProductoRecuperar(codigo) {
    try {
        // Preparar datos a enviar al controlador
        let Datos = {
            accion: "producto_recuperar",
            codigo: codigo
        }

        // Enviar petición al controlador usando fetch
        let Mensaje = await EnviarFetch("/control_producto", "POST", Datos);

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
// FUNCTION PARA BUSCAR PRODUCTO
// =============================================================
function ProductoBuscar() {
    // Agregar evento al input de búsqueda
    document.getElementById("txtProductoBuscar").addEventListener("input", function () {
        let Filtro = this.value.trim().toLowerCase(); // Obtener el valor de ingreso
        let Filas = document.querySelectorAll("#tblProducto tbody tr"); // Obtener las filas

        // Recorremos cada fila
        Filas.forEach(Fila => {
            let TextoFila = Fila.textContent.toLowerCase(); 
            if (TextoFila.includes(Filtro)) {
                Fila.style.display = ""; // Mostrar
            } else {
                Fila.style.display = "none"; // ocultar
            }
        });
    });
}
// =============================================================
// FUNCTION PARA BUSCAR PRODUCTO ELIMINADO
// =============================================================
function ProductoBuscarEliminado() {
    // Agregar evento al input de búsqueda
    document.getElementById("txtProductoBuscarEliminado").addEventListener("input", function () {
        let Filtro = this.value.trim().toLowerCase(); // Obtener el valor que se ingresa por el input
        let Filas = document.querySelectorAll("#tblProductoEliminado tbody tr"); // Obtener todas las filas de la tabla

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
// FUNCTION PARA LISTAR PRODUCTO
// =============================================================
async function ProductoListar() {
    try {
        // Crear objeto con la acción a enviar al controlador
        let Datos = {
            accion: "producto_listar"
        }
        //Enviar peticion
        let Mensaje = await EnviarFetch("/control_producto", "POST", Datos);
        if (Mensaje.mensaje) {
            let Productos = Mensaje.mensaje; // Obtener el arreglo de productos
            let tbody = document.querySelector("#tblProducto tbody");
            tbody.innerHTML = "";

            // Recorrer el arreglo de productos (del último al primero)
            for (let i = Productos.length - 1; i >= 0; i--) {
                let Fila = tbody.insertRow(); // Insertar una nueva fila

                // Insertar las celdas con los datos del producto
                Fila.insertCell().innerText = Productos[i].codigo;
                Fila.insertCell().innerText = Productos[i].nombre;
                Fila.insertCell().innerText = Productos[i].descripcion;
                Fila.insertCell().innerText = Productos[i].precio_unitario;
                Fila.insertCell().innerText = Productos[i].tipo_producto_codigo;

                // Insertar celda con botón Eliminar (icono)
                let btnEliminar = Fila.insertCell();
                btnEliminar.innerHTML = "<img src='/imagen/Icono/IconoEliminar.png'>";
                btnEliminar.onclick = function (e) {
                    ProductoEliminar(Productos[i].codigo);
                }

                // Insertar celda con botón Editar (icono)
                let btnEditar = Fila.insertCell();
                btnEditar.innerHTML = "<img src='/imagen/Icono/IconoEditar.png'>";
                btnEditar.onclick = function (e) {
                    ProductoModalEditar(Productos[i].codigo, Productos[i].nombre, Productos[i].descripcion, Productos[i].precio_unitario, Productos[i].tipo_producto_codigo);
                }
            }
            // Si la respuesta contiene la clave "mensaje1", no hay productos registrados
        } else if (Mensaje.mensaje1) {
            console.log(Mensaje.mensaje1);
            let tbody = document.querySelector("#tblProducto tbody");
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
// FUNCTION PARA LISTAR PRODUCTO ELIMINADO
// =============================================================
async function ProductoListarEliminado() {
    try {
        // Obtener datos para la petición
        let Datos = {
            accion: "producto_listar_eliminado"
        }

        // Enviar datos al controlador y recibir respuesta
        let Mensaje = await EnviarFetch("/control_producto", "POST", Datos);

        if (Mensaje.mensaje) {
            let Productos = Mensaje.mensaje; // Array con datos de productos
            let tbody = document.querySelector("#tblProductoEliminado tbody"); // Obtener cuerpo de la tabla
            tbody.innerHTML = ""; // Limpiar tabla

            // Recorrer productos en orden inverso
            for (let i = Productos.length - 1; i >= 0; i--) {
                let Fila = tbody.insertRow(); // Insertar fila

                // Insertar celdas con datos del producto
                Fila.insertCell().innerText = Productos[i].codigo;
                Fila.insertCell().innerText = Productos[i].nombre;
                Fila.insertCell().innerText = Productos[i].descripcion;
                Fila.insertCell().innerText = Productos[i].precio_unitario;
                Fila.insertCell().innerText = Productos[i].tipo_producto_codigo;

                // Agregar botones de acción
                let btnRecuperar = Fila.insertCell();
                btnRecuperar.innerHTML = "<img src='/imagen/Icono/IconoRecuperar.png' title='Recuperar'>";

                btnRecuperar.onclick = function () {
                    ProductoRecuperar(Productos[i].codigo); 
                }
            }
        } else if (Mensaje.mensaje1) {
            console.log(Mensaje.mensaje1);
            let tbody = document.querySelector("#tblProductoEliminado tbody");
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

//FUNCTION PARA OBTENER ULTIMO CODIGO DE PRODUCTO
async function ProductoUltimoCodigo() {
    try {
        //Obtener los datos
        let Datos = {
            accion: "producto_ultimo_codigo"
        }
        //Enviamos peticion y almacenamos la respuesta en Mensaje
        let Mensaje = await EnviarFetch("/control_producto", "POST", Datos);
        if (Mensaje.mensaje) {//Si hay datos
            let Codigo = Mensaje.mensaje;
            //Prefijo
            let Prefijo = Codigo.toString().slice(0, 3);
            //Numero 
            let Numero = parseInt(Codigo.toString().slice(3)) + 1;
            //Nuevo numero
            let Num = Numero.toString().padStart(13, "0");
            //Nuevo codigo 
            let CodigoNuevo = Prefijo + Num;
            document.getElementById("txtProductoCodigo").value = CodigoNuevo;
        } else if (Mensaje.mensaje1) {//No hay datos
            document.getElementById("txtProductoCodigo").value = "PRO0000000000001";
        }
    } catch (e) {
        Alerta(false, "IconoError.png", "Revisar consola");
        console.log(e.stack);
    }
}

// =============================================================
// FUNCTION PARA LISTAR TIPOPRODUCTO
// =============================================================
async function TipoProductoListar() {
    try {
        //Obtener los datos 
        let Datos = {
            accion: "tipo_producto_listar"
        }
        //Enviar peticion
        let Mensaje = await EnviarFetch("/control_tipo_producto", "POST", Datos);
        if (Mensaje.mensaje) {
            let TipoProductos = Mensaje.mensaje;
            let cbxProductoTipoProducto = document.getElementById("cbxProductoTipoProducto");//Obtener el select

            cbxProductoTipoProducto.innerHTML = "";//Limpiamos select
            //Agregar una opcion incial
            let option = document.createElement("option");
            option.value="";
            option.innerText="Codigo de tipo de producto";
            cbxProductoTipoProducto.appendChild(option);
            for (let i = TipoProductos.length - 1; i >= 0; i--) {
                let option = document.createElement("option");//Creo un option
                option.value = TipoProductos[i].codigo;
                option.innerText = TipoProductos[i].nombre;
                cbxProductoTipoProducto.appendChild(option);
            }
        } else if (Mensaje.mensaje1) {
            console.log(Mensaje.mensaje1);
        } else if (Mensaje.error) {
            Alerta(false, "IconoError.png", "Revisar consola");
            console.log(Mensaje.error);
        }
    } catch (e) {
        Alerta(false, "IconoError.png", "Revisar consola");
        console.log(e);        
    }
}
// =============================================================
// FUNCTION PARA MOSTRAR Y OCULTAR MODAL PRODUCTO
// =============================================================
function ProductoMostrarModal(Estado) {
    // Si Estado es true, ocultar modal
    if (Estado) {
        document.querySelector(".modal-uno").classList.add("ocultar");
    }
    // Si Estado es false, mostrar modal
    else {
        document.querySelector(".modal-uno").classList.remove("ocultar");
    }
}
//FUNCTION PARA MOSTRAR EL MODAL DE EDITAR PRODUCTO
function ProductoModalEditar(codigo, nombre, descripcion, precio_unitario, tipo_producto_codigo) {
    ProductoMostrarModal(false);
    Limpiar();
    //Mostrar los datos en los campos
    document.getElementById("txtProductoCodigo").value = codigo;
    document.getElementById("txtProductoNombre").value = nombre;
    document.getElementById("txaProductoDescripcion").value = descripcion;
    document.getElementById("txtProductoPrecioUnitario").value = precio_unitario;
    document.getElementById("cbxProductoTipoProducto").value = tipo_producto_codigo;
    //Cambiar datos del modal
    document.getElementById("imgIconoModal").src = "/imagen/Icono/IconoEditarAguamarina.png";
    document.getElementById("txtTituloModal").innerText = "Editar Producto"
    document.getElementById("txtParrafoModal").innerText = "Modifique los datos del producto " + codigo;
    document.getElementById("btnProductoRegistrar").innerText = "Guardar Cambios";

    document.getElementById("btnProductoRegistrar").onclick = ProductoActualizar;
}