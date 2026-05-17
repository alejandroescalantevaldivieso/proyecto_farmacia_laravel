
const csrfToken = document.querySelector("meta[name='csrf-token']").getAttribute("content");

document.addEventListener("DOMContentLoaded", function () {
    ProductoListar();
    ProductoMostrarModal(true);
    Alerta(true);
    ProductoDetalleMostrarTabla(true);
    ProveedorListar();
    CompraUltimoCodigo();
    CompraObtenerUsuario();
    setInterval(FechaHoraActual, 1000);

    document.getElementById("btnProductoCancelarModal").onclick = function () {
        ProductoMostrarModal(true);
    };

    document.getElementById("btnProductoSeleccionar").onclick = function () {
        ProductoMostrarModal(false);        
    };

    document.getElementById("btnAlertaCerrar").onclick = function () {
        Alerta(true);
    };

    document.getElementById("btnProductoAgregar").onclick = ProductoAgregar;

    document.getElementById("btnRegistrarCompra").onclick = CompraRegistrar;

    document.getElementById("btnRegistrarCerrar").onclick = limpiar;

    document.getElementById("txtCantidad").addEventListener('input',function(){
        CalcularSubTotal();
    });
});

// =============================================================
// FUNCTION PARA ALERTA
// =============================================================
function Alerta(Estado, Icono = "IconoCarga.png", Mensaje = "Default") {
    if (Estado) {
        // Oculta la alerta si Estado es true
        document.querySelector(".alerta-uno").classList.add("ocultar");
    } else {
        // Muestra la alerta con su icono y mensaje
        document.querySelector(".alerta-uno").classList.remove("ocultar");
        document.getElementById("imgAlertaIcono").src = "/imagen/Icono/" + Icono;
        document.getElementById("pAlertaMensaje").innerText = Mensaje;
    }
}

// =============================================================
// FUNCTION PARA ENVIAR FETCH
// =============================================================
async function EnviarFech(Url, Metodo, Datos) {
    try {
        // Envía una petición HTTP con los datos en formato JSON
        let Respuesta = await fetch(Url, {
            method: Metodo,
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": csrfToken 
                },
            body: JSON.stringify(Datos)
        });

        // Valida errores HTTP (404, 500, etc.)
        if (!Respuesta.ok) {
            throw new Error(`Error: ${Respuesta.status} : ${Respuesta.statusText}`);
        }

        // Convierte la respuesta en JSON
        let Mensaje = await Respuesta.json();

        // Retorna el JSON al llamador
        return Mensaje;

    } catch (e) {
        // Propaga el error al bloque superior
        throw e;
    }
}

