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
        DB::unprepared(
            <<<SQL
                CREATE TRIGGER trg_stock_aumentar
                    AFTER INSERT
                    ON compra_detalles
                    FOR EACH ROW
                BEGIN
                    DECLARE cantidad_actual NUMERIC(19,2);
                    IF EXISTS (
                        SELECT 1 FROM stocks 
                        WHERE lote = NEW.lote AND
                        fecha_vencimiento = NEW.fecha_vencimiento AND 
                        producto_codigo = NEW.producto_codigo
                    )THEN
                        -- Obtenemos el valor de cantidad
                        SELECT cantidad INTO cantidad_actual FROM stocks 
                        WHERE lote = NEW.lote AND
                        fecha_vencimiento = NEW.fecha_vencimiento AND
                        producto_codigo = NEW.producto_codigo;
                            
                        -- Actualizamos el stock sumando la cantidad 
                        UPDATE stocks
                        SET
                        cantidad = cantidad_actual + NEW.cantidad
                            WHERE lote = NEW.lote AND
                            fecha_vencimiento = NEW.fecha_vencimiento AND
                            producto_codigo = NEW.producto_codigo; 
                    ELSE
                        INSERT INTO stocks
                        (
                        lote, 
                        fecha_vencimiento, 
                        cantidad,     
                        producto_codigo
                        )
                        VALUES
                        (
                        NEW.lote, 
                        NEW.fecha_vencimiento, 
                        NEW.cantidad,     
                        NEW.producto_codigo
                        );
                    END IF;	
                END
            SQL
        );

        DB::unprepared(
            <<<SQL
                CREATE TRIGGER trg_stock_disminuir
                AFTER INSERT ON venta_detalles
                FOR EACH ROW
                BEGIN
                    DECLARE done INT DEFAULT 0;
                    DECLARE cantidad_fila DECIMAL(19,2);
                    DECLARE fecha_fila DATE;

                    DECLARE cantidad_restante DECIMAL(19,2);

                    -- Cursor para iterar FIFO por fecha_vencimiento
                    DECLARE curStock CURSOR FOR
                        SELECT cantidad, fecha_vencimiento
                        FROM stocks
                        WHERE lote = NEW.lote
                        AND producto_codigo = NEW.producto_codigo
                        ORDER BY fecha_vencimiento ASC;

                    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;

                    -- cantidad a descontar
                    SET cantidad_restante = NEW.cantidad;

                    OPEN curStock;

                    stock_loop: LOOP

                        FETCH curStock INTO cantidad_fila, fecha_fila;

                        IF done = 1 THEN
                            LEAVE stock_loop;
                        END IF;

                        -- Si el stock actual cubre todo lo que necesito
                        IF cantidad_fila >= cantidad_restante THEN
                        
                            UPDATE stocks
                            SET cantidad = cantidad_fila - cantidad_restante
                            WHERE lote = NEW.lote
                            AND producto_codigo = NEW.producto_codigo
                            AND fecha_vencimiento = fecha_fila;

                            SET cantidad_restante = 0;
                            LEAVE stock_loop;
                        
                        ELSE
                            -- No alcanza → dejar esta fila en cero
                            UPDATE stocks
                            SET cantidad = 0
                            WHERE lote = NEW.lote
                            AND producto_codigo = NEW.producto_codigo
                            AND fecha_vencimiento = fecha_fila;

                            -- Descontar lo que faltó
                            SET cantidad_restante = cantidad_restante - cantidad_fila;
                        END IF;

                    END LOOP;

                    CLOSE curStock;

                END
            SQL
        );
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::unprepared('DROP TRIGGER trg_stock_aumentar;');
        DB::unprepared('DROP TRIGGER trg_stock_disminuir;');
    }
};
