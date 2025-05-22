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
        Schema::create('reactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('post_id')->nullable()->constrained('posts')->onDelete('cascade');
            $table->foreignId('comment_id')->nullable()->constrained('comments')->onDelete('cascade');
            $table->string('reaction_type');
            $table->timestamp('created_at')->nullable();
            
            // Add a check constraint to ensure that either post_id or comment_id is set, but not both
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reactions');
    }
};
