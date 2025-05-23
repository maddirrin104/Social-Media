<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\registerController;
use App\Http\Controllers\Auth\loginController;
use App\Http\Controllers\Auth\logoutController;
use App\Http\Controllers\Auth\ResetPasswordController;

use App\Http\Controllers\ConversationController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\UserController;
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

// Routes cho chat
Route::middleware('auth:sanctum')->group(function () {
    // Tìm kiếm người dùng
    Route::get('/users/search', [UserController::class, 'search']);
    Route::get('/users/friends', [UserController::class, 'friends']);

    // Cuộc trò chuyện
    Route::get('/conversations', [ConversationController::class, 'index']);
    Route::post('/conversations', [ConversationController::class, 'store']);
    Route::get('/conversations/{id}', [ConversationController::class, 'show']);

    // Tin nhắn
    Route::get('/conversations/{conversationId}/messages', [MessageController::class, 'index']);
    Route::post('/conversations/{conversationId}/messages', [MessageController::class, 'store']);
    Route::put('/messages/{messageId}/read', [MessageController::class, 'markAsRead']);
    Route::put('/conversations/{conversationId}/read', [MessageController::class, 'markAllAsRead']);
    Route::delete('/messages/{messageId}', [MessageController::class, 'destroy']);
});

//test route
Route::get('test', function () {
    return response()->json(['message' => 'Test route OK']);
});



