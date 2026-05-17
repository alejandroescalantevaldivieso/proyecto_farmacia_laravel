<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\Usuario;

class LoginController extends Controller
{
    public function iniciar_sesion(Request $request){
        try {
            $datos = $request->validate([
                'nombre' => 'required',
                'contrasena' => 'required'
            ]);

            // Traer usuario + datos del rol
            $usuario = Usuario::with('rol')->where('nombre','=',$datos['nombre'])->where('estado','=','A')->first();

            if (!$usuario) {
                return response()->json(["mensaje1" => "Usuario no existe"]);
            }

            if (!Hash::check($datos['contrasena'], $usuario->contrasena)) {
                return response()->json(["mensaje1" => "Contraseña incorrecta"]);
            }

            // Guardar datos de sesión
            session([
                'codigo_usuario' => $usuario->codigo,
                'nombre_usuario' => $usuario->nombre,
                'nombre_rol'    => $usuario->rol->nombre,
                'codigo_rol'     => $usuario->rol->codigo
            ]);

            return response()->json([
                "mensaje" => "Bienvenido " . $usuario->nombre,
                "rol" => $usuario->rol->nombre ?? null
            ]);

        } catch (\Exception $e) {
            return response()->json(["error" => $e->getMessage()]);
        }
    }

    public function cerrar_sesion(){
        try{
            session()->flush();
            return response()->json(["mensaje"=>"Sesión cerrada"]);
        }catch(\Exception $e){
            return response()->json(["error"=>$e->getMessage()]);
        }
    }


    public function vista_login(){
        return view('login');
    }
}
