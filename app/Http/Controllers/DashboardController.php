<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Venta;
use App\Models\Compra;
use App\Models\Producto;
use App\Models\Usuario;
use App\Models\Empleado;


class DashboardController extends Controller
{
    public function obtener_datos_dashboard()
    {
        return response()->json([
            'total_ventas' => Venta::count(),
            'total_compras' => Compra::count(),
            'total_productos' => Producto::where('estado', 'A')->count(),
            'total_usuarios' => Usuario::where('estado', 'A')->count(),
            'total_empleados' => Empleado::where('estado', 'A')->count(),

            'ventas_por_mes' => Venta::selectRaw('MONTH(created_at) as mes, COUNT(*) as total')
                ->groupBy('mes')
                ->orderBy('mes')
                ->get()
        ]);
    }

    public function vista()
    {
        return view('dashboard');
    }
}
