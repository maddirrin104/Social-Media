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
        Schema::create('message_status', function (Blueprint $table) {
            $table->id();
            $table->foreignId('message_id')->constrained('messages')->onDelete('cascade');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->boolean('is_read')->default(false);
            $table->timestamp('read_at')->nullable();
            
            // Create a unique constraint to ensure one status per message-user combination
            $table->unique(['message_id', 'user_id']);
            
            // No timestamps as specified in the model with $timestamps = false
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('message_status');
    }
};
