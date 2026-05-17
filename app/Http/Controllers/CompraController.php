<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\QueryException;
use App\Models\CompraDetalle;
use App\Models\Compra;
use App\Models\Usuario;

class CompraController extends Controller
{
    public function opciones_crud(Request $request) {
        // Se asegura de leer el input 'accion'
        $accion = $request->input('accion');
        
        if ($accion == null) {
            return response()->json(["error" => "No hay una acción."]);
        }

        switch($accion){
            case 'compra_registrar':
                try{               
                    Compra::create( $request->only([
                        'codigo',
                        'total',
                        'proveedor_codigo',
                        'usuario_codigo',
                    ]));
                    return response()->json(["mensaje"=>"Compra registrada"]);
                }catch(ValidationException $e){
                    return response()->json(["error"=>$e->errors()]);
                }catch(QueryException $e){
                    return response()->json(["error"=>$e->getMessage()]);
                }catch(\Exception $e){
                    return response()->json(["error"=>$e->getMessage()]);
                }
            break;
            case 'compra_ultimo_codigo':
                try{
                    $codigo = Compra::orderBy('codigo','desc')->value('codigo');
                    if($codigo != null){
                        return response()->json(["mensaje"=>$codigo]);
                    }else{
                        return response()->json(["mensaje1"=>"No hay compras registradas"]);
                    }
                }catch(\Exception $e){
                    return response()->json(["error"=>$e->getMessage()]);
                }
            break;
            case 'compra_obtener_usuario':
                try {
                    $usuario_codigo = session('codigo_usuario');

                    if ($usuario_codigo) {
                        return response()->json(["mensaje" => $usuario_codigo]);
                    } else {                        
                        return response()->json(["error" => "Usuario no autenticado"]);
                    }
                } catch (\Exception $e) {
                    return response()->json(["error" => $e->getMessage()]);
                }
            break;
            case 'compra_listar':
                try{
                    $registros = CompraDetalle::with([
                        'producto',
                        'compra.proveedor',
                        'compra.usuario'
                    ])
                    ->orderBy('compra_codigo', 'desc') // evita ordenar por columnas inexistentes
                    ->get();

                    return response()->json(["mensaje" => $registros]);
                }catch(\Exception $e){
                    return response()->json(["error"=>$e->getMessage()]);
                }
            break;
            default:
            break;
        }
    }

    public function vista(){
        return view('compra');
    }
    public function vista_realizada(){
        $usuarios = Usuario::all();
        return view('compra_realizada', compact('usuarios'));
    }
}