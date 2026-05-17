<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('usuarios', function (Blueprint $table) {
            $table->char('codigo', 7)->primary();//USU0001
            $table->string('nombre', 50)->unique();
            $table->string('contrasena', 250)->unique();
            $table->char('estado', 1)->default('A');
            $table->char('empleado_codigo', 7);
            $table->char('rol_codigo', 7);
            $table->timestamps();

            $table->foreign('empleado_codigo')->references('codigo')->on('empleados')->onUpdate('cascade')->onDelete('restrict');
            $table->foreign('rol_codigo')->references('codigo')->on('roles')->onUpdate('cascade')->onDelete('restrict');
        });
        //restricciones
        DB::statement("ALTER TABLE usuarios ADD CONSTRAINT UsuarioEstadoCK CHECK (estado IN ('A', 'E'))");
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('usuarios');
    }
};
