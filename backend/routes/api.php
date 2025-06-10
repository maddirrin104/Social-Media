<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\Auth\ResetPasswordController;

use App\Http\Controllers\ConversationController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PostController;


// Routes cho auth
Route::prefix('users')->group(function () {
    Route::post('register', [RegisterController::class, 'register']);
    Route::post('login', [LoginController::class, 'login']);
    Route::middleware('auth:sanctum')->post('logout', [LogoutController::class, 'logout']);
    Route::middleware('auth:sanctum')->get('me', [LoginController::class, 'me']);
});

// Routes cho reset mật khẩu
Route::post('reset-password', [ResetPasswordController::class, 'sendMail']);
Route::put('reset-password/{token}', [ResetPasswordController::class, 'reset']);

// Routes cho chat
Route::middleware('auth:sanctum')->group(function () {
    // Tìm kiếm người dùng
    // Route::get('/users/search', [UserController::class, 'search']);
    // Route::get('/users/friends', [UserController::class, 'friends']);

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

// Routes cho bài viết
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/posts', [PostController::class, 'store']);
    Route::get('/posts', [PostController::class, 'index']);
    Route::delete('/posts/{post}', [PostController::class, 'destroy']);
    Route::post('/posts/{post}/like', [PostController::class, 'like']);
    Route::post('/posts/{post}/comment', [PostController::class, 'comment']);
    Route::delete('/posts/{post}/comment/{comment}', [PostController::class, 'deleteComment']);
    Route::delete('/posts/{post}/like', [PostController::class, 'unlike']);
});

//test route
Route::get('test', function () {
    return response()->json(['message' => 'Test route OK']);
});



