<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFriendshipsTable extends Migration
{
    public function up()
    {
        Schema::create('friendships', function (Blueprint $table) {
            $table->id('friendship_id');
            $table->foreignId('user_id')->constrained('users', 'user_id')->onDelete('cascade');
            $table->foreignId('friend_id')->constrained('users', 'user_id')->onDelete('cascade');
            $table->enum('status', ['Pending', 'Accepted', 'Blocked'])->default('Pending');
            $table->boolean('is_following')->default(false);
            $table->unique(['user_id', 'friend_id']);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('friendships');
    }
}
