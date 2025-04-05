<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePostsTable extends Migration
{
    public function up()
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->id('post_id');
            $table->foreignId('user_id')->constrained('users','user_id')->onDelete('cascade');
            $table->text('content')->nullable();
            $table->enum('visibility', ['Public', 'Friends', 'Private'])->default('Public');
            $table->boolean('is_pinned')->default(false);
            $table->boolean('is_draft')->default(false);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('posts');
    }
}
