const csrfToken = document.querySelector("meta[name='csrf-token']").getAttribute("content");

document.addEventListener("DOMContentLoaded", function() {
    OcultaTabla(false,true);
    Alerta(true);
    TipoProductoListar(); 
    TipoProductoListarEliminado();    
    TipoProductoBuscar();
    TipoProductoBuscarEliminado();
    TipoProductoMostrarModal(true);

    document.getElementById("btnTipoProductoRegistrar").onclick=TipoProductoRegistrar;

    document.getElementById("btnCerrar").onclick=function () {
        Alerta(true);
    };
    document.getElementById("btnTipoProductoActivo").addEventListener("click", function () {
        OcultaTabla(false, true);
    });
    document.getElementById("btnTipoProductoEliminado").addEventListener("click", function () {
        OcultaTabla(true, false);
    });

    document.getElementById("btnTipoProductoMostrarModal").onclick = function () {
        Limpiar();
        TipoProductoMostrarModal(false);
        TipoProductoUltimoCodigo();

    };

    document.getElementById("btnTipoProductoCerrarModal").onclick = function () {
        TipoProductoMostrarModal(true);
        Limpiar();
    };
});

// =============================================================
// FUNCTION PARA OCULTAR TABLAS
// =============================================================
function OcultaTabla(tblTipoProducto,tblTipoProductoEliminado){
    if(tblTipoProducto){
        document.querySelector(".panel-tabla-tipoproducto").classList.add("ocultar");
    }else{
        document.querySelector(".panel-tabla-tipoproducto").classList.remove("ocultar");
    }
    // Ocultar o mostrar tabla de tipos de productos eliminados
    if(tblTipoProductoEliminado){
        document.querySelector(".panel-tabla-tipoproducto-eliminado").classList.add("ocultar");
    }else{
        document.querySelector(".panel-tabla-tipoproducto-eliminado").classList.remove("ocultar");
    }
}

// =============================================================
// FUNCTION PARA ALERTA
// =============================================================
function Alerta(ocultar,Icono= "",Mensaje= ""){
      if (ocultar) {
        document.querySelector(".alerta-uno").classList.add("ocultar");
    } else {
        document.querySelector(".alerta-uno").classList.remove("ocultar");
        document.getElementById("imgIcono").src = "/imagen/Icono/" + Icono;
        document.getElementById("pMensaje").innerText = Mensaje;
    }
}

// =============================================================
// FUNCTION PARA LIMPIAR TODOS LOS CAMPOS Y TABLAS DE SELECCIÓN
// =============================================================
function Limpiar() {
    //Limpiar los campos de texto y selección
    document.getElementById("txtTipoProductoCodigo").value = "";
    document.getElementById("txtTipoProductoNombre").value = "";
    document.getElementById("txaTipoProductoDescripcion").value = "";

    //Limpiar la selección de filas en ambas tablas
    document.querySelectorAll("#tblTipoProducto tbody tr.SeleccionarFila").forEach(FilaActual => FilaActual.classList.remove("SeleccionarFila"));
    document.querySelectorAll("#tblTipoProductoEliminado tbody tr.SeleccionarFila").forEach(FilaActual => FilaActual.classList.remove("SeleccionarFila"));

    document.getElementById("imgIconoModal").src="/imagen/Icono/IconoUsuarioRegistrar.png";
    document.getElementById("txtTituloModal").innerText="Registrar Nuevo Tipo Producto";
    document.getElementById("txtParrafoModal").innerText="Complete los datos del nuevo tipo producto para agregarlo al sistema";
    document.getElementById("btnTipoProductoRegistrar").innerText="Registrar tipo producto";

    document.getElementById("btnTipoProductoRegistrar").onclick = TipoProductoRegistrar;

    TipoProductoListar();
    TipoProductoListarEliminado();
}

// =============================================================
// FUNCTION PARA VALIDAR CAMPOS DE TIPOPRODUCTO
// =============================================================
function ValidarCampo(Datos){
    if(Datos.codigo===""){
        return "Ingresa un codigo";
    }else if(Datos.nombre===""){
        return "Ingresa un Nombre";
    }else if(Datos.descripcion===""){
        return "Ingresa una descripcion";
    }
    return 1; //Todo salio bien
}

// =============================================================
// FUNCTION PARA ENVIAR FETCH
// =============================================================
async function EnviarFetch(Url, Metodo, Datos){
    try { 
        let Respuesta = await fetch(Url, {
            method:Metodo,
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": csrfToken 
                },
            body: JSON.stringify(Datos)
        });
        
        if(!Respuesta.ok){
            throw new Error(`Error: ${Respuesta.status}: ${Respuesta.statusText}`);
        }
        let Mensaje = await Respuesta.json();
        return Mensaje;
    }catch(e){
        throw e;
    }
}

