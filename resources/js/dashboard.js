import Chart from 'chart.js/auto';

let graficoVentasPorMes = null;
let graficoResumenGeneral = null;
let graficoTotalCompras = null;
let graficoTotalProductos = null;
let graficoTotalUsuarios = null;
let graficoTotalEmpleados = null;

document.addEventListener("DOMContentLoaded", cargarDashboard);

async function cargarDashboard() {
    try {
        const respuestaServidor = await fetch("/dashboard/datos");
        const datosDashboard = await respuestaServidor.json();

        document.getElementById("total-ventas").textContent = datosDashboard.total_ventas;
        document.getElementById("total-compras").textContent = datosDashboard.total_compras;
        document.getElementById("total-productos").textContent = datosDashboard.total_productos;
        document.getElementById("total-usuarios").textContent = datosDashboard.total_usuarios;
        

        construirGraficoVentasPorMes(datosDashboard.ventas_por_mes);
        construirGraficoTotal("grafico-total-compras", datosDashboard.total_compras, graficoTotalCompras, g => graficoTotalCompras = g);
        construirGraficoTotal("grafico-total-productos", datosDashboard.total_productos, graficoTotalProductos, g => graficoTotalProductos = g);
        construirGraficoTotal("grafico-total-usuarios", datosDashboard.total_usuarios, graficoTotalUsuarios, g => graficoTotalUsuarios = g);
        
        construirGraficoResumenGeneral(datosDashboard);

    } catch (error) {
        console.error("Error cargando dashboard:", error);
    }
}

/* =========================
   GRAFICO VENTAS POR MES
   ========================= */
function construirGraficoVentasPorMes(datosVentas) {

    const etiquetasMeses = datosVentas.map(dato => "Mes " + dato.mes);
    const valoresVentas = datosVentas.map(dato => dato.total);

    const contextoGrafico = document
        .getElementById("grafico-ventas-por-mes")
        .getContext("2d");

    if (graficoVentasPorMes) {
        graficoVentasPorMes.destroy();
    }

    graficoVentasPorMes = new Chart(contextoGrafico, {
    type: "line",
    data: {
        labels: etiquetasMeses,
        datasets: [{
            label: "Ventas",
            data: valoresVentas,
            tension: 0.4,
            fill: true
        }]
    },
    options: {
        plugins: { legend: { display: false } }
    }
});

}

/* =========================
   GRAFICOS TOTALES SIMPLES
   ========================= */
function construirGraficoTotal(idCanvas, valor, graficoActual, asignarGrafico) {

    const contextoGrafico = document
        .getElementById(idCanvas)
        .getContext("2d");

    if (graficoActual) {
        graficoActual.destroy();
    }

    const nuevoGrafico = new Chart(contextoGrafico, {
        type: "doughnut",
        data: {
            labels: ["Total"],
            datasets: [{
                data: [valor]
            }]
        }
    });

    asignarGrafico(nuevoGrafico);
}

/* =========================
   GRAFICO RESUMEN GENERAL
   ========================= */
function construirGraficoResumenGeneral(datosDashboard) {

    const contextoGrafico = document
        .getElementById("grafico-resumen-general")
        .getContext("2d");

    if (graficoResumenGeneral) {
        graficoResumenGeneral.destroy();
    }

    graficoResumenGeneral = new Chart(contextoGrafico, {
        type: "pie",
        data: {
            labels: [
                "Ventas",
                "Compras",
                "Productos",
                "Usuarios"
                
            ],
            datasets: [{
                data: [
                    datosDashboard.total_ventas,
                    datosDashboard.total_compras,
                    datosDashboard.total_productos,
                    datosDashboard.total_usuarios
                ]
            }]
        }
    });
}
