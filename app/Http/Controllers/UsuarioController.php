<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Usuario;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Hash;

class UsuarioController extends Controller
{
    public function opciones_crud(Request $request){
        $accion = $request->input('accion');
        if($accion == null){
            return response()->json(["error"=>"No hay una accion"]);
        }

        switch($accion){
            case 'usuario_registrar':
                try{
                    $datos_validados = $request->validate([
                        'codigo'=>'required',
                        'nombre'=>'required',
                        'contrasena'=>'required',                        
                        'empleado_codigo'=>'required',
                        'rol_codigo'=>'required'
                    ]);
                    //Hashear la contraseña antes de guardar
                    $datos_validados['contrasena'] = Hash::make($datos_validados['contrasena']);
                    Usuario::create($datos_validados);
                    return response()->json(["mensaje"=>"Usuario registrado"]);
                }catch(ValidationException $e){
                    return response()->json(["error"=>$e->errors()]);
                }catch(QueryException $e){
                    return response()->json(["error"=>$e->getMessage()]);
                }catch(\Exception $e){
                    return response()->json(["error"=>$e->getMessage()]);
                }
            break;
            case 'usuario_actualizar':
                try{    
                    $datos_validados = $request->validate([
                        'codigo'=>'required',
                        'nombre'=>'required',
                        'contrasena'=>'nullable',                        
                        'empleado_codigo'=>'required',
                        'rol_codigo'=>'required'
                    ]);
                    if(empty($datos_validados['contrasena'])){
                        unset($datos_validados['contrasena']);// No actualizar la contraseña si no se proporciona
                    }
                    //Hashear la contraseña antes de guardar
                    $datos_validados['contrasena'] = Hash::make($datos_validados['contrasena']);

                    $usuario = Usuario::findOrFail($datos_validados['codigo']);
                    $usuario->update($datos_validados);
                    return response()->json(["mensaje"=>"Usuario actualizado"]);
                }catch(ValidationException $e){
                    return response()->json(["error"=>$e->errors()]);
                }catch(QueryException $e){
                    return response()->json(["error"=>$e->getMessage()]);
                }catch(\Exception $e){
                    return response()->json(["error"=>$e->getMessage()]);
                }
            break;
            case 'usuario_eliminar':
                try{
                    $datos_validados = $request->validate([
                        'codigo'=>'required'
                    ]);
                    $usuario = Usuario::findOrFail($datos_validados['codigo']);
                    $usuario->estado = 'E';
                    $usuario->save();
                    return response()->json(["mensaje"=>"Usuario eliminado"]);
                }catch(ValidationException $e){
                    return response()->json(["error"=>$e->errors()]);
                }catch(QueryException $e){
                    return response()->json(["error"=>$e->getMessage()]);
                }catch(\Exception $e){
                    return response()->json(["error"=>$e->getMessage()]);
                }
            break;
            case 'usuario_recuperar':
                try{
                    $datos_validados = $request->validate([
                        'codigo'=>'required'
                    ]);
                    $usuario = Usuario::findOrFail($datos_validados['codigo']);
                    $usuario->estado = 'A';
                    $usuario->save();
                    return response()->json(["mensaje"=>"Usuario recuperado"]);
                }catch(ValidationException $e){
                    return response()->json(["error"=>$e->errors()]);
                }catch(QueryException $e){
                    return response()->json(["error"=>$e->getMessage()]);
                }catch(\Exception $e){
                    return response()->json(["error"=>$e->getMessage()]);
                }
            break;
            case 'usuario_listar':
                try{
                    $usuario = Usuario::with('empleado')->where('estado','=','A')->get();
                    if(count($usuario) > 0){
                        return response()->json(["mensaje"=>$usuario]);
                    }else{
                        return response()->json(["mensaje1"=>"No hay usuarios en la lista "]);
                    }
                }catch(\Exception $e){
                    return response()->json(["error"=>$e->getMessage()]);
                }
            break;
            case 'usuario_listar_eliminado':
                try{
                    $usuario = Usuario::where('estado','=', 'E')->get();
                    if(count($usuario) > 0){
                        return response()->json(["mensaje"=>$usuario]);
                    }else{
                        return response()->json(["mensaje1"=>"No hay usuarios eliminados en la lista"]);
                    }

                }catch(\Exception $e){
                    return response()->json(["error"=>$e->getMessage()]);
                }
            break;
            case 'usuario_ultimo_codigo':
                try{
                    $codigo = Usuario::orderBy('codigo','desc')->value('codigo');
                    if($codigo != null){
                        return response()->json(['mensaje'=>$codigo]);
                    }else{
                        return response()->json(['mensaje1'=>'No hay usuarios']);
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
        return view('usuario');
    }   
}
