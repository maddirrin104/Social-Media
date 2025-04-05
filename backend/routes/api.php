<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\PostLikeController;
use App\Http\Controllers\FriendshipController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\SavedPostController;
use App\Http\Controllers\MediaController;
use App\Http\Controllers\SearchController;

// Routes cho người dùng
Route::prefix('users')->group(function() {
    Route::post('register', [UserController::class, 'register']);
    Route::post('login', [UserController::class, 'login']);
    Route::get('profile', [UserController::class, 'getProfile']);
    Route::put('update', [UserController::class, 'updateProfile']);
});

// Routes cho bài viết
Route::prefix('posts')->group(function() {
    Route::post('create', [PostController::class, 'createPost']);
    Route::get('timeline', [PostController::class, 'getTimeline']);
    Route::put('update/{id}', [PostController::class, 'updatePost']);
    Route::delete('delete/{id}', [PostController::class, 'deletePost']);
});

// Routes cho bình luận
Route::prefix('comments')->group(function() {
    Route::post('add', [CommentController::class, 'addComment']);
    Route::get('post/{postId}', [CommentController::class, 'getCommentsByPost']);
});

// Routes cho lượt thích bài viết
Route::prefix('likes')->group(function() {
    Route::post('like', [PostLikeController::class, 'likePost']);
    Route::delete('unlike/{postId}', [PostLikeController::class, 'unlikePost']);
});

// Routes cho quan hệ bạn bè
Route::prefix('friendships')->group(function() {
    Route::post('send-request', [FriendshipController::class, 'sendFriendRequest']);
    Route::post('accept/{friendId}', [FriendshipController::class, 'acceptFriendRequest']);
    Route::post('block/{friendId}', [FriendshipController::class, 'blockUser']);
});

// Routes cho tin nhắn
Route::prefix('messages')->group(function() {
    Route::post('send', [MessageController::class, 'sendMessage']);
    Route::get('chat/{friendId}', [MessageController::class, 'getChat']);
    Route::delete('delete/{messageId}', [MessageController::class, 'deleteMessage']);
});

// Routes cho thông báo
Route::prefix('notifications')->group(function() {
    Route::get('all', [NotificationController::class, 'getNotifications']);
});

// Routes cho bài viết đã lưu
Route::prefix('saved-posts')->group(function() {
    Route::post('save', [SavedPostController::class, 'savePost']);
    Route::delete('unsave/{postId}', [SavedPostController::class, 'unsavePost']);
});

// Routes cho media
Route::prefix('media')->group(function() {
    Route::post('upload', [MediaController::class, 'uploadMedia']);
});

// Routes cho lịch sử tìm kiếm
Route::prefix('search-history')->group(function() {
    Route::post('add', [SearchController::class, 'addSearchQuery']);
    Route::get('history', [SearchController::class, 'getSearchHistory']);
});
