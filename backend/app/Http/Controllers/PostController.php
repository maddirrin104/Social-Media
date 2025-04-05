<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    // Tạo bài viết mới
    public function create(Request $request)
    {
        $request->validate([
            'content' => 'required|string',
            'visibility' => 'required|in:Public,Friends,Private',
        ]);

        $post = new Post();
        $post->user_id = Auth::id();
        $post->content = $request->content;
        $post->visibility = $request->visibility;
        $post->is_draft = $request->is_draft ?? false;
        $post->save();

        return response()->json(['message' => 'Post created successfully!', 'post' => $post], 201);
    }

    // Lấy tất cả bài viết của người dùng
    public function getAllPosts()
    {
        $posts = Post::with('user')->orderBy('created_at', 'desc')->get();
        return response()->json($posts, 200);
    }

    // Lấy bài viết theo ID
    public function getPostById($id)
    {
        $post = Post::with('user')->findOrFail($id);
        return response()->json($post, 200);
    }

    // Chỉnh sửa bài viết
    public function updatePost(Request $request, $id)
    {
        $request->validate([
            'content' => 'required|string',
            'visibility' => 'required|in:Public,Friends,Private',
        ]);

        $post = Post::findOrFail($id);

        if ($post->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $post->content = $request->content;
        $post->visibility = $request->visibility;
        $post->save();

        return response()->json(['message' => 'Post updated successfully!', 'post' => $post], 200);
    }

    // Xóa bài viết
    public function deletePost($id)
    {
        $post = Post::findOrFail($id);

        if ($post->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $post->delete();
        return response()->json(['message' => 'Post deleted successfully!'], 200);
    }
}
