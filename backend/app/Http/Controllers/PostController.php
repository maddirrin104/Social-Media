<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\PostLike;
use App\Models\PostComment;
use Illuminate\Http\Request;
use App\Http\Resources\PostResource;
use Illuminate\Support\Facades\DB;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */     
    public function index()
    {
        $posts = Post::with(['user', 'likes', 'comments.user'])
            ->withCount(['likes', 'comments'])
            ->orderBy('created_at', 'desc')
            ->get();

        return PostResource::collection($posts);
    }
    public function getPostsByUser($userId)
    {
        $posts = Post::with(['user', 'likes', 'comments.user'])
            ->withCount(['likes', 'comments'])
            ->where('user_id', $userId)
            ->orderBy('created_at', 'desc')
            ->get();

        return PostResource::collection($posts);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'content' => 'required|string|max:1000',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:40960',
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('posts', 'public');
        }

        $post = Post::create([
            'user_id' => auth()->id(),
            'content' => $validated['content'],
            'image' => $imagePath,
            'created_at' => now()->getTimestampMs(),
        ]);

        $user = auth()->user();
        $user->increment('posts');

        return response()->json([
            'message' => 'Đăng bài thành công!',
            'post' => new PostResource($post->load(['user', 'likes', 'comments.user'])->loadCount(['likes', 'comments']))
        ], 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        if ($post->user_id !== auth()->id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }
        DB::beginTransaction();
        try {
            PostLike::where('post_id', $post->id)->delete();
            PostComment::where('post_id', $post->id)->delete();
            $post->delete();

            DB::commit();
            return response()->json(['message' => 'Post deleted successfully.'], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Delete failed', 'message' => $e->getMessage()], 500);
        }
    }

    public function adminDestroy(Post $post)
    {
        // Cho phép admin xóa bất kỳ bài viết nào
        if ($post->user_id !== auth()->id() && auth()->user()->role !== 'admin') {
            return response()->json(['error' => 'Unauthorized'], 403);
        }
        DB::beginTransaction();
        try {
            PostLike::where('post_id', $post->id)->delete();
            PostComment::where('post_id', $post->id)->delete();
            $post->delete();

            DB::commit();
            return response()->json(['message' => 'Post deleted successfully.'], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Delete failed', 'message' => $e->getMessage()], 500);
        }
    }

    public function like(Request $request, $postId)
    {
        $userId = $request->user()->id;

        if (PostLike::where('post_id', $postId)->where('user_id', $userId)->exists()) {
            return response()->json(['message' => 'Already liked'], 400);
        }

        DB::transaction(function () use ($postId, $userId, $request) {
            PostLike::create([
                'post_id' => $postId,
                'user_id' => $userId,
            ]);
            Post::where('id', $postId)->increment('likes');

            $post = Post::find($postId);
            if ($post && $post->user_id != $userId) {
                DB::table('notifications')->insert([
                    'sender_id' => $userId,
                    'receiver_id' => $post->user_id,
                    'type' => 'like',
                    'title' => $request->user()->name . ' đã thích bài viết của bạn.',
                    'created_at' => now(),
                    'is_read' => false,
                ]);
            }
        });

        // Trả về số likes mới
        $post = Post::withCount('likes')->findOrFail($postId);
        return response()->json([
            'message' => 'Liked',
            'likes' => $post->likes_count
        ]);
    }
    
    public function comment(Request $request, $postId)
    {
        $userId = $request->user()->id;
        $content = $request->input('content');
        if (!$content) {
            return response()->json(['message' => 'Content is required'], 422);
        }

        $comment = null;
        DB::transaction(function () use ($postId, $userId, $content, &$comment, $request) {
            $comment = PostComment::create([
                'post_id' => $postId,
                'user_id' => $userId,
                'content' => $content,
                'created_at' => round(microtime(true) * 1000), // JS timestamp ms
            ]);
            Post::where('id', $postId)->increment('comments');

            $post = Post::find($postId);
            if ($post && $post->user_id != $userId) {
                DB::table('notifications')->insert([
                    'sender_id' => $userId,
                    'receiver_id' => $post->user_id,
                    'type' => 'comment',
                    'title' => $request->user()->name . ' đã bình luận về bài viết của bạn.',
                    'created_at' => now(),
                    'is_read' => false,
                ]);
            }
        });

        // Trả về comment mới và số comment mới
        $post = Post::withCount('comments')->findOrFail($postId);
        return response()->json([
            'message' => 'Commented',
            'comment' => $comment,
            'comments' => $post->comments_count
        ]);
    }

    public function unlike(Request $request, $postId)
    {
        $userId = $request->user()->id;

        $like = PostLike::where('post_id', $postId)->where('user_id', $userId)->first();
        if (!$like) {
            return response()->json(['message' => 'Not liked yet'], 400);
        }

        DB::transaction(function () use ($like, $postId) {
            $like->delete();
            Post::where('id', $postId)->decrement('likes');
        });
        
        $post = Post::withCount('likes')->findOrFail($postId);
        return response()->json([
            'message' => 'Unliked',
            'likes' => $post->likes_count
        ]);
    }
    public function deleteComment(Request $request, $postId, $commentId)
    {
        $userId = $request->user()->id;

        $comment = PostComment::where('post_id', $postId)->where('id', $commentId)->where('user_id', $userId)->first();
        if (!$comment) {
            return response()->json(['message' => 'Comment not found'], 404);
        }

        DB::transaction(function () use ($comment, $postId) {
            $comment->delete();
            Post::where('id', $postId)->decrement('comments');
        });

        $post = Post::withCount('comments')->findOrFail($postId);
        return response()->json([
            'message' => 'Comment deleted',
            'comments' => $post->comments_count
        ]);
    }
    
}
