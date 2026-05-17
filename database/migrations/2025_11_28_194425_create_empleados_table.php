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
        Schema::create('empleados', function (Blueprint $table) {
            $table->char('codigo', 7)->primary();//EMP0001
            $table->string('nombre', 50);
            $table->string('apellido_paterno', 50);
            $table->string('apellido_materno', 50);
            $table->date('fecha_nacimiento');
            $table->char('numero_telefono', 9);
            $table->string('correo', 100)->unique();
            $table->string('tipo_documento', 50);
            $table->string('numero_documento', 12);
            $table->char('estado', 1)->default('A');

            $table->timestamps();
        });
        //Restricciones
        DB::statement("ALTER TABLE empleados ADD CONSTRAINT EmpleadoTipoDocumentoCK CHECK (tipo_documento IN ('DNI', 'PASAPORTE'))");
        DB::statement("ALTER TABLE empleados ADD CONSTRAINT EmpleadoEstadoCK CHECK (estado IN ('A', 'E'))");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('empleados');
    }
};
