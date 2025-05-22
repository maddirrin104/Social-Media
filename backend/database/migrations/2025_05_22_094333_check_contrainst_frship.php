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
        DB::statement('ALTER TABLE friendships ADD CONSTRAINT check_different_users CHECK (user_id1 <> user_id2)');
        DB::statement('ALTER TABLE friend_requests ADD CONSTRAINT check_different_user CHECK (sender_id <> receiver_id)');
        DB::statement("
            ALTER TABLE reactions
            ADD CONSTRAINT check_post_or_comment
            CHECK (
                (post_id IS NOT NULL AND comment_id IS NULL)
                OR (post_id IS NULL AND comment_id IS NOT NULL)
            )
        ");
    }

    public function down(): void
    {
        DB::statement("
            ALTER TABLE friendships
            DROP CHECK check_different_users
        ");

        DB::statement("
            ALTER TABLE friend_requests
            DROP CHECK check_different_user
        ");
        
        DB::statement("
            ALTER TABLE reactions
            DROP CHECK check_post_or_comment
        ");
    }
};
