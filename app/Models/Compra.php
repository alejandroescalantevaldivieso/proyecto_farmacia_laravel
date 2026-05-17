<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Proveedor;
use App\Models\Usuario;

class Compra extends Model
{
    protected $table = 'compras';
    protected $primaryKey = 'codigo';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'codigo',
        'fecha',
        'total',
        'proveedor_codigo',
        'usuario_codigo',
    ];

    protected $casts = [
        'fecha' => 'date:Y-m-d',
        'total' => 'decimal:2',
    ];

    public function proveedor()
    {
        return $this->belongsTo(Proveedor::class, 'proveedor_codigo', 'codigo');
    }

    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'usuario_codigo', 'codigo');
    }
    public function detalles()
    {
        return $this->hasMany(CompraDetalle::class, 'compra_codigo', 'codigo');
    }
}
