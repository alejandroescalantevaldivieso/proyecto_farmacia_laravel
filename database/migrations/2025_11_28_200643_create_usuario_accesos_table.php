<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('usuario_accesos', function (Blueprint $table) {
            $table->id();
            $table->string('direccion_ip', 50);
            $table->string('navegador', 500);
            $table->dateTime('fecha')->useCurrent();
            $table->char('usuario_codigo', 7);
            // llave foránea
            $table->foreign('usuario_codigo')->references('codigo')->on('usuarios')->onUpdate('cascade')->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('usuario_accesos');
    }
};