// =============================================================
// FUNCTION PARA REGISTRAR TIPOPRODUCTO
// =============================================================
async function TipoProductoRegistrar(){
    try{
        let Datos = {
            accion:"tipo_producto_registrar",
            codigo: document.getElementById("txtTipoProductoCodigo").value,
            nombre: document.getElementById("txtTipoProductoNombre").value,
            descripcion: document.getElementById("txaTipoProductoDescripcion").value
        }
            // Validar los campos del formulario
        let Valor = ValidarCampo(Datos);
        if (Valor === 1) {
            // Enviar datos al controlador
            let Mensaje = await EnviarFetch("/control_tipo_producto", "POST", Datos);
            if (Mensaje.mensaje) {
                Alerta(false, "IconoExito.png", Mensaje.mensaje);
                Limpiar();
                TipoProductoMostrarModal(true);
            }else if (Mensaje.error) {
                Alerta(false, "IconoError.png", "Revisar consola");
                Limpiar();
                TipoProductoMostrarModal(true);
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
// FUNCTION PARA ACTUALIZAR TIPOPRODUCTO
// =============================================================
async function TipoProductoActualizar(){
    try{
        //Obtener datos
        let Datos={
            accion:"tipo_producto_actualizar",
            codigo: document.getElementById("txtTipoProductoCodigo").value,
            nombre: document.getElementById("txtTipoProductoNombre").value,
            descripcion: document.getElementById("txaTipoProductoDescripcion").value
        }

        let Valor = ValidarCampo(Datos);
        if (Valor == 1) {
            //Enviamos peticion
            let Mensaje = await EnviarFetch("/control_tipo_producto", "POST", Datos);
            if (Mensaje.mensaje) {
                Alerta(false, "IconoExito.png", Mensaje.mensaje);
                Limpiar();
                TipoProductoMostrarModal(true);
            }else if (Mensaje.error) {
                Alerta(false, "IconoError.png", "Revisar consola");
                console.log(Mensaje.error);
                Limpiar();
                TipoProductoMostrarModal(true);   
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
// FUNCTION PARA ELIMINAR TIPOPRODUCTO
// =============================================================
async function TipoProductoEliminar(codigo){
    try{
        //Obtener datos
        let Datos={
            accion:"tipo_producto_eliminar",
            codigo: codigo 
        }
        // Enviar petición al controlador usando fetch
        let Mensaje = await EnviarFetch("/control_tipo_producto", "POST", Datos);

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
// FUNCTION PARA RECUPERAR TIPOPRODUCTO
// =============================================================
async function TipoProductoRecuperar(codigo){
    try {
        // Preparar datos a enviar al controlador
        let Datos = {
            accion: "tipo_producto_recuperar",
            codigo: codigo
        }

        // Enviar petición al controlador usando fetch
        let Mensaje = await EnviarFetch("/control_tipo_producto", "POST", Datos);

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

//FUNCTION PARA BUSCAR TIPOPRODUCTO
function TipoProductoBuscar(){
    document.getElementById("txtTipoProductoBuscar").addEventListener("input",function() {
        let Filtro=this.value.trim().toLowerCase();//Obtener el valor de ingreso
        let Filas=document.querySelectorAll("#tblTipoProducto tbody tr");//Obtener las filas
        //Recorremos cada fila
        Filas.forEach(Fila=>{
            //Obtener texto de la fila
            let TextoFila=Fila.textContent.toLowerCase();           
            //Si el texto de la fila incluye algo del filtro
            if(TextoFila.includes(Filtro)){ 
                Fila.style.display="";//Mostrar
            }else{
                Fila.style.display="none";//ocultar
            }
        });
    });
}

//FUNCTION PARA BUSCAR TIPOPRODUCTO ELIMINADO
function TipoProductoBuscarEliminado(){
    document.getElementById("txtTipoProductoBuscarEliminado").addEventListener("input",function(){
        let Filtro=this.value.trim().toLowerCase();//Obtener el valor que se ingresa por el input
        let Filas=document.querySelectorAll("#tblTipoProductoEliminado tbody tr");//Obtener todas las filas de la tabla
        /*
        "Este código revisa cada fila de tu tabla y muestra u oculta 
        la fila dependiendo de si contiene el texto que el 
        usuario escribió en el buscador."
        */
        Filas.forEach(FilaActual => {
            let TextoFila=FilaActual.innerText.trim().toLowerCase();//Obtengo el contenido de la fila
            //Validar si la fila contiene algo del filtro
            if(TextoFila.includes(Filtro)){
                FilaActual.style.display="";
            }else{
                FilaActual.style.display="none";
            }
        });
    });
}
//FUNCTION PARA LISTAR TIPOPRODUCTO
async function TipoProductoListar(){
    try{
        //Obtener datos
        let Datos = {
            accion:"tipo_producto_listar"
        }
        //Enviar peticion
        let Mensaje = await EnviarFetch("/control_tipo_producto","POST",Datos);
        if(Mensaje.mensaje){                  
            let TiposProductos = Mensaje.mensaje;//Obtener el arreglo                        
                let tbody = document.querySelector("#tblTipoProducto tbody");//Obtener el cuerpo de la tabla tipoproducto
                tbody.innerHTML="";//Limpiar el cuerpo
                for (let i=TiposProductos.length - 1 ; i>=0 ; i--) {
                    let Fila = tbody.insertRow();//Insertar fila

                    Fila.insertCell().innerText=TiposProductos[i].codigo;
                    Fila.insertCell().innerText=TiposProductos[i].nombre;
                    Fila.insertCell().innerText=TiposProductos[i].descripcion;
                
                // Insertar celda con botón Eliminar (icono)
                let btnEliminar = Fila.insertCell();
                btnEliminar.innerHTML = "<img src='/imagen/Icono/IconoEliminar.png' title='Eliminar'>";
                btnEliminar.onclick = function (e) {
                    TipoProductoEliminar(TiposProductos[i].codigo);
                }

                // Insertar celda con botón Editar (icono)
                let btnEditar = Fila.insertCell();
                btnEditar.innerHTML = "<img src='/imagen/Icono/IconoEditar.png'>";
                btnEditar.onclick = function (e) {
                    TipoProductoMostrarModalEditar(TiposProductos[i].codigo, TiposProductos[i].nombre, TiposProductos[i].descripcion);
                }
            }
            // Si la respuesta contiene la clave "mensaje1", no hay productos registrados
        } else if (Mensaje.mensaje1) {
            console.log(Mensaje.mensaje1);
            let tbody = document.querySelector("#tblTipoProducto tbody");
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
//FUNCTION PARA LISTAR TIPOPRODUCTO ELIMINADO
async function TipoProductoListarEliminado(){
    try{
        //Obtener datos
        let Datos={
            accion:"tipo_producto_listar_eliminado"
        }
        let Mensaje=await EnviarFetch("/control_tipo_producto","POST",Datos);
        if(Mensaje.mensaje){
            let TiposProductos=Mensaje.mensaje;//Obtener el array con datos
            let tbody=document.querySelector("#tblTipoProductoEliminado tbody");//Obtenemos el cuerpo de la tabla
            tbody.innerHTML="";//Limpiamos el cuerpo
            for(let i=TiposProductos.length -1 ; i>=0 ; i--){
                let Fila=tbody.insertRow();//Insertamos una fila

                Fila.insertCell().innerText=TiposProductos[i].codigo;
                Fila.insertCell().innerText=TiposProductos[i].nombre;
                Fila.insertCell().innerText=TiposProductos[i].descripcion;

                let btnRecuperar = Fila.insertCell();
                btnRecuperar.innerHTML = "<img src='/imagen/Icono/IconoRecuperar.png' title='Recuperar'>";

                btnRecuperar.onclick = function () {
                    TipoProductoRecuperar(TiposProductos[i].codigo); 
                }
            }
        } else if (Mensaje.mensaje1) {
            console.log(Mensaje.mensaje1);
            let tbody = document.querySelector("#tblTipoProductoEliminado tbody");
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
//FUNCTION PARA OBTENER ULTIMO CODIGO DE TIPOPRODUCTO
async function TipoProductoUltimoCodigo(){
    try{
        let Datos={
            accion:"tipo_producto_ultimo_codigo"
        }
        let Mensaje = await EnviarFetch("/control_tipo_producto","POST",Datos);
        
        if (Mensaje.mensaje) {
            let Codigo = Mensaje.mensaje;
            
            let Prefijo = Codigo.toString().slice(0, 3);
            let Numero = parseInt(Codigo.toString().slice(3)) + 1;
            let Num = Numero.toString().padStart(4, "0");
            let CodigoNuevo = Prefijo + Num; 
            
            document.getElementById("txtTipoProductoCodigo").value = CodigoNuevo;
        } else if (Mensaje.mensaje1) {
            document.getElementById("txtTipoProductoCodigo").value = "TP00001";
        }
    } catch (e) {
        Alerta(false, "IconoError.png", "Revisar consola");
        console.log(e.stack);
    }
}
// =============================================================
// FUNCTION PARA MOSTRAR Y OCULTAR MODAL TIPOPRODUCTO
// =============================================================
function TipoProductoMostrarModal(Estado) {
    // Si Estado es true, ocultar modal
    if (Estado) {
        document.querySelector(".modal-uno").classList.add("ocultar");
    }
    // Si Estado es false, mostrar modal
    else {
        document.querySelector(".modal-uno").classList.remove("ocultar");
    }
}
//FUNCTION PARA MOSTRAR EL MODAL DE EDITAR TIPOPRODUCTO
function TipoProductoMostrarModalEditar(codigo, nombre, descripcion) {
    TipoProductoMostrarModal(false);
    Limpiar();
    //Mostrar los datos en los campos
    document.getElementById("txtTipoProductoCodigo").value=codigo;
    document.getElementById("txtTipoProductoNombre").value=nombre;
    document.getElementById("txaTipoProductoDescripcion").value=descripcion;

    document.getElementById("imgIconoModal").src = "/imagen/Icono/IconoEditarAguamarina.png";
    document.getElementById("txtTituloModal").innerText = "Editar Tipo Producto"
    document.getElementById("txtParrafoModal").innerText = "Modifique los datos del tipo producto " + codigo;
    document.getElementById("btnTipoProductoRegistrar").innerText = "Guardar Cambios";

    document.getElementById("btnTipoProductoRegistrar").onclick = TipoProductoActualizar;
}