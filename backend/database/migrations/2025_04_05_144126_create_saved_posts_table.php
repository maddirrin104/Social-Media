<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSavedPostsTable extends Migration
{
    public function up()
    {
        Schema::create('saved_posts', function (Blueprint $table) {
            $table->id('saved_id');
            $table->foreignId('post_id')->constrained('posts', 'post_id')->onDelete('cascade');
            $table->foreignId('user_id')->constrained('users', 'user_id')->onDelete('cascade');
            $table->unique(['user_id', 'post_id']);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('saved_posts');
    }
}
