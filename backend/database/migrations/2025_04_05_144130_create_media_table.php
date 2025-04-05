<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMediaTable extends Migration
{
    public function up()
    {
        Schema::create('media', function (Blueprint $table) {
            $table->id('media_id');
            $table->foreignId('post_id')->nullable()->constrained('posts')->onDelete('set null');
            $table->foreignId('message_id')->nullable()->constrained('messages')->onDelete('set null');
            $table->string('media_url', 255);
            $table->enum('media_type', ['Image', 'Video']);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('media');
    }
}
