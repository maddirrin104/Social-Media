<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFriendshipsTable extends Migration
{
    public function up()
    {
        Schema::create('friendships', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user1_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('user2_id')->constrained('users')->onDelete('cascade');
            $table->enum('status', ['pending', 'accepted', 'none'])->default('none');
            $table->bigInteger('created_at');
        });
    }

    public function down()
    {
        Schema::dropIfExists('friendships');
    }
}