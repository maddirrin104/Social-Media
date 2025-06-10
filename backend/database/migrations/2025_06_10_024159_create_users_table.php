<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100);
            $table->string('email', 100)->unique();
            $table->string('password', 100);
            $table->string('avatar', 255)->nullable();
            $table->string('bio', 255)->nullable();
            $table->integer('followers')->default(0);
            $table->integer('following')->default(0);
            $table->integer('posts')->default(0);
            $table->enum('role', ['admin', 'user'])->default('user');
            $table->integer('friend_count')->default(0);
            $table->string('hometown', 100)->nullable();
            $table->string('instagram', 100)->nullable();
            $table->string('tiktok', 100)->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('users');
    }
}