<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Stock;


class StockController extends Controller
{
    public function opciones_crud(Request $request){
        $accion = $request->input('accion');
        if($accion == null){
            return response()->json(["error"=>"No hay una accion"]);
        }

        switch($accion){
            case 'stock_listar':
                try{
                    $stocks = Stock::with('producto')->get();
                    if(count($stocks) > 0){
                        return response()->json(["mensaje"=>$stocks]);
                    }else{
                        return response()->json(["mensaje1"=>"No hay stocks registrados"]);
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
        return view('stock');
    }
}