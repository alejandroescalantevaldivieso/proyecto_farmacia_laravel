<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TipoProducto;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\QueryException;

class TipoProductoController extends Controller
{
    public function opciones_crud(Request $request){
        $Accion = $request->input('accion');
        if($Accion == null){
            return response()->json(["error"=>"No hay una Accion"]);
        }
        switch($Accion){
            case 'tipo_producto_registrar':
                try{
                    $datos_validados = $request->validate([
                        'codigo'=>'required',
                        'nombre'=>'required',
                        'descripcion'=>'required',
                    ]);
                    TipoProducto::create($datos_validados);
                    return response()->json(["mensaje"=>"TipoProducto registrado"]);
                }catch(ValidationException $e){
                    return response()->json(["error"=>$e->errors()]);
                }catch(QueryException $e){
                    return response()->json(["error"=>$e->getMessage()]);
                }catch(\Exception $e){
                    return response()->json(["error"=>$e->getMessage()]);
                }
            break;
            case 'tipo_producto_actualizar':
                try{
                    $datos_validados = $request->validate([
                        'codigo'=>'required',
                        'nombre'=>'required',
                        'descripcion'=>'required',
                    ]);
                    $tipo_producto=TipoProducto::findOrFail($datos_validados['codigo']);
                    $tipo_producto->update($datos_validados);
                    return response()->json(["mensaje"=>"TipoProducto actualizado"]);
                }catch(ValidateException $e){
                    return response()->json(["error"=>$e->errors()]);
                }catch(QueryException $e){
                    return response()->json(["error"=>$e->getMessage()]);
                }catch(\Exception $e){
                    return response()->json(["error"=>$e->getMessage()]);
                }
            break;
            case 'tipo_producto_eliminar':
                try{
                    $datos_validados = $request->validate([
                        'codigo'=>'required'
                    ]);
                    $tipo_producto = TipoProducto::findOrFail($datos_validados['codigo']);
                    $tipo_producto->estado = 'E';
                    $tipo_producto->save();
                    return response()->json(["mensaje"=>"TipoProducto eliminado"]);
                }catch(ValidationException $e){
                    return response()->json(["error"=>$e->errors()]);
                }catch(QueryException $e){
                    return response()->json(["error"=>$e->getMessage()]);
                }catch(\Exception $e){
                    return response()->json(["error"=>$e->getMessage()]);
                }
            break;
            case 'tipo_producto_recuperar':
                try{
                    $datos_validados = $request->validate([
                        'codigo'=>'required'
                    ]);
                    $tipo_producto = TipoProducto::findOrFail($datos_validados['codigo']);
                    $tipo_producto->estado= 'A';
                    $tipo_producto->save();
                    return response()->json(["mensaje"=>"TipoProducto recuperado"]);
                }catch(ValidationException $e){
                    return response()->json(["error"=>$e->errors()]);
                }catch(QueryException $e){
                    return response()->json(["error"=>$e->getMessage()]);
                }catch(\Exception $e){
                    return response()->json(["error"=>$e->getMessage()]);
                }
            break;
            case 'tipo_producto_listar':
                try{
                    $tipo_productos = TipoProducto::where('estado','=','A')->get();
                    if(count($tipo_productos) > 0){
                        return response()->json(['mensaje'=>$tipo_productos]);
                    }else{
                        return response()->json(['mensaje1'=>'No hay tipos de productos']);
                    }
                }catch(\Exception $e){
                    return response()->json(["error"=>$e->getMessage()]);
                }
            break;
            case 'tipo_producto_listar_eliminado':
            try{
                $tipo_productos = TipoProducto::where('estado','=','E')->get();

                if(count($tipo_productos) > 0){
                    return response()->json(["mensaje"=>$tipo_productos]); // Devolvemos la lista
                }else{
                    return response()->json(["mensaje1"=>"No hay tipos de productos eliminados"]);
                }
            }catch(\Exception $e){
                return response()->json(["error"=>$e->getMessage()]);
            }
        break;
            case 'tipo_producto_ultimo_codigo':
                try{
                    $codigo = TipoProducto::orderBy('codigo','desc')->value('codigo');
                    if($codigo != null){
                        return response()->json(["mensaje"=>$codigo]);
                    }else{
                        return response()->json(["mensaje1"=>"No hay tipos de productos registrados"]);
                    }
                }catch(\Exception $e){
                    return response()->json(["error"=>$e->getMessage()]);
                }
            break;
            default:
                return response()->json(["error"=>"Accion no es valida"]);
            break;
        }
    }

    public function vista(){
        return view('tipoproducto');
    }
}
