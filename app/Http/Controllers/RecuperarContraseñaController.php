<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Hash;
use App\Models\Empleado;
use App\Models\Usuario;
use Illuminate\Support\Facades\Mail;//Para trabajar con correo

class RecuperarContraseñaController extends Controller
{

    public function validar_correo(Request $request){
        try{
            $correo = trim($request->input('correo'));
            if(!$correo){
                return response()->json(["mensaje1"=>"Correo vacio"]);
            }
    
            $empleado = Empleado::where('correo','=',$correo)->first();
            
            if(!$empleado){
                return response()->json(["mensaje1"=>"El correo no es valido"]);            
            }
    
            $usuario = Usuario::where('empleado_codigo','=',$empleado->codigo)->where('estado','=','A')->first();
            
            if(!$usuario){
                return response()->json(["mensaje1"=>"El empleado no tiene un usuario"]);            
            }
            //Generar codigo
            $codigo_generado = rand(100000,999999);
    
            //enviamos el correo
            Mail::raw("Tu código de verificación es: $codigo_generado", function($message) use ($correo){
                $message->to($correo);//destinatario
                $message->subject("codigo de verificación");//asunto
            });
    
            return response()->json([
                "mensaje"=>"Codigo enviado",
                "usuario_codigo"=>$usuario->codigo,
                "codigo_generado"=>$codigo_generado
            ]);
        }catch(\Exception $e){
            return response()->json(["error"=>$e->getMessage()]);
        }


    }

    public function cambiar_contraseña(Request $request){
        try{
            $datos_validados = $request->validate([
                'codigo'=>'required',
                'contrasena'=>'required'
            ]);

            $usuario = Usuario::where('codigo','=',$datos_validados['codigo'])->first();

            if(!$usuario){
                return response()->json(["mensaje1"=>"No puedes cambiar de contraseña"]);
            }

            $usuario->contrasena = Hash::make($datos_validados['contrasena']);
            $usuario->save();
            return response()->json(["mensaje"=>"Contraseña cambiada"]);
        }catch(ValidationException $e){
            return response()->json(["error"=>$e->errors()]);
        }catch(QueryException $e){
            return response()->json(["error"=>$e->getMessage()]);
        }catch(\Exception $e){
            return response()->json(["error"=>$e->getMessage()]);
        }
    }


    public function vista_validar_correo(){
        return view('RecuperarContraseña/validar_correo');
    }
    public function vista_validar_codigo(){
        return view('RecuperarContraseña/validar_codigo');
    }
    public function vista_cambiar_contraseña(){
        return view('RecuperarContraseña/cambiar_contraseña');
    }
}
