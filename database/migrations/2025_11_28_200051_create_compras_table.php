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
        Schema::create('compras', function (Blueprint $table) {
            $table->char('codigo', 7)->primary(); // COM0001
            $table->dateTime('fecha')->useCurrent(); // Fecha en que se realizo la compra
            $table->decimal('total', 19, 2); 
            $table->char('proveedor_codigo', 7); 
            $table->char('usuario_codigo', 7); 

            $table->timestamps();

            $table->foreign('proveedor_codigo')->references('codigo')->on('proveedores')->onUpdate('cascade')->onDelete('restrict');
            $table->foreign('usuario_codigo')->references('codigo')->on('usuarios')->onUpdate('cascade')->onDelete('restrict');
        });
        // restricciones
        DB::statement("ALTER TABLE compras ADD CONSTRAINT CompraTotalCK CHECK (total > 0)");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('compras');
    }
};