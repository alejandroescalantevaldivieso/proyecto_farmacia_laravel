<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Producto;
use App\Models\Compra;

class CompraDetalle extends Model
{
    protected $table = 'compra_detalles';

    public $timestamps = false; 

    protected $fillable = [        
        'cantidad',
        'precio_unitario',
        'subtotal',
        'lote',
        'fecha_vencimiento',
        'fecha_ingreso',
        'producto_codigo',
        'compra_codigo',
    ];

    protected $casts = [
        'fecha_ingreso' => 'date:Y-m-d',
        'fecha_vencimiento' => 'date:Y-m-d',
        'cantidad' => 'decimal:2',
        'precio_unitario' => 'decimal:2',
        'subtotal' => 'decimal:2',
    ];

    public function producto()
    {
        return $this->belongsTo(Producto::class, 'producto_codigo', 'codigo');
    }

    public function compra()
    {
        return $this->belongsTo(Compra::class, 'compra_codigo', 'codigo');
    }
}