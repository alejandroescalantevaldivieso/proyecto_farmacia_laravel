<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EmpleadoController;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\ProveedorController;
use App\Http\Controllers\RolController;
use App\Http\Controllers\TipoProductoController;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\StockController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\PrincipalController;
use App\Http\Controllers\RecuperarContraseñaController;
use App\Http\Controllers\CompraController;
use App\Http\Controllers\CompraDetalleController;
use App\Http\Controllers\VentaController;
use App\Http\Controllers\VentaDetalleController;
use App\Http\Controllers\ReporteController;

use App\Http\Controllers\ChatController;
use App\Http\Controllers\DashboardController;
use Barryvdh\DomPDF\Facade\Pdf;

//Recuperar contraseña
Route::get('/validar_correo',[RecuperarContraseñaController::class, 'vista_validar_correo']);
Route::post('/validar_correo',[RecuperarContraseñaController::class, 'validar_correo']);
Route::get('/validar_codigo', [RecuperarContraseñaController::class, 'vista_validar_codigo']);
Route::get('/cambiar_contraseña',[RecuperarContraseñaController::class, 'vista_cambiar_contraseña']);
Route::post('/cambiar_contraseña',[RecuperarContraseñaController::class, 'cambiar_contraseña']);

//Login
Route::get('/',[LoginController::class, 'vista_login']);
Route::get('/login',[LoginController::class, 'vista_login']);
Route::post('/login/validar_sesion',[LoginController::class, 'iniciar_sesion']);
Route::post('/login/cerrar_sesion',[LoginController::class, 'cerrar_sesion']);

// //Rutas protegidas por middleware
// Route::middleware('verificar_sesion')->group(function(){
    
//Principal
Route::get('/principal',[PrincipalController::class, 'vista_principal']);

//Empleado
Route::get('/empleado', [EmpleadoController::class, 'vista']);
Route::post('/control_empleado', [EmpleadoController::class, 'opciones_crud']);

//Rol
Route::get('/rol',[RolController::class, 'vista']);
Route::post('/control_rol',[RolController::class, 'opciones_crud']);

//Usuario
Route::get('/usuario',[UsuarioController::class, 'vista']);
Route::post('/control_usuario',[UsuarioController::class, 'opciones_crud']);

//Proveedor
Route::get('/proveedor',[ProveedorController::class, 'vista']);
Route::post('/control_proveedor',[ProveedorController::class, 'opciones_crud']);

//Tipo producto
Route::get('/tipo_producto',[TipoProductoController::class, 'vista']);
Route::post('/control_tipo_producto',[TipoProductoController::class, 'opciones_crud']);

//Producto
Route::get('/producto',[ProductoController::class, 'vista']);
Route::post('/control_producto',[ProductoController::class, 'opciones_crud']);

//Stock
Route::get('/stock',[StockController::class, 'vista']);
Route::post('/control_stock',[StockController::class, 'opciones_crud']);

//Compra
Route::get('/compra',[CompraController::class, 'vista']);
Route::get('/compra_realizada',[CompraController::class, 'vista_realizada']);
Route::post('/control_compra',[CompraController::class, 'opciones_crud']);

//CompraDetalle
Route::post('/control_compra_detalle',[CompraDetalleController::class, 'opciones_crud']);

//Venta
Route::get('/venta',[VentaController::class, 'vista']);
Route::get('/venta_realizada',[VentaController::class, 'vista_realizada']);
Route::post('/control_venta',[VentaController::class, 'opciones_crud']);

//VentaDetalle
Route::get('/venta_detalle',[VentaDetalleController::class, 'vista']);
Route::post('/control_venta_detalle',[VentaDetalleController::class, 'opciones_crud']);


//Reporte
Route::get('/reportes/compras/pdf', [ReporteController::class, 'ReporteComprasPDF'])->name('reportes.compras.pdf');
Route::get('/reportes/ventas/pdf', [ReporteController::class, 'ReporteVentasPDF'])->name('reportes.ventas.pdf');
Route::get('/ventas/{codigo}/boleta-pdf',[VentaController::class, 'boleta_pdf'])->name('ventas.boleta.pdf');


Route::post('/chat', [ChatController::class, 'chat']);

//Dashboard
Route::get('/dashboard', [DashboardController::class, 'vista']);
Route::get('/dashboard/datos', [DashboardController::class, 'obtener_datos_dashboard']);

// });