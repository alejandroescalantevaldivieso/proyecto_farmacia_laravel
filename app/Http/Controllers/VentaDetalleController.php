<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\VentaDetalle;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\DB;

class VentaDetalleController extends Controller
{
    public function opciones_crud(Request $request) {
        $accion = $request->input('accion');
        if ($accion == null) {
            return response()->json(["error" => "No hay una acción."]);
        }

        switch ($accion) {
            case 'venta_detalle_registrar':
                try {
                    $datos_validados = $request->validate([
                        'cantidad' => 'required|numeric|min:0.01',
                        'precio_unitario' => 'required|numeric|min:0.01',
                        'subtotal' => 'required|numeric|min:0.01',
                        'lote' => 'nullable|string',
                        'producto_codigo' => 'required|string',
                        'venta_codigo' => 'required|string'
                    ]);
                    
                    VentaDetalle::create($datos_validados);

                    return response()->json(["mensaje" => "DetalleVenta registrado"]);
                } catch (ValidationException $e) {
                    return response()->json(["error" => $e->errors()]);
                } catch (QueryException $e) {
                    return response()->json(["error" => $e->getMessage()]);
                } catch (\Exception $e) {
                    return response()->json(["error" => $e->getMessage()]);
                }
            break;

            default:
                return response()->json(["error" => "Acción no válida"]);
            break;
        }
    }

    public function vista(){
        return view('venta_detalle');
    }
}