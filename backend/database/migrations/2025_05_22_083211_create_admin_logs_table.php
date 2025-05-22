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
        Schema::create('admin_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('admin_id')->constrained('users')->onDelete('cascade');
            $table->string('action_type'); // e.g., 'create', 'update', 'delete', 'ban', etc.
            $table->string('target_type'); // e.g., 'user', 'post', 'comment', etc.
            $table->unsignedBigInteger('target_id'); // ID of the target entity
            $table->text('details')->nullable(); // JSON or serialized data with more details
            $table->ipAddress('ip_address')->nullable();
            $table->timestamp('created_at')->nullable();
            
            // No updated_at timestamp as specified in the model with $timestamps = false
            
            // Add an index for faster lookups on target entity
            $table->index(['target_type', 'target_id']);
            
            // Add an index for faster lookups by action type
            $table->index('action_type');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('admin_logs');
    }
};
