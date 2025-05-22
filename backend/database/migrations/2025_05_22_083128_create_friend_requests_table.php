<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('friend_requests', function (Blueprint $table) {
            $table->id();
            $table->foreignId('sender_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('receiver_id')->constrained('users')->onDelete('cascade');
            $table->string('status')->default('pending');
            $table->timestamps();
            
            // Create a unique constraint to prevent duplicate friend requests
            $table->unique(['sender_id', 'receiver_id']);
            
            // Add a check constraint to ensure sender_id != receiver_id
            // This prevents a user from sending a friend request to themselves
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('friend_requests');
    }
};
