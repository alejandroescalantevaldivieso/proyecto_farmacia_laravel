<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Usuario;

class UsuarioAcceso extends Model
{
    protected $table = 'usuario_accesos';   
    public $timestamps = false;

    protected $fillable = [        
        'direccion_ip',
        'navegador',
        'fecha',
        'usuario_codigo',
    ];

    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'usuario_codigo', 'codigo');
    }
}
