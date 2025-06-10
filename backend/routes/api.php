<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\Auth\ResetPasswordController;

// Routes cho người dùng
Route::prefix('auth')->group(function () {
    Route::post('register', [RegisterController::class, 'register']);
    Route::post('login', [LoginController::class, 'login']);
    Route::middleware('auth:sanctum')->post('logout', [LogoutController::class, 'logout']);
    Route::middleware('auth:sanctum')->get('me', [LoginController::class, 'me']);
});

// Routes cho reset mật khẩu
Route::post('reset-password', [ResetPasswordController::class, 'sendMail']);
Route::put('reset-password/{token}', [ResetPasswordController::class, 'reset']);

//test route
Route::get('test', function () {
    return response()->json(['message' => 'Test route OK']);
});



