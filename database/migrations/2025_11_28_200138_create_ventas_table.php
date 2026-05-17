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
        Schema::create('ventas', function (Blueprint $table) {
            $table->char('codigo', 7)->primary(); // VEN0001
            $table->dateTime('fecha')->useCurrent(); // fecha en la que se realiza la venta
            $table->decimal('total', 19, 2); // VentaTotal
            $table->char('usuario_codigo', 7); // VentaUsuarioCodigo

            $table->timestamps();

            // llaves foráneas
            $table->foreign('usuario_codigo')->references('codigo')->on('usuarios')->onUpdate('cascade')->onDelete('restrict');
        });
        DB::statement("ALTER TABLE ventas ADD CONSTRAINT VentaTotalCK CHECK (total > 0)");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ventas');
    }
};