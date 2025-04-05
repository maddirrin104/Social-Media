<?php

namespace App\Http\Controllers;

use App\Models\PostLike;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PostLikeController extends Controller
{
    // Thích bài viết
    public function likePost($postId)
    {
        $post = Post::findOrFail($postId);

        $like = PostLike::firstOrCreate([
            'user_id' => Auth::id(),
            'post_id' => $postId,
        ]);

        return response()->json(['message' => 'Post liked successfully!'], 200);
    }

    // Bỏ thích bài viết
    public function unlikePost($postId)
    {
        $like = PostLike::where('user_id', Auth::id())->where('post_id', $postId)->first();

        if ($like) {
            $like->delete();
            return response()->json(['message' => 'Post unliked successfully!'], 200);
        }

        return response()->json(['message' => 'Like not found'], 404);
    }
}
