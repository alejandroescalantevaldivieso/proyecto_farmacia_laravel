<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Proveedor;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\QueryException;

class ProveedorController extends Controller
{
    public function opciones_crud(Request $request){
        $Accion = $request->input('accion');
        if($Accion == null){
            return response()->json(["error"=>"No hay una Accion"]);
        }

        switch($Accion){
            case 'proveedor_registrar':
                try{
                    $datos_validados = $request->validate([
                        'codigo'=>'required',
                        'razon_social'=>'required',
                        'correo'=>'required',
                        'numero_telefono'=>'required'
                    ]);
                    Proveedor::create($datos_validados);
                    return response()->json(["mensaje"=>"Proveedor registrado"]);
                }catch(ValidationException $e){
                    return response()->json(["error"=>$e->errors()]);
                }catch(QueryException $e){
                    return response()->json(["error"=>$e->getMessage()]);
                }catch(\Exception $e){
                    return response()->json(["error"=>$e->getMessage()]);
                }
            break;
            case 'proveedor_actualizar':
                try{
                    $datos_validados = $request->validate([
                        'codigo'=>'required',
                        'razon_social'=>'required',
                        'correo'=>'required',
                        'numero_telefono'=>'required'
                    ]);
                    $proveedor=Proveedor::findOrFail($datos_validados['codigo']);
                    $proveedor->update($datos_validados);
                    return response()->json(["mensaje"=>"Proveedor actualizado"]);
                }catch(ValidationException $e){
                    return response()->json(["error"=>$e->errors()]);
                }catch(QueryException $e){
                    return response()->json(["error"=>$e->getMessage()]);
                }catch(\Exception $e){
                    return response()->json(["error"=>$e->getMessage()]);
                }
            break;
            case 'proveedor_eliminar':
                try{
                    $datos_validados = $request->validate([
                        'codigo'=>'required'
                    ]);
                    $proveedor = Proveedor::findOrFail($datos_validados['codigo']);
                    $proveedor->estado = 'E';
                    $proveedor->save();
                    return response()->json(["mensaje"=>"Proveedor eliminado"]);
                }catch(ValidationException $e){
                    return response()->json(["error"=>$e->errors()]);
                }catch(QueryException $e){
                    return response()->json(["error"=>$e->getMessage()]);
                }catch(\Exception $e){
                    return response()->json(["error"=>$e->getMessage()]);
                }
            break;
            case 'proveedor_recuperar':
                try{
                    $datos_validados = $request->validate([
                        'codigo'=>'required'
                    ]);
                    $proveedor = Proveedor::findOrFail($datos_validados['codigo']);
                    $proveedor->estado= 'A';
                    $proveedor->save();
                    return response()->json(["mensaje"=>"Proveedor recuperado"]);
                }catch(ValidationException $e){
                    return response()->json(["error"=>$e->errors()]);
                }catch(QueryException $e){
                    return response()->json(["error"=>$e->getMessage()]);
                }catch(\Exception $e){
                    return response()->json(["error"=>$e->getMessage()]);
                }
            break;
            case 'proveedor_listar':
                try{
                    $proveedores = Proveedor::where('estado','=','A')->get();
                    if(count($proveedores) > 0){
                        return response()->json(["mensaje"=>$proveedores]);
                    }else{
                        return response()->json(["mensaje1"=>"No hay proveedores registrados"]);
                    }
                }catch(\Exception $e){
                    return response()->json(["error"=>$e->getMessage()]);
                }
            break;
            case 'proveedor_listar_eliminado':
                try{    
                    $proveedores = Proveedor::where('estado','=','E')->get();
                    if(count($proveedores) > 0){
                        return response()->json(["mensaje"=>$proveedores]);
                    }else{
                        return response()->json(["mensaje1"=>"No hay proveedores eliminados"]);
                    }
                }catch(\Exception $e){
                    return response()->json(["error"=>$e->getMessage()]);
                }
            break;
            case 'proveedor_ultimo_codigo':
                try{
                    $codigo = Proveedor::orderBy('codigo','desc')->value('codigo');
                    if($codigo != null){
                        return response()->json(["mensaje"=>$codigo]);
                    }else{
                        return response()->json(["mensaje1"=>"No hay proveedores registrados"]);
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
        return view('proveedor');
    }
}