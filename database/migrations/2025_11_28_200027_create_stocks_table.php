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
    Schema::create('stocks', function (Blueprint $table) {
        $table->id();
        $table->string('lote', 50)->default('SIN');
        $table->date('fecha_vencimiento')->default('9999-12-31');
        $table->decimal('cantidad', 19,2);
        $table->date('fecha_ingreso')->useCurrent();
        $table->char('producto_codigo', 16);
        $table->timestamps();

        $table->foreign('producto_codigo')->references('codigo')->on('productos')->onUpdate('cascade')->onDelete('restrict');
    });
    DB::statement("ALTER TABLE stocks ADD CONSTRAINT StockCantidadCK CHECK (cantidad >= 0)");
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stocks');
    }
};