<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Compra;
use App\Models\Venta;
use Barryvdh\DomPDF\Facade\Pdf;


class ReporteController extends Controller
{
    function ReporteComprasPDF(Request $request){
        $query = Compra::with(['proveedor', 'usuario', 'detalles.producto']);

        // Filtrar por rango de fechas
        if ($request->filled('fecha_inicio') && $request->filled('fecha_fin')) {
            $query->whereBetween('fecha', [
                $request->fecha_inicio,
                $request->fecha_fin
            ]);
        }

        // Filtrar por usuario
        if ($request->filled('usuario_codigo')) {
            $query->where('usuario_codigo', $request->usuario_codigo);
        }

        $compras = $query->get();

        $pdf = Pdf::loadView('Reportes.reporte_compra', ['compras' => $compras])->setPaper('a4', 'landscape');

        return $pdf->stream('reporte_compras.pdf');
    }

    function ReporteVentasPDF(Request $request){
        $query = Venta::with(['usuario', 'detalles.producto']);

        // Filtrar por rango de fechas
        if ($request->filled('fecha_inicio') && $request->filled('fecha_fin')) {
            $query->whereBetween('fecha', [
                $request->fecha_inicio,
                $request->fecha_fin
            ]);
        }

        // Filtrar por usuario
        if ($request->filled('usuario_codigo')) {
            $query->where('usuario_codigo', $request->usuario_codigo);
        }

        $ventas = $query->get();

        $pdf = Pdf::loadView('Reportes.reporte_venta', [
            'ventas' => $ventas,
            'fecha_inicio' => $request->fecha_inicio,
            'fecha_fin' => $request->fecha_fin,
            'usuario_codigo' => $request->usuario_codigo
        ])->setPaper('a4', 'landscape');

        return $pdf->stream('reporte_ventas.pdf');
    }

    function ReporteProductosPDF(){

    }
    
}
