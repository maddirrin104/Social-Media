<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\Auth\ResetPasswordController;

use App\Http\Controllers\FriendshipController;
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

// Routes cho bài viết
Route::middleware('auth:sanctum')->group(function () {
    //tạo bài viết 
    Route::post('/posts', [PostController::class, 'store']);
    //lấy posts
    Route::get('/posts', [PostController::class, 'index']);
    Route::get('/posts/{userId}', [PostController::class, 'getPostsByUser']);
    //xóa post, like, comment
    Route::delete('/posts/{post}', [PostController::class, 'destroy']);
    Route::delete('/posts/{post}/comment/{comment}', [PostController::class, 'deleteComment']);
    Route::delete('/posts/{post}/like', [PostController::class, 'unlike']);
    //like, comment
    Route::post('/posts/{post}/like', [PostController::class, 'like']);
    Route::post('/posts/{post}/comment', [PostController::class, 'comment']);
});

//get all users
Route::middleware('auth:sanctum')->get('/users', [UserController::class, 'index']);

//get user by id
Route::middleware('auth:sanctum')->get('/users/{id}', [UserController::class, 'show']);

// Routes cho kết bạn
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/friends/request/{user}', [FriendshipController::class, 'sendRequest']); // Gửi lời mời kết bạn
    Route::delete('/friends/request/{user}', [FriendshipController::class, 'cancelRequest']); // Huỷ lời mời kết bạn đã gửi
    Route::post('/friends/accept/{user}', [FriendshipController::class, 'acceptRequest']); // Chấp nhận lời mời kết bạn
    Route::delete('/friends/{user}', [FriendshipController::class, 'unfriend']); // Huỷ kết bạn
    Route::get('/friends', [FriendshipController::class, 'listFriends']); // Danh sách bạn bè
    Route::get('/friends/requests/received', [FriendshipController::class, 'listReceivedRequests']); // Lời mời đã nhận
    Route::get('/friends/requests/sent', [FriendshipController::class, 'listSentRequests']); // Lời mời đã gửi
}); 

Route::middleware('auth:sanctum')->group(function () {
    Route::put('/user', [UserController::class, 'update']); // Cập nhật thông tin user hiện tại
});

//test route
Route::get('test', function () {
    return response()->json(['message' => 'Test route OK']);
});





