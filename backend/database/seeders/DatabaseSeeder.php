<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        // Seed users
        $users = [];
        for ($i = 1; $i <= 10; $i++) {
            $users[] = [
                'name' => 'User '.$i,
                'email' => 'user'.$i.'@example.com',
                'password' => Hash::make('password'.$i),
                'avatar' => 'avatars/user'.$i.'.jpg',
                'bio' => 'This is bio of user '.$i,
                'followers' => rand(0, 50),
                'following' => rand(0, 30),
                'posts' => 0, // Will update after post seeding
                'role' => $i == 1 ? 'admin' : 'user',
                'friend_count' => 0, // Will update after friendships
                'hometown' => 'Hometown '.$i,
                'instagram' => 'insta_user'.$i,
                'tiktok' => 'tiktok_user'.$i,
            ];
        }
        DB::table('users')->insert($users);

        // Seed posts
        $posts = [];
        $postCount = 20;
        for ($i = 1; $i <= $postCount; $i++) {
            $user_id = rand(1, 10);
            $posts[] = [
                'user_id' => $user_id,
                'content' => 'Sample post content '.$i,
                'image' => 'posts/post'.$i.'.jpg',
                'likes' => 0, // Will update after post_likes
                'comments' => 0, // Will update after post_comments
                'created_at' => now()->timestamp * 1000 - rand(0, 10000000),
            ];
        }
        DB::table('posts')->insert($posts);

        // Update users' post counts
        $userPosts = DB::table('posts')->selectRaw('user_id, COUNT(*) as cnt')->groupBy('user_id')->get();
        foreach ($userPosts as $up) {
            DB::table('users')->where('id', $up->user_id)->update(['posts' => $up->cnt]);
        }

        // Seed post_likes
        $likes = [];
        for ($i = 1; $i <= $postCount; $i++) {
            $likeCount = rand(1, 5);
            $likedUsers = collect(range(1, 10))->shuffle()->take($likeCount);
            foreach ($likedUsers as $u) {
                $likes[] = [
                    'post_id' => $i,
                    'user_id' => $u,
                ];
            }
            // Update post like count
            DB::table('posts')->where('id', $i)->update(['likes' => $likeCount]);
        }
        DB::table('post_likes')->insert($likes);

        // Seed post_comments
        $comments = [];
        $commentId = 1;
        for ($i = 1; $i <= $postCount; $i++) {
            $commentCount = rand(1, 5);
            for ($j = 1; $j <= $commentCount; $j++) {
                $user_id = rand(1, 10);
                $comments[] = [
                    'post_id' => $i,
                    'user_id' => $user_id,
                    'content' => 'Comment '.$j.' on post '.$i,
                    'created_at' => now()->timestamp * 1000 - rand(0, 10000000),
                ];
                $commentId++;
            }
            // Update post comment count
            DB::table('posts')->where('id', $i)->update(['comments' => $commentCount]);
        }
        DB::table('post_comments')->insert($comments);

        // Seed friendships
        $friendships = [];
        $friendPairs = [];
        for ($i = 1; $i <= 10; $i++) {
            $friends = collect(range(1, 10))->where('id', '!=', $i)->shuffle()->take(rand(1, 4));
            foreach ($friends as $f) {
                $pair = [$i, $f];
                sort($pair);
                $key = implode('-', $pair);
                if (!isset($friendPairs[$key])) {
                    $friendPairs[$key] = true;
                    $friendships[] = [
                        'user1_id' => $pair[0],
                        'user2_id' => $pair[1],
                        'status' => 'accepted',
                        'created_at' => now()->timestamp * 1000 - rand(0, 20000000),
                    ];
                }
            }
        }
        DB::table('friendships')->insert($friendships);

        // Update friend_count for each user
        $friendCounts = [];
        foreach ($friendships as $f) {
            $friendCounts[$f['user1_id']] = ($friendCounts[$f['user1_id']] ?? 0) + 1;
            $friendCounts[$f['user2_id']] = ($friendCounts[$f['user2_id']] ?? 0) + 1;
        }
        foreach ($friendCounts as $uid => $cnt) {
            DB::table('users')->where('id', $uid)->update(['friend_count' => $cnt]);
        }

        // Seed notifications
        $notifications = [];
        for ($i = 1; $i <= 20; $i++) {
            $sender_id = rand(1, 10);
            $receiver_id = rand(1, 10);
            while ($receiver_id == $sender_id) {
                $receiver_id = rand(1, 10);
            }
            $type = collect(['like', 'comment', 'friend_request'])->random();
            $notifications[] = [
                'sender_id' => $sender_id,
                'receiver_id' => $receiver_id,
                'type' => $type,
                'title' => ucfirst($type).' notification from user '.$sender_id,
                'created_at' => now()->subMinutes(rand(0, 10000)),
                'is_read' => rand(0, 1),
            ];
        }
        DB::table('notifications')->insert($notifications);
    }
}