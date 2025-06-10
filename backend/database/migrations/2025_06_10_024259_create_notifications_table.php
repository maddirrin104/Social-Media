<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNotificationsTable extends Migration
{
    public function up()
    {
        Schema::create('notifications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('sender_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('receiver_id')->constrained('users')->onDelete('cascade');
            $table->enum('type', ['like', 'comment', 'friend_request']);
            $table->string('title', 255);
            $table->dateTime('created_at');
            $table->boolean('is_read')->default(false);
            // Không dùng $table->timestamps() vì created_at custom
        });
    }

    public function down()
    {
        Schema::dropIfExists('notifications');
    }
}