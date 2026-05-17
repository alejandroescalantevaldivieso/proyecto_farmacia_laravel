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
        Schema::create('proveedores', function (Blueprint $table) {
            $table->char('codigo', 7)->primary();//PRV0001
            $table->string('razon_social', 50);
            $table->string('correo', 100)->default('SIN');
            $table->char('numero_telefono', 9);
            $table->char('estado', 1)->default('A');
            $table->timestamps();

        });

        //restricciones
        DB::statement("ALTER TABLE proveedores ADD CONSTRAINT ProveedorEstadoCK CHECK (estado IN ('A', 'E'))");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('proveedores');
    }
};