// =============================================================
// FUNCTION PARA LISTAR PRODUCTOS
// =============================================================
async function ProductoListar() {
    try {
        // Datos de acción para el backend
        let Datos = { accion: "producto_listar" };

        // Envía la petición al controlador
        let Mensaje = await EnviarFech("/control_producto", "POST", Datos);

        if (Mensaje.mensaje) {
            // Extrae el arreglo de productos
            let Productos = Mensaje.mensaje;

            // Referencia al cuerpo de la tabla
            let body = document.querySelector("#tblProducto tbody");
            body.innerHTML = ""; // Limpia tabla antes de llenar

            // Recorre el arreglo de productos (desde el final al inicio)
            for (let i = Productos.length - 1; i >= 0; i--) {
                let Fila = body.insertRow(); // Inserta nueva fila

                // Llena las celdas con datos
                Fila.insertCell().innerText = Productos[i].codigo;
                Fila.insertCell().innerText = Productos[i].nombre;
                Fila.insertCell().innerText = Productos[i].precio_unitario;

                // Crea botón de selección
                let btnSeleccionar = Fila.insertCell();
                btnSeleccionar.innerHTML = "<img src='/imagen/Icono/IconoSeleccionar.png'>";

                // Asigna evento click al botón
                btnSeleccionar.onclick = function () {
                    document.getElementById("txtProductoCodigo").value = Productos[i].codigo;
                    document.getElementById("txtProductoPrecioUnitario").value = Productos[i].precio_unitario;
                    ProductoMostrarModal(true); // Cierra modal
                };
            }

        } else if (Mensaje.mensaje1) {
            alert(Mensaje.mensaje1); // Mensaje informativo
        } else if (Mensaje.error) {
            alert(Mensaje.error); // Error de servidor
        }
    } catch (e) {
        alert("revisar consola");
        console.log(e.stack);
    }
}
// =============================================================
// FUNCTION PARA REGISTRAR LA COMPRA
// =============================================================
async function CompraRegistrar() {
    try {
        // Valida campos requeridos
        let Valor = ValidarCompra();
        if (Valor == 1) {
            let usuario = document.getElementById("txtCompraUsuarioCodigo").value;
            if(usuario === "") {
                Alerta(false, "IconoAdvertencia.png", "El código de usuario es obligatorio");
                return;
            }

            // Datos principales de la compra
            let DatosCompra = {
                accion: "compra_registrar", // Corregido a minúscula
                codigo: document.getElementById("txtCompraCodigo").value.trim(),
                total: document.getElementById("spanCompraTotalPagar").innerText.trim(),
                proveedor_codigo: document.getElementById("cbxProveedor").value.trim(),
                usuario_codigo: usuario
            };

            // Envia registro de compra principal
            let MensajeUno = await EnviarFech("/control_compra", "POST", DatosCompra);

            if (MensajeUno.mensaje) {
                // Obtiene filas de detalle de productos
                let CompraDetalles = document.querySelectorAll("#tblDetalleProducto tbody tr");

                let errorDetalle = false;

                // Recorre cada fila para registrar detalles
                for (let Fila of CompraDetalles) {
                    let fechaVenc = Fila.cells[5].textContent.trim();

                    if(fechaVenc === "") fechaVenc = "9999-12-31"; // Valor por defecto si es null

                    let DatosCompraDetalle = {
                        accion: "compra_detalle_registrar", // Corregido a minúscula
                        cantidad: Fila.cells[1].textContent,
                        precio_unitario: Fila.cells[2].textContent,
                        subtotal: Fila.cells[3].textContent,
                        lote: Fila.cells[4].textContent === "" ? "SIN" : Fila.cells[4].textContent,
                        fecha_vencimiento: fechaVenc,
                        producto_codigo: Fila.cells[0].textContent.trim(),
                        compra_codigo: document.getElementById("txtCompraCodigo").value
                    };

                  
                    let MensajeDos = await EnviarFech("/control_compra_detalle", "POST", DatosCompraDetalle);

                    if (MensajeDos.error) {
                        errorDetalle = true;
                        console.log("Error en detalle:", MensajeDos.error);
                    }
                }

                if(!errorDetalle){
                    limpiar();
                    Alerta(false, "IconoExito.png", "Registro exitoso de compra");
                } else {
                    Alerta(false, "IconoAdvertencia.png", "Compra guardada, pero hubo errores en algunos detalles.");
                }
            } else if (MensajeUno.error) {
                Alerta(false, "IconoError.png", "Error al registrar cabecera");
                console.log(MensajeUno.error);
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
// FUNCTION PARA MOSTRAR EL ULTIMO CODIGO DE COMPRA
// =============================================================
async function CompraUltimoCodigo() {
    try {
        let Datos = { accion: "compra_ultimo_codigo" };
        let Mensaje = await EnviarFech("/control_compra", "POST", Datos);

        if (Mensaje.mensaje) {
            // El controlador devuelve directamente el código en 'mensaje' (ej: "COM0005")
            let Codigo = Mensaje.mensaje;

            // Lógica para incrementar
            let Prefijo = Codigo.slice(0, 3); // "COM"
            let Numero = parseInt(Codigo.slice(3)) + 1; // 5 + 1 = 6
            let NuevoCodigo = Prefijo + Numero.toString().padStart(4, "0"); // "COM0006"

            document.getElementById("txtCompraCodigo").value = NuevoCodigo;

        } else if (Mensaje.mensaje1) {
            // No hay registros previos
            document.getElementById("txtCompraCodigo").value = "COM0001";
        } else {
            console.error(Mensaje.error);
        }

    } catch (e) {
        console.error(e);
        // Fallback en caso de error crítico
        document.getElementById("txtCompraCodigo").value = "COM0001"; 
    }
}
// =============================================================
// FUNCTION PARA VALIDAR DATOS DE COMPRA
// =============================================================
function ValidarCompra() {
    // Obtiene el valor seleccionado en el combo de proveedores
    let proveedor = document.getElementById("cbxProveedor").value.trim();
    // Verifica si hay al menos una fila en la tabla de detalle
    let fila = document.querySelector("#tblDetalleProducto tbody tr");

    // Validar proveedor seleccionado
    if (proveedor === "") {
        return "Debe seleccionar un proveedor";
    }

    // Validar que exista al menos un producto agregado
    if (fila == null) {        
        return "Debe agregar al menos un producto al detalle";
    }

    // Retornar 1 si todo está correcto
    return 1;
}
// =============================================================
// FUNCTION PARA LIMPIAR CAMPOS Y RESETEAR COMPRA
// =============================================================
function limpiar(){
    // Generar nuevo código de compra
    CompraUltimoCodigo();

    // Limpiar campos principales
    document.getElementById("cbxProveedor").value="";
    //document.getElementById("txtCompraUsuarioCodigo").value="";
    document.getElementById("txtProductoCodigo").value="";
    document.getElementById("txtCantidad").value="";
    document.getElementById("txtProductoPrecioUnitario").value="";
    document.getElementById("txtProductoSubTotal").value="";
    document.getElementById("txtProductoLote").value="";
    document.getElementById("txtProductoFechaVencimiento").value="";
    document.getElementById("spanCompraTotalPagar").innerText="";
    // Ocultar tabla de detalle y vaciar su contenido
    ProductoDetalleMostrarTabla(true);
    document.querySelector("#tblDetalleProducto tbody").innerHTML="";
}
// =============================================================
// FUNCTION PARA MOSTRAR U OCULTAR MODAL DE PRODUCTOS
// =============================================================
function ProductoMostrarModal(Estado){
    if(Estado){
        // Si Estado = true, ocultar modal
        document.querySelector(".modal-uno").classList.add("ocultar");
    }else{
        // Si Estado = false, mostrar modal
        document.querySelector(".modal-uno").classList.remove("ocultar");
    }
}
// =============================================================
// FUNCTION PARA CALCULAR SUBTOTALES Y TOTAL DE COMPRA
// =============================================================
function CalcularSubTotal(){
    // Calcular subtotal del producto actual
    let cantidad = parseFloat(document.getElementById("txtCantidad").value) || 0;
    let precio_unitario = parseFloat(document.getElementById("txtProductoPrecioUnitario").value) || 0;
    let subtotal = cantidad * precio_unitario;
    // Redondear a dos decimales
    document.getElementById("txtProductoSubTotal").value = Math.round(subtotal * 100) / 100;     
}
function CalcularTotal(){
    // Calcular total de toda la compra
    let Filas = document.querySelectorAll("#tblDetalleProducto tbody tr");
    let Total = 0.0;
    Filas.forEach(Fila =>{
        // Celda 3 = Subtotal
        let SubTotal = Fila.cells[3];
        Total += parseFloat(SubTotal.textContent);
    })
    // Mostrar total en pantalla
    document.getElementById("spanCompraTotalPagar").innerText = Math.round(Total *100) /100;
}
// =============================================================
// FUNCTION PARA AGREGAR PRODUCTOS AL DETALLE DE COMPRA
// =============================================================
function ProductoAgregar(){
    // Validar campos de producto antes de agregar
    let Valor = ValidarDetalleProducto();
    if(Valor==1){
        // Obtener datos desde inputs
        let codigo = document.getElementById("txtProductoCodigo").value;
        let cantidad = parseFloat(document.getElementById("txtCantidad").value);
        let precio_unitario = parseFloat(document.getElementById("txtProductoPrecioUnitario").value);
        let subtotal = parseFloat(document.getElementById("txtProductoSubTotal").value);
        let lote = document.getElementById("txtProductoLote").value;
        let fecha_vencimiento = document.getElementById("txtProductoFechaVencimiento").value;

        // Mostrar la tabla de detalles
        let tbody = document.querySelector("#tblDetalleProducto tbody");
        ProductoDetalleMostrarTabla(false);

        // Crear una nueva fila
        let Fila = tbody.insertRow();

        // Insertar las celdas en orden
        Fila.insertCell().innerText = codigo;
        Fila.insertCell().innerText = cantidad;
        Fila.insertCell().innerText = precio_unitario;
        Fila.insertCell().innerText = subtotal;
        Fila.insertCell().innerText = lote;
        Fila.insertCell().innerText = fecha_vencimiento;

        // Agregar botón eliminar con evento
        let btnEliminar = Fila.insertCell();
        btnEliminar.innerHTML = "<img src='/imagen/Icono/IconoEliminar.png'>";
        btnEliminar.onclick = function(){
            // Elimina la fila actual
            Fila.remove();
            CalcularTotal();
        }

        CalcularTotal();
    }else{
        // Mostrar alerta si la validación falla
        Alerta(false,"IconoAdvertencia.png",Valor);
    }
}
// =============================================================
// FUNCTION PARA MOSTRAR / OCULTAR TABLA DE DETALLE PRODUCTO
// =============================================================
function ProductoDetalleMostrarTabla(Estado){
    if(Estado){
        // Ocultar tabla
        document.querySelector(".panel-tabla-producto").classList.add("ocultar");
    }else{
        // Mostrar tabla
        document.querySelector(".panel-tabla-producto").classList.remove("ocultar");
    }
}
// =============================================================
// FUNCTION PARA VALIDAR DATOS DE DETALLE DE PRODUCTO
// =============================================================
function ValidarDetalleProducto() {
    // Obtener valores desde inputs
    let codigo = document.getElementById("txtProductoCodigo").value.trim();
    let cantidad = parseFloat(document.getElementById("txtCantidad").value);
    let precio_unitario = parseFloat(document.getElementById("txtProductoPrecioUnitario").value);
    let subtotal = parseFloat(document.getElementById("txtProductoSubTotal").value);
    let lote = document.getElementById("txtProductoLote").value.trim();
    let fecha_vencimiento = document.getElementById("txtProductoFechaVencimiento").value.trim();

    // Validaciones básicas
    if (codigo === "") return "El código del producto no puede estar vacío";
    if (isNaN(cantidad)) return "La cantidad no puede estar vacía";
    if (isNaN(precio_unitario)) return "El precio unitario no puede estar vacío";
    if (isNaN(subtotal)) return "El subtotal no puede estar vacío";

    // Validar valores negativos
    if (cantidad <= 0) return "La cantidad no puede ser negativa";
    if (precio_unitario <= 0) return "El precio unitario no puede ser negativo";
    if (subtotal <= 0) return "El subtotal no puede ser negativo o cero";

    // Validar formato decimal
    if (!/^(\d+(\.\d+)?)$/.test(cantidad)) return "La cantidad debe ser un número válido";
    if (!/^(\d+(\.\d+)?)$/.test(precio_unitario)) return "El precio unitario debe ser un número válido";
    if (!/^(\d+(\.\d+)?)$/.test(subtotal)) return "El subtotal debe ser un número válido";

    // Validar formato de lote (detallado por trazabilidad)
    if (lote !== "") {
        if (!/^[A-Za-z0-9]{4,10}$/.test(lote)) {
            return "El lote debe tener entre 4 y 10 caracteres, solo letras y números";
        }
    }

    // Validar fecha de vencimiento
    if (fecha_vencimiento !== "") {
        let hoy = new Date();
        hoy.setHours(0, 0, 0, 0); // eliminar horas para comparar solo fechas
        let fechaV = new Date(fecha_vencimiento);
        if (fechaV <= hoy) {
            return "La fecha de vencimiento debe ser posterior al día actual";
        }
    }

    // Si todo es correcto
    return 1;
}
// =============================================================
// FUNCTION PARA LISTAR PROVEEDORES EN EL COMBOBOX
// =============================================================
async function ProveedorListar(){
    try{
        // Datos de petición
        let Datos = { accion: "proveedor_listar" };
        // Enviar al backend
        let Mensaje = await EnviarFech("/control_proveedor","POST",Datos);
        
        if(Mensaje.mensaje){
            // Obtener arreglo de proveedores
            let Proveedores = Mensaje.mensaje;
            // Obtener elemento select
            let cbxProveedor = document.getElementById("cbxProveedor");

            // Agregar opción por defecto
            let Option = document.createElement("option");
            Option.value = "";
            Option.text = "Proveedor";
            cbxProveedor.appendChild(Option);

            // Recorrer proveedores y agregarlos al select
            for(let i = Proveedores.length - 1; i >= 0; i--){
                let Option = document.createElement("option");
                Option.value = Proveedores[i].codigo;
                Option.text = Proveedores[i].codigo + " - " + Proveedores[i].razon_social;
                cbxProveedor.appendChild(Option);
            }
        }else if(Mensaje.mensaje1){
            console.log(Mensaje.mensaje1);
        }else if(Mensaje.error){
            Alerta(false,"IconoError.png","Revisar consola");
            console.log(Mensaje.error);
        }
    }catch(e){
        Alerta(false,"IconoError.png","Revisar consola");
        console.log(e.stack);
    }
}
// =============================================================
// FUNCTION PARA OBTENER FECHA Y HORA ACTUAL
// =============================================================
function FechaHoraActual(){
    // Asigna la fecha actual con formato local al input
    document.getElementById("txtCompraFechaHora").value = new Date().toLocaleString();
}

async function CompraObtenerUsuario() {
    try {
        let Datos = { accion: "compra_obtener_usuario" };
        let Mensaje = await EnviarFech("/control_compra", "POST", Datos);

        if (Mensaje.mensaje) {
            // Asigna el código recuperado al input visible
            document.getElementById("txtCompraUsuarioCodigo").value = Mensaje.mensaje;
        } else if (Mensaje.error) {
            console.log("Error al obtener usuario: " + Mensaje.error);
        }
    } catch (e) {
        console.log(e);
    }
}