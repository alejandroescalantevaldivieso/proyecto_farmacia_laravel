<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Empleado;
use App\Models\Rol;

class Usuario extends Model
{
    protected $table = 'usuarios';
    protected $primaryKey = 'codigo';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable =[
        'codigo',
        'nombre',
        'contrasena',
        'estado',
        'empleado_codigo',
        'rol_codigo',
    ];

    public function empleado(){
        return $this->belongsTo(Empleado::class, 'empleado_codigo', 'codigo');
    }
    public function rol(){
        return $this->belongsTo(Rol::class, 'rol_codigo', 'codigo');
    }

}
