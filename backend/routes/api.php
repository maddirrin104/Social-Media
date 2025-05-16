<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\registerController;
use App\Http\Controllers\Auth\loginController;
use App\Http\Controllers\Auth\logoutController;

// Routes cho người dùng
Route::prefix('auth')->group(function () {
    Route::post('register', [registerController::class, 'register']);
    Route::post('login', [loginController::class, 'login']);
    Route::middleware('auth:sanctum')->post('logout', [logoutController::class, 'logout']);
});


