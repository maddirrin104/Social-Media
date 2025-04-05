<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id('user_id');
            $table->string('username', 50)->unique();
            $table->string('email', 100)->unique();
            $table->string('phone', 15)->unique()->nullable();
            $table->string('password', 255);
            $table->string('full_name', 100)->nullable();
            $table->enum('gender', ['Male', 'Female', 'Other'])->nullable();
            $table->date('birth_date')->nullable();
            $table->text('bio')->nullable();
            $table->string('location', 100)->nullable();
            $table->text('interests')->nullable();
            $table->string('profile_picture', 255)->nullable();
            $table->string('cover_picture', 255)->nullable();
            $table->json('privacy_settings')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('users');
    }
}
