const csrfToken = document.querySelector("meta[name='csrf-token']").getAttribute("content");

document.addEventListener("DOMContentLoaded", function () {
    Alerta(true);
    StockListar();
    StockBuscar();

    document.getElementById("btnCerrar").onclick=function () {
        Alerta(true);
    };
});

// =============================================================
// FUNCTION PARA MOSTRAR U OCULTAR ALERTA
// =============================================================
function Alerta(ocultar, Icono = "", Mensaje = "") {
    if (ocultar) {
        document.querySelector(".alerta-uno").classList.add("ocultar");
    } else {
        document.querySelector(".alerta-uno").classList.remove("ocultar");
        document.getElementById("imgIcono").src = "../Imagen/Icono/" + Icono;
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
        let Mensaje = await Respuesta.json();
        return Mensaje;
    } catch (e) {
        throw e;
    }
}

// =============================================================
// FUNCTION PARA BUSCAR Stock
// =============================================================
function StockBuscar() {
    document.getElementById("txtStockBuscar").addEventListener("input", function () {
        let Filtro = this.value.trim().toLowerCase(); 
        let Filas = document.querySelectorAll("#tblStock tbody tr"); 

        Filas.forEach(Fila => {
            let TextoFila = Fila.textContent.toLowerCase();           
            if (TextoFila.includes(Filtro)) {
                Fila.style.display = "";
            } else {
                Fila.style.display = "none";
            }
        });
    });
}

// =============================================================
// FUNCTION PARA LISTAR Stock
// =============================================================
async function StockListar() {
    try {
        // Usar minúscula en accion para estandarizar
        let Datos = {
            accion: "stock_listar" 
        }
        let Mensaje = await EnviarFetch("/control_stock", "POST", Datos);
        
        if (Mensaje.mensaje) {
            let Stocks = Mensaje.mensaje;
            let tbody = document.querySelector("#tblStock tbody");
            tbody.innerHTML = "";
            
            for (let i = Stocks.length - 1; i >= 0; i--) {
                let Fila = tbody.insertRow();
                
                // Debes llenar las columnas en el MISMO ORDEN que tu HTML thead
                // 1. CODIGO (Usamos el ID del stock o un contador)
                Fila.insertCell().innerText = Stocks[i].id || (i + 1); 
                
                // 2. LOTE
                Fila.insertCell().innerText = Stocks[i].lote;
                
                // 3. FECHA VENCIMIENTO
                Fila.insertCell().innerText = Stocks[i].fecha_vencimiento;
                
                // 4. CANTIDAD
                Fila.insertCell().innerText = Stocks[i].cantidad;
                
                // 5. FECHA INGRESO
                Fila.insertCell().innerText = Stocks[i].fecha_ingreso;
                
                // 6. PRODUCTO CODIGO
                Fila.insertCell().innerText = Stocks[i].producto_codigo;
                
                // 7. PRODUCTO NOMBRE (Accedemos a la relación)
                // Usamos validación por si el producto fue borrado
                Fila.insertCell().innerText = Stocks[i].producto ? Stocks[i].producto.nombre : "Sin Nombre";
            }

        } else if (Mensaje.mensaje1) {
            console.log(Mensaje.mensaje1);
            let tbody = document.querySelector("#tblStock tbody");
            tbody.innerHTML = "";
        } else if (Mensaje.error) {
            Alerta(false, "IconoError.png", "Revisar consola");
            console.log(Mensaje.error);
        }
    } catch (e) {
        Alerta(false,"IconoError.png", "Revisar consola");
        console.log(e.stack);
    }
}