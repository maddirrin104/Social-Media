<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\registerController;
use App\Http\Controllers\Auth\loginController;
use App\Http\Controllers\Auth\logoutController;
use App\Http\Controllers\Auth\ResetPasswordController;

// Routes cho người dùng
Route::prefix('auth')->group(function () {
    Route::post('register', [registerController::class, 'register']);
    Route::post('login', [loginController::class, 'login']);
    Route::middleware('auth:sanctum')->post('logout', [logoutController::class, 'logout']);
    Route::middleware('auth:sanctum')->get('me', [loginController::class, 'me']);
});

// Routes cho reset mật khẩu
Route::post('reset-password', [ResetPasswordController::class, 'sendMail']);
Route::put('reset-password/{token}', [ResetPasswordController::class, 'reset']);

//test route
Route::get('test', function () {
    return response()->json(['message' => 'Test route OK']);
});



