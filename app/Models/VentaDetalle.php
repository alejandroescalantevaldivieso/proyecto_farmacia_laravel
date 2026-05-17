<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Producto;
use App\Models\Venta;

class VentaDetalle extends Model
{
    protected $table = 'venta_detalles';    
    public $timestamps = false;

    protected $fillable = [
        'cantidad',
        'precio_unitario',
        'subtotal',
        'lote',
        'producto_codigo',
        'venta_codigo',
    ];

    protected $casts = [
        'cantidad' => 'decimal:2',
        'precio_unitario' => 'decimal:2',
        'subtotal' => 'decimal:2',
    ];

    public function producto(){
        return $this->belongsTo(Producto::class, 'producto_codigo', 'codigo');
    }

    public function venta(){
        return $this->belongsTo(Venta::class, 'venta_codigo', 'codigo');
    }
}