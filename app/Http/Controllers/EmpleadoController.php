<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Empleado;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\QueryException;

class EmpleadoController extends Controller
{
    public function opciones_crud(Request $request){        
        $accion = $request->input('accion');
        if(!$accion){
            return response()->json(["error"=>"No hay accion"]);
        }

        switch($accion){
            case 'empleado_registrar':
                try{
                    $datos_validados = $request->validate([
                        'codigo'=>'required',
                        'nombre'=>'required',
                        'apellido_paterno'=>'required',
                        'apellido_materno'=>'required',
                        'fecha_nacimiento'=>'required|date',
                        'numero_telefono'=>'required',
                        'correo'=>'required|email',
                        'tipo_documento'=>'required',
                        'numero_documento'=>'required'
                    ]);                
                    Empleado::create($datos_validados);
                    return response()->json(["mensaje"=>"Empleado registrado"]);
                }catch(ValidationException $e){
                    return response()->json(["error"=>$e->errors()]);
                }catch(QueryException $e){
                    return response()->json(["error"=>$e->getMessage()]);
                }catch(\Exception $e){
                    return response()->json(["error"=>$e->getMessage()]);
                }     
            break;
            case 'empleado_actualizar':
                try{
                    $datos_validados = $request->validate([
                        'codigo'=>'required',
                        'nombre'=>'required',
                        'apellido_paterno'=>'required',
                        'apellido_materno'=>'required',
                        'fecha_nacimiento'=>'required',
                        'numero_telefono'=>'required',
                        'correo'=>'required',
                        'tipo_documento'=>'required',
                        'numero_documento'=>'required'
                    ]);
                    $empleado = Empleado::findOrFail($datos_validados['codigo']);
                    $empleado->update($datos_validados);
                    return response()->json(["mensaje"=>"Empleado actualizado"]);
                }catch(ValidationException $e){
                    return response()->json(["error"=>$e->errors()]);
                }catch(QueryException $e){
                    return response()->json(["error"=>$e->getMessage()]);
                }catch(\Exception $e){
                    return response()->json(["error"=>$e->getMessage()]);
                }
            break;
            case 'empleado_eliminar':
                try{
                    $data = $request->validate([
                        'codigo'=>'required'
                    ]);
                    $empleado = Empleado::findOrFail($data['codigo']);
                    $empleado->estado= 'E';
                    $empleado->save();
                    return response()->json(["mensaje"=>"Empleado eliminado"]);
                }catch(ValidationException $e){
                    return response()->json(["error"=>$e->errors()]);
                }catch(QueryException $e){
                    return response()->json(["error"=>$e->getMessage()]);
                }catch(\Exception $e){
                    return response()->json(["error"=>$e->getMessage()]);
                }
            break;
            case 'empleado_recuperar':
                try{
                    $data = $request->validate([
                        'codigo'=>'required'
                    ]);
                    $empleado = Empleado::findOrFail($data['codigo']);
                    $empleado->estado= 'A';
                    $empleado->save();
                    return response()->json(["mensaje"=>"Empleado recuperado"]);
                }catch(ValidationException $e){
                    return response()->json(["error"=>$e->errors()]);
                }catch(QueryException $e){
                    return response()->json(["error"=>$e->getMessage()]);
                }catch(\Exception $e){
                    return response()->json(["error"=>$e->getMessage()]);
                }
            break;
            case 'empleado_listar':
                try{
                    $empleados = Empleado::where('estado','=','A')->get();
                    if(count($empleados) > 0){
                        return response()->json(["mensaje"=>$empleados]);
                    }else{
                        return response()->json(["mensaje1"=>"Lista empleados activos vacia"]);
                    }
                }catch(\Exception $e){
                    return response()->json(["error"=>$e->getMessage()]);
                }
            break;
            case 'empleado_listar_eliminado':
                try{
                    $empleados = Empleado::where('estado','=','E')->get();
                    if(count($empleados) > 0){
                        return response()->json(["mensaje"=>$empleados]);
                    }else{
                        return response()->json(["mensaje1"=>"Lista empleados eliminados vacia"]);
                    }
                }catch(\Exception $e){
                    return response()->json(["error"=>$e->getMessage()]);
                }
            break;
            case 'empleado_ultimo_codigo':
                try{
                    $codigo = Empleado::orderBy('codigo','desc')->value('codigo');//con ->value optiene solo el codigo del primer registro
                    if($codigo == null){
                        return response()->json(['mensaje1'=>'No hay empleados']);
                    }else{
                        return response()->json(['mensaje'=>$codigo]);
                    }
                }catch(\Exception $e){
                    return response()->json(["error"=>$e->getMessage()]);
                }
            break;
            default:
                return response()->json(["error"=>"Acion no valida"]);
            break;
        }

    }
    public function vista(){
        return view('empleado');
    }
}
