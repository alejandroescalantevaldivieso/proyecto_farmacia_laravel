<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Usuario;
use App\Models\VentaDetalle;

class Venta extends Model
{
    protected $table = 'ventas'; 
    protected $primaryKey = 'codigo';
    public $incrementing = false;
    protected $keyType = 'string';   

    protected $fillable = [
        'codigo',
        'fecha',
        'total',
        'usuario_codigo',
    ];

    protected $casts = [
        'fecha' => 'datetime',
        'total' => 'decimal:2',
    ];

    public function usuario() { 
        return $this->belongsTo(Usuario::class, 'usuario_codigo', 'codigo');
    }

    public function detalles() { 
        return $this->hasMany(VentaDetalle::class, 'venta_codigo', 'codigo');
     }

}