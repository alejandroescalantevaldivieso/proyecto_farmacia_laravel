const csrfToken = document.querySelector("meta[name='csrf-token']").getAttribute("content");

document.addEventListener("DOMContentLoaded", function () {
    ProductoListar();
    ProductoMostrarModal(true);
    Alerta(true);
    ProductoDetalleMostrarTabla(true);
    VentaUltimoCodigo();
    VentaObtenerUsuario();
    setInterval(FechaHoraActual, 1000);
    ProductoBuscar();

    document.getElementById("btnProductoCancelarModal").onclick = function () {
        ProductoMostrarModal(true);
    };

    let btnVenta = document.getElementById("btnVentaSeleccionar");
    if (btnVenta) {
        btnVenta.onclick = function () {
            ProductoMostrarModal(false);
        };
    }

    document.getElementById("txtBuscarProductoClick").onclick = function () {
        ProductoMostrarModal(false);
    }

    document.getElementById("btnAlertaCerrar").onclick = function () {
        Alerta(true);
    };

    document.getElementById("btnRegistrarVenta").onclick = VentaRegistrar;
    document.getElementById("btnRegistrarCerrar").onclick = limpiar;
});

// =============================================================
// ALERTA
// =============================================================
function Alerta(Estado, Icono = "IconoCarga.png", Mensaje = "Default") {
    if (Estado) {
        document.querySelector(".alerta-uno").classList.add("ocultar");
    } else {
        document.querySelector(".alerta-uno").classList.remove("ocultar");
        document.getElementById("imgAlertaIcono").src = "/imagen/Icono/" + Icono;
        document.getElementById("pAlertaMensaje").innerText = Mensaje;
    }
}

// =============================================================
// ENVIAR FETCH
// =============================================================
async function EnviarFech(Url, Metodo, Datos) {
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
            throw new Error(`Error: ${Respuesta.status} : ${Respuesta.statusText}`);
        }
        let Mensaje = await Respuesta.json();
        return Mensaje;

    } catch (e) {
        throw e;
    }
}

// =============================================================
// LISTAR PRODUCTOS (MODAL)
// =============================================================
async function ProductoListar() {
    try {
        let Datos = { accion: "producto_listar_con_stock" };
        let Mensaje = await EnviarFech("/control_producto", "POST", Datos);

        if (Mensaje.mensaje) {
            let Productos = Mensaje.mensaje;
            let body = document.querySelector("#tblProducto tbody");
            body.innerHTML = "";

            for (let i = Productos.length - 1; i >= 0; i--) {
                let Fila = body.insertRow();
                Fila.insertCell().innerText = Productos[i].codigo;
                Fila.insertCell().innerText = Productos[i].nombre;
                Fila.insertCell().innerText = Productos[i].precio_unitario;
                Fila.insertCell().innerText = Productos[i].stocks[0].lote ?? "SIN";

                let btnSeleccionar = Fila.insertCell();
                btnSeleccionar.innerHTML = "<img src='/imagen/Icono/IconoSeleccionar.png' class='pointer'>";

                btnSeleccionar.onclick = function () {
                    ProductoAgregar(Productos[i].codigo, Productos[i].nombre, Productos[i].precio_unitario, Productos[i].stocks[0]?.lote ?? "SIN");
                    ProductoMostrarModal(true);
                };
            }

        } else if (Mensaje.mensaje1) {
            alert(Mensaje.mensaje1);
        } else if (Mensaje.error) {
            alert(Mensaje.error);
        }
    } catch (e) {
        alert("revisar consola");
        console.log(e.stack || e);
    }
}

// =============================================================
// AGREGAR PRODUCTO DIRECTO A LA TABLA
// =============================================================
function ProductoAgregar(codigo, nombre, precio, lote) {

    let tbody = document.querySelector("#tblDetalleProducto tbody");
    ProductoDetalleMostrarTabla(false);

    let Fila = tbody.insertRow();

    // 0. CODIGO
    Fila.insertCell().innerText = codigo;
    // 1. NOMBRE
    Fila.insertCell().innerText = nombre;
    // 2. PRECIO
    Fila.insertCell().innerText = parseFloat(precio).toFixed(2);

    // 3. CANTIDAD (INPUT EDITABLE)
    let celdaCantidad = Fila.insertCell();
    let input = document.createElement("input");
    input.type = "number";
    input.value = 1;
    input.min = 1;
    input.className = "form-control input-base text-center";
    input.style.width = "80px";
    input.oninput = function () {
        CalcularFila(Fila);
    };
    celdaCantidad.appendChild(input);

    // 4. LOTE (Por defecto SIN)
    Fila.insertCell().innerText = lote;

    // 5. SUBTOTAL
    Fila.insertCell().innerText = parseFloat(precio).toFixed(2);

    // 6. ACCION (ELIMINAR)
    let btnEliminar = Fila.insertCell();
    btnEliminar.innerHTML = "<img src='/imagen/Icono/IconoEliminar.png' class='pointer'>";
    btnEliminar.onclick = function () {
        Fila.remove();
        CalcularTotal();
    }

    CalcularTotal();
}

// =============================================================
// CALCULAR SUBTOTAL DE UNA FILA
// =============================================================
function CalcularFila(Fila) {
    let precio = parseFloat(Fila.cells[2].innerText) || 0;
    let cantidad = parseFloat(Fila.cells[3].querySelector("input").value) || 0;
    if (isNaN(cantidad) || cantidad < 0) cantidad = 0;
    let subtotal = precio * cantidad;
    Fila.cells[5].innerText = subtotal.toFixed(2);
    CalcularTotal();
}

