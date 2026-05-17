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
        Schema::create('productos', function (Blueprint $table) {
            $table->char('codigo', 16)->primary();
            $table->string('nombre', 50);
            $table->string('descripcion', 100);
            $table->decimal('precio_unitario', 19,2);
            $table->char('estado', 1)->default('A');
            $table->char('tipo_producto_codigo', 7);
            $table->timestamps();

            $table->foreign('tipo_producto_codigo')->references('codigo')->on('tipo_productos')->onUpdate('cascade')->onDelete('restrict');            
        });

        //restricciones
        DB::statement("ALTER TABLE productos ADD CONSTRAINT ProductoEstadoCK CHECK (estado IN ('A','E'))");
        DB::statement("ALTER TABLE productos ADD CONSTRAINT ProductoPrecioCK CHECK (precio_unitario > 0)");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('productos');
    }
};
