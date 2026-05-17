<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Producto;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\QueryException;

class ProductoController extends Controller
{
    public function opciones_crud(Request $request){
        $Accion = $request->input('accion');
        if($Accion == null){
            return response()->json(["error"=>"No hay una Accion"]);
        }

        switch($Accion){
            case 'producto_registrar':
                try{
                    $datos_validados = $request->validate([
                        'codigo'=>'required',
                        'nombre'=>'required',
                        'descripcion'=>'required',
                        'precio_unitario'=>'required',
                        'tipo_producto_codigo'=>'required'
                    ]);
                    Producto::create($datos_validados);
                    return response()->json(["mensaje"=>"Producto registrado"]);
                }catch(ValidationException $e){
                    return response()->json(["error"=>$e->errors()]);
                }catch(QueryException $e){
                    return response()->json(["error"=>$e->getMessage()]);
                }catch(\Exception $e){
                    return response()->json(["error"=>$e->getMessage()]);
                }
            break;
            case 'producto_actualizar':
                try{
                    $datos_validados = $request->validate([
                        'codigo'=>'required',
                        'nombre'=>'required',
                        'descripcion'=>'required',
                        'precio_unitario'=>'required',
                        'tipo_producto_codigo'=>'required',
                    ]);
                    $producto=Producto::findOrFail($datos_validados['codigo']);
                    $producto->update($datos_validados);
                    return response()->json(["mensaje"=>"Producto actualizado"]);
                }catch(ValidationException $e){
                    return response()->json(["error"=>$e->errors()]);
                }catch(QueryException $e){
                    return response()->json(["error"=>$e->getMessage()]);
                }catch(\Exception $e){
                    return response()->json(["error"=>$e->getMessage()]);
                }
            break;
            case 'producto_eliminar':
                try{
                    $datos_validados = $request->validate([
                        'codigo'=>'required'
                    ]);
                    $producto = Producto::findOrFail($datos_validados['codigo']);
                    $producto->estado = 'E';
                    $producto->save();
                    return response()->json(["mensaje"=>"Producto eliminado"]);
                }catch(ValidationException $e){
                    return response()->json(["error"=>$e->errors()]);
                }catch(QueryException $e){
                    return response()->json(["error"=>$e->getMessage()]);
                }catch(\Exception $e){
                    return response()->json(["error"=>$e->getMessage()]);
                }
            break;
            case 'producto_recuperar':
                try{
                    $datos_validados = $request->validate([
                        'codigo'=>'required'
                    ]);
                    $producto = Producto::findOrFail($datos_validados['codigo']);
                    $producto->estado= 'A';
                    $producto->save();
                    return response()->json(["mensaje"=>"Producto recuperado"]);
                }catch(ValidationException $e){
                    return response()->json(["error"=>$e->errors()]);
                }catch(QueryException $e){
                    return response()->json(["error"=>$e->getMessage()]);
                }catch(\Exception $e){
                    return response()->json(["error"=>$e->getMessage()]);
                }
            break;
            case 'producto_listar':
                try{
                    $productos = Producto::where('estado','=','A')->get();
                    if(count($productos) > 0){
                        return response()->json(["mensaje"=>$productos]);
                    }else{
                        return response()->json(["mensaje1"=>"No hay productos registrados"]);
                    }
                }catch(\Exception $e){
                    return response()->json(["error"=>$e->getMessage()]);
                }
            break;
            case 'producto_listar_con_stock':
                try{
                    $productos = Producto::where('estado', 'A')
                        ->with(['stocks'])
                        ->whereHas('stocks', function($q){
                            $q->where('cantidad', '>', 0);
                        })
                        ->get();

                    return response()->json(["mensaje" => $productos]);

                }catch(\Exception $e){
                    return response()->json(["error"=>$e->getMessage()]);
                }
            break;

            case 'producto_listar_eliminado':
                try{    
                    $productos = Producto::where('estado','=','E')->get();
                    if(count($productos) > 0){
                        return response()->json(["mensaje"=>$productos]);
                    }else{
                        return response()->json(["mensaje1"=>"No hay productos eliminados"]);
                    }
                }catch(\Exception $e){
                    return response()->json(["error"=>$e->getMessage()]);
                }
            break;
            case 'producto_ultimo_codigo':
                try{
                    $codigo = Producto::orderBy('codigo','desc')->value('codigo');
                    if($codigo != null){
                        return response()->json(["mensaje"=>$codigo]);
                    }else{
                        return response()->json(["mensaje1"=>"No hay productos registrados"]);
                    }
                }catch(\Exception $e){
                    return response()->json(["error"=>$e->getMessage()]);
                }
            break;
            default:
            break;
        }
    }

    public function vista(){
        return view('producto');
    }
}