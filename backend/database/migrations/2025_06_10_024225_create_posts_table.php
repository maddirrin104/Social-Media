<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePostsTable extends Migration
{
    public function up()
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users');
            $table->text('content')->nullable();
            $table->string('image', 255)->nullable();
            $table->integer('likes')->default(0);
            $table->integer('comments')->default(0);
            $table->bigInteger('created_at');
            // Không dùng $table->timestamps() vì created_at lưu kiểu BIGINT
        });
    }

    public function down()
    {
        Schema::dropIfExists('posts');
    }
}