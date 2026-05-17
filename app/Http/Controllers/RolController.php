<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Rol;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\QueryException;

class RolController extends Controller
{
    public function opciones_crud(Request $request){
        $accion = $request->input('accion');
        if($accion == null){
            return response()->json(["error"=>"No hay una accion"]);
        }
        switch($accion){
            case 'rol_registrar':
            break;
            case 'rol_actualizar':
            break;
            case 'rol_eliminar':
            break;
            case 'rol_recuperar':
            break;
            case 'rol_listar':
                try{
                    $rol = Rol::where('estado','=','A')->get();
                    if(count($rol) > 0){
                        return response()->json(['mensaje'=>$rol]);
                    }else{
                        return response()->json(['mensaje1'=>'No hay roles']);
                    }
                }catch(\Exception $e){
                    return response()->json(["error"=>$e->getMessage()]);
                }
            break;
            case 'rol_listar_eliminado':
            break;
            default:
                return response()->json(["error"=>"Accion no es valida"]);
            break;
        }
    }
}
