<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\TipoProducto;

class Producto extends Model
{
    protected $table = 'productos';
    protected $primaryKey = 'codigo';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'codigo',
        'nombre',
        'descripcion',
        'precio_unitario',
        'estado',
        'tipo_producto_codigo',
    ];

    public function tipo_producto(){
        return $this->belongsTo(TipoProducto::class, 'tipo_producto_codigo', 'codigo');
    }

    public function stocks(){
        return $this->hasMany(Stock::class, 'producto_codigo', 'codigo');
    }
}