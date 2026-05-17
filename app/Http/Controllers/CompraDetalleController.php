<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CompraDetalle;
use App\Models\Stock;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\QueryException;

class CompraDetalleController extends Controller
{
    public function opciones_crud(Request $request) {
        $accion = $request->input('accion');
        
        if ($accion == null) {
            return response()->json(["error" => "No hay una acción."]);
        }
        
        switch($accion){
            case 'compra_detalle_registrar':
                try{
                    CompraDetalle::create( $request->only([
                        'cantidad',
                        'precio_unitario',
                        'subtotal',
                        'lote',
                        'fecha_vencimiento',
                        'producto_codigo',
                        'compra_codigo',
                    ]));

                    return response()->json(["mensaje" => "Detalle realizada con éxito."]);

                } catch(ValidationException $e) {
                    return response()->json(["error" => $e->errors()]);
                } catch(QueryException $e) {
                    return response()->json(["error" => $e->getMessage()]);
                } catch(\Exception $e) {
                    return response()->json(["error" => $e->getMessage()]);
                }
            break;
            default:
                return response()->json(["error" => "Acción no válida"]);
            break;
        }
    }

    public function vista(){
        return view('compra_detalle');
    }
}