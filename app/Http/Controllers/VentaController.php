<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\DB;
use App\Models\Venta;
use App\Models\VentaDetalle;
use Barryvdh\DomPDF\Facade\Pdf;

class VentaController extends Controller
{
    public function opciones_crud(Request $request) {
        $accion = $request->input('accion');
        if ($accion == null) {
            return response()->json(["error" => "No hay una acción."]);
        }

        switch ($accion) {
            case 'venta_registrar_completa':
                try {
                    $request->validate([
                        'venta.codigo' => 'required|string',
                        'venta.total' => 'required|numeric|min:0.01',
                        'venta.usuario_codigo' => 'required|string',
                        'detalles' => 'required|array|min:1',
                        'detalles.*.producto_codigo' => 'required|string',
                        'detalles.*.cantidad' => 'required|numeric|min:0.01',
                        'detalles.*.precio_unitario' => 'required|numeric|min:0.01',
                        'detalles.*.subtotal' => 'required|numeric|min:0.01',
                        'detalles.*.lote' => 'nullable|string',
                        // 'detalles.*.fecha_vencimiento' => 'nullable|date', // opcional
                    ]);

                    DB::beginTransaction();

                    Venta::create([
                        'codigo' => $request->input('venta.codigo'),
                        'total' => $request->input('venta.total'),
                        'usuario_codigo' => $request->input('venta.usuario_codigo'),
                    ]);

                    $detalles = $request->input('detalles');
                    foreach ($detalles as $d) {
                        VentaDetalle::create([
                            'producto_codigo' => $d['producto_codigo'],
                            'cantidad' => $d['cantidad'],
                            'precio_unitario' => $d['precio_unitario'],
                            'subtotal' => $d['subtotal'],
                            'lote' => $d['lote'] ?? 'SIN',
                            'venta_codigo' => $request->input('venta.codigo'),
                        ]);
                    }

                    DB::commit();
                    return response()->json(["mensaje" => "Venta completa registrada"]);
                } catch (ValidationException $e) {
                    DB::rollBack();
                    return response()->json(["error" => $e->errors()]);
                } catch (QueryException $e) {
                    DB::rollBack();
                    return response()->json(["error" => $e->getMessage()]);
                } catch (\Exception $e) {
                    DB::rollBack();
                    return response()->json(["error" => $e->getMessage()]);
                }
            break;
            case 'venta_ultimo_codigo':
                try {
                    $codigo = Venta::orderBy('codigo', 'desc')->value('codigo');
                    if ($codigo != null) {
                        return response()->json(["mensaje" => $codigo]);
                    } else {
                        return response()->json(["mensaje1" => "No hay ventas registradas"]);
                    }
                } catch (\Exception $e) {
                    return response()->json(["error" => $e->getMessage()]);
                }
            break;

            case 'venta_obtener_usuario':
                try {
                    $usuario_codigo = session('codigo_usuario');

                    if ($usuario_codigo) {
                        return response()->json(["mensaje" => $usuario_codigo]);
                    } else {
                        // fallback: devuelve un usuario activo si existe (útil para pruebas)
                        $usuario_db = \App\Models\Usuario::where('estado', 'A')->first();
                        if ($usuario_db) {
                            return response()->json(["mensaje" => $usuario_db->codigo]);
                        } else {
                            return response()->json(["error" => "Usuario no autenticado"]);
                        }
                    }
                } catch (\Exception $e) {
                    return response()->json(["error" => $e->getMessage()]);
                }
            break;
            case 'venta_listar':
            try {
                // Trae cada detalle de venta con producto y datos de la venta (incluye usuario)
                $registros = \App\Models\VentaDetalle::with(['producto', 'venta.usuario'])
                    ->orderBy('venta_codigo', 'desc')
                    ->get();

                return response()->json(['mensaje' => $registros]);
            } catch (\Exception $e) {
                return response()->json(['error' => $e->getMessage()]);
            }
            break;
            default:
                return response()->json(["error" => "Acción no válida"]);
            break;
        }
    }

    public function vista(){
        return view('venta');
    }
    public function vista_realizada(){
        return view('venta_realizada');
    }


        
    public function boleta_pdf($codigo_venta)
    {
        $venta = Venta::with([
            'usuario',
            'detalles.producto'
        ])->where('codigo', $codigo_venta)->firstOrFail();

        $pdf = Pdf::loadView('Reportes.boleta_venta', compact('venta'));

        return $pdf->download("boleta_{$venta->codigo}.pdf");
    }
}