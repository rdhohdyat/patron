<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StoreController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::post('register', [App\Http\Controllers\Api\AuthControler::class, 'register']);
Route::post('login', [App\Http\Controllers\Api\AuthControler::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('store', [StoreController::class, 'createStore']);
    Route::get('store', [StoreController::class, 'getStore']);
});


Route::apiResource('/products', App\Http\Controllers\Api\ProductController::class);

// Route::apiResource('/posts/{id}', App\Http\Controllers\Api\PostController::class);

