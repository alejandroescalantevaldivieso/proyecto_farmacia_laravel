const csrfToken = document.querySelector("meta[name='csrf-token']").getAttribute("content");

document.addEventListener("DOMContentLoaded", function () {
    ComprasRealizadasListar();
});

// =============================================================
// FUNCTION PARA ENVIAR FETCH
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
// FUNCTION PARA LISTAR TODAS LAS COMPRAS CON SU DETALLE
// =============================================================
async function ComprasRealizadasListar() {
    try {
        let Datos = { accion: "compra_listar" };

        let Mensaje = await EnviarFech("/control_compra", "POST", Datos);

        if (Mensaje.mensaje) {

            let Detalles = Mensaje.mensaje;

            let body = document.querySelector("#tblComprasRealizadas tbody");
            body.innerHTML = "";

            for (let i = Detalles.length - 1; i >= 0; i--) {

                let item = Detalles[i];
                let Fila = body.insertRow();

                // DATOS DE LA COMPRA
                Fila.insertCell().innerText = item.compra_codigo ?? "";
                Fila.insertCell().innerText = item.compra?.fecha ?? "";
                Fila.insertCell().innerText = item.compra?.total ?? "";

                // PROVEEDOR / USUARIO
                Fila.insertCell().innerText = item.compra?.proveedor?.razon_social ?? "";
                Fila.insertCell().innerText = item.compra?.usuario?.nombre ?? "";

                // PRODUCTO
                Fila.insertCell().innerText = item.producto_codigo ?? "";
                Fila.insertCell().innerText = item.producto?.nombre ?? "";

                // DETALLE
                Fila.insertCell().innerText = item.cantidad ?? "";
                Fila.insertCell().innerText = item.precio_unitario ?? "";
                Fila.insertCell().innerText = item.subtotal ?? "";
                Fila.insertCell().innerText = item.lote ?? "";
                Fila.insertCell().innerText = item.fecha_vencimiento ?? "";
            }

        } else if (Mensaje.error) {
            console.log(Mensaje.error);
        }

    } catch (e) {
        console.log("Revisar consola");
        console.log(e.stack);
    }
}

