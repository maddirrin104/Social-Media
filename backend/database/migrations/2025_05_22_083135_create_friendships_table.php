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
        Schema::create('friendships', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id1')->constrained('users')->onDelete('cascade');
            $table->foreignId('user_id2')->constrained('users')->onDelete('cascade');
            $table->string('status')->default('active');
            $table->timestamps();
            
            // Create a unique constraint to prevent duplicate friendships
            $table->unique(['user_id1', 'user_id2']);
            
            // Add a check constraint to ensure user_id1 != user_id2
            // This prevents a user from being friends with themselves
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('friendships');
    }
};
