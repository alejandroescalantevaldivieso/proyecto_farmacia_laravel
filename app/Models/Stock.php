<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Producto;

class Stock extends Model
{
    protected $table = 'stocks';
    
    protected $fillable =[
        'lote',
        'fecha_vencimiento',
        'cantidad',
        'fecha_ingreso',
        'producto_codigo',
    ];

    public function producto(){
        return $this->belongsTo(Producto::class, 'producto_codigo', 'codigo');
    }
}