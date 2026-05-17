<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Empleado extends Model
{
    protected $table = 'empleados';
    protected $primaryKey = 'codigo';//clave primaria
    public $incrementing = false;//la pk no es autoincremental
    protected $keyType = 'string';//la pk es string

    //campos que se pueden llenar
    protected $fillable = [
    'codigo',
    'nombre',
    'apellido_paterno',
    'apellido_materno',
    'fecha_nacimiento',
    'numero_telefono',
    'correo',
    'tipo_documento',
    'numero_documento',
    'estado',    
    ];
    
}
