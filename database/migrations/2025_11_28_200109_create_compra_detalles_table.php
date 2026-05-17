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
        Schema::create('compra_detalles', function (Blueprint $table) {
            $table->id();
            $table->decimal('cantidad', 19, 2);
            $table->decimal('precio_unitario', 19, 2);
            $table->decimal('subtotal', 19, 2);
            $table->string('lote', 50)->default('SIN');
            $table->date('fecha_vencimiento')->default('9999-12-31');
            $table->dateTime('fecha_ingreso')->useCurrent(); // no se ingresa desde el front
            $table->char('producto_codigo', 16);
            $table->char('compra_codigo', 7);

            // llaves foráneas
            $table->foreign('producto_codigo')->references('codigo')->on('productos')->onUpdate('cascade')->onDelete('restrict');
            $table->foreign('compra_codigo')->references('codigo')->on('compras')->onUpdate('cascade')->onDelete('restrict');
        });
        DB::statement("ALTER TABLE compra_detalles ADD CONSTRAINT CompraDetalleCantidadCK CHECK (cantidad > 0)");
        DB::statement("ALTER TABLE compra_detalles ADD CONSTRAINT CompraDetallePrecioUnitarioCK CHECK (precio_unitario > 0)");
        DB::statement("ALTER TABLE compra_detalles ADD CONSTRAINT CompraDetalleSubTotalCK CHECK (subtotal > 0)");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('compra_detalles');
    }
};