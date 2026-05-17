const csrfToken = document.querySelector("meta[name='csrf-token']").getAttribute("content");

document.addEventListener("DOMContentLoaded", function () {
    VentasRealizadasListar();
});

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
        return await Respuesta.json();
    } catch (e) {
        throw e;
    }
}

async function VentasRealizadasListar() {
    try {
        let Datos = { accion: "venta_listar" };
        let Mensaje = await EnviarFech("/control_venta", "POST", Datos);

        if (Mensaje.mensaje) {
            let Detalles = Mensaje.mensaje;
            let body = document.querySelector("#tblVentasRealizadas tbody");
            body.innerHTML = "";

            for (let i = Detalles.length - 1; i >= 0; i--) {
                let item = Detalles[i];
                let Fila = body.insertRow();

                // DATOS DE LA VENTA
                Fila.insertCell().innerText = item.venta_codigo ?? "";
                Fila.insertCell().innerText = item.venta?.fecha ? item.venta.fecha : "";
                Fila.insertCell().innerText = item.venta?.total ?? "";

                // USUARIO
                Fila.insertCell().innerText = item.venta?.usuario?.nombre ?? "";

                // PRODUCTO
                Fila.insertCell().innerText = item.producto_codigo ?? "";
                Fila.insertCell().innerText = item.producto?.nombre ?? "";

                // DETALLE
                Fila.insertCell().innerText = item.cantidad ?? "";
                Fila.insertCell().innerText = item.precio_unitario ?? "";
                Fila.insertCell().innerText = item.subtotal ?? "";
                Fila.insertCell().innerText = item.lote ?? "";

                let boton = document.createElement("a");
                boton.href = `/ventas/${item.venta_codigo}/boleta-pdf`;
                boton.target = "_blank";
                boton.innerText = "PDF";
                boton.className = "btn btn-sm btn-danger";

                Fila.insertCell().appendChild(boton);
            }
        } else if (Mensaje.mensaje1) {
            console.log(Mensaje.mensaje1);
        } else if (Mensaje.error) {
            console.error(Mensaje.error);
        }
    } catch (e) {
        console.log("Revisar consola");
        console.error(e);
    }
}