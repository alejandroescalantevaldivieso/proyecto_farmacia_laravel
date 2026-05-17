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
        Schema::create('venta_detalles', function (Blueprint $table) {
            $table->id();            
            $table->decimal('cantidad', 19, 2); 
            $table->decimal('precio_unitario', 19, 2); 
            $table->decimal('subtotal', 19, 2); 
            $table->string('lote', 50); 
            $table->char('producto_codigo', 16); 
            $table->char('venta_codigo', 7); 

            // llaves foráneas
            $table->foreign('producto_codigo')->references('codigo')->on('productos')->onUpdate('cascade')->onDelete('restrict');
            $table->foreign('venta_codigo')->references('codigo')->on('ventas')->onUpdate('cascade')->onDelete('restrict');
        });
        DB::statement("ALTER TABLE venta_detalles ADD CONSTRAINT VentaDetalleCantidadCK CHECK (cantidad > 0)");
        DB::statement("ALTER TABLE venta_detalles ADD CONSTRAINT VentaDetallePrecioUnitarioCK CHECK (precio_unitario > 0)");
        DB::statement("ALTER TABLE venta_detalles ADD CONSTRAINT VentaDetalleSubTotalCK CHECK (subtotal > 0)");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('venta_detalles');
    }
};