// =============================================================
// CALCULAR TOTAL
// =============================================================
function CalcularTotal() {
    let Filas = document.querySelectorAll("#tblDetalleProducto tbody tr");
    let Total = 0.0;
    Filas.forEach(Fila => {
        let SubTotal = parseFloat(Fila.cells[5].textContent) || 0;
        Total += SubTotal;
    })
    document.getElementById("spanVentaTotalPagar").innerText = (Math.round(Total * 100) / 100).toFixed(2);
}

// =============================================================
// REGISTRAR LA VENTA (envía venta + detalles en una sola petición)
// =============================================================
async function VentaRegistrar() {
    try {
        let Valor = ValidarVenta();
        if (Valor != 1) {
            Alerta(false, "IconoAdvertencia.png", Valor);
            return;
        }

        let usuario = document.getElementById("txtVentaUsuarioCodigo").value;
        if (usuario === "") {
            Alerta(false, "IconoAdvertencia.png", "El código de usuario es obligatorio");
            return;
        }

        let ventaObj = {
            codigo: document.getElementById("txtVentaCodigo").value,
            total: parseFloat(document.getElementById("spanVentaTotalPagar").innerText) || 0,
            usuario_codigo: usuario
        };

        let filas = document.querySelectorAll("#tblDetalleProducto tbody tr");
        let detalles = [];
        for (let Fila of filas) {
            let cantidad = parseFloat(Fila.cells[3].querySelector("input").value) || 0;
            detalles.push({
                producto_codigo: Fila.cells[0].textContent,
                cantidad: cantidad,
                precio_unitario: parseFloat(Fila.cells[2].textContent) || 0,
                subtotal: parseFloat(Fila.cells[5].textContent) || 0,
                lote: Fila.cells[4].textContent === "" ? "SIN" : Fila.cells[4].textContent
            });
        }

        let Payload = {
            accion: "venta_registrar_completa",
            venta: ventaObj,
            detalles: detalles
        };

        let Res = await EnviarFech("/control_venta", "POST", Payload);

        if (Res.mensaje) {
            limpiar();
            Alerta(false, "IconoExito.png", "Venta registrada correctamente");
        } else if (Res.error) {
            Alerta(false, "IconoError.png", "Revisar consola");
            console.error(Res.error);
        } else {
            Alerta(false, "IconoError.png", "Respuesta inesperada del servidor");
        }

    } catch (e) {
        Alerta(false, "IconoError.png", "Revisar consola");
        console.log(e.stack || e);
    }
}

// =============================================================
// ULTIMO CÓDIGO DE VENTA
// =============================================================
async function VentaUltimoCodigo() {
    try {
        let Datos = { accion: "venta_ultimo_codigo" };
        let Mensaje = await EnviarFech("/control_venta", "POST", Datos);

        if (Mensaje.mensaje) {
            let Codigo = Mensaje.mensaje;
            let Prefijo = Codigo.slice(0, 3);
            let Numero = parseInt(Codigo.slice(3)) + 1;
            let NuevoCodigo = Prefijo + Numero.toString().padStart(4, "0");
            document.getElementById("txtVentaCodigo").value = NuevoCodigo;
        } else if (Mensaje.mensaje1) {
            document.getElementById("txtVentaCodigo").value = "VEN0001";
        }
    } catch (e) {
        document.getElementById("txtVentaCodigo").value = "VEN0001";
    }
}

// =============================================================
// VALIDACIONES Y LIMPIEZA
// =============================================================
function ValidarVenta() {
    let fila = document.querySelector("#tblDetalleProducto tbody tr");
    if (fila == null) return "Debe agregar al menos un producto al detalle";
    return 1;
}

function limpiar() {
    VentaUltimoCodigo();
    document.getElementById("spanVentaTotalPagar").innerText = "0.00";
    ProductoDetalleMostrarTabla(true);
    document.querySelector("#tblDetalleProducto tbody").innerHTML = "";
}

// =============================================================
// MODALES / UI AUX
// =============================================================
function ProductoMostrarModal(Estado) {
    if (Estado) {
        document.querySelector(".modal-uno").classList.add("ocultar");
    } else {
        document.querySelector(".modal-uno").classList.remove("ocultar");
    }
}

function ProductoDetalleMostrarTabla(Estado) {
    if (Estado) {
        document.querySelector(".panel-tabla-producto").classList.add("ocultar");
    } else {
        document.querySelector(".panel-tabla-producto").classList.remove("ocultar");
    }
}

function FechaHoraActual() {
    let el = document.getElementById("txtVentaFechaHora");
    if (el) el.value = new Date().toLocaleString();
}

async function VentaObtenerUsuario() {
    try {
        let Mensaje = await EnviarFech("/control_venta", "POST", { accion: "venta_obtener_usuario" });
        if (Mensaje.mensaje) document.getElementById("txtVentaUsuarioCodigo").value = Mensaje.mensaje;
    } catch (e) { /* silencioso */ }
}

// =============================================================
// FUNCTION PARA BUSCAR PRODUCTO
// =============================================================
function ProductoBuscar() {
    // Agregar evento al input de búsqueda
    document.getElementById("txtProductoBuscarModal").addEventListener("input", function () {
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