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
        Schema::create('tipo_productos', function (Blueprint $table) {
            $table->char('codigo', 7)->primary();//TIP0001
            $table->string('nombre', 50)->unique();
            $table->string('descripcion', 100);
            $table->char('estado', 1)->default('A');
            $table->timestamps();
        });
        //restricciones
        DB::statement("ALTER TABLE tipo_productos ADD CONSTRAINT TipoProductoEstadoCK CHECK (estado IN ('A', 'E')) ");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tipo_productos');
    }
};