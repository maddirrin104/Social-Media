<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    // Tạo bình luận
    public function create(Request $request, $postId)
    {
        $request->validate([
            'content' => 'required|string',
        ]);

        $comment = new Comment();
        $comment->post_id = $postId;
        $comment->user_id = Auth::id();
        $comment->content = $request->content;
        $comment->parent_comment_id = $request->parent_comment_id ?? null;
        $comment->save();

        return response()->json(['message' => 'Comment created successfully!', 'comment' => $comment], 201);
    }

    // Lấy tất cả bình luận của bài viết
    public function getComments($postId)
    {
        $comments = Comment::with('user')->where('post_id', $postId)->orderBy('created_at', 'desc')->get();
        return response()->json($comments, 200);
    }

    // Xóa bình luận
    public function deleteComment($id)
    {
        $comment = Comment::findOrFail($id);

        if ($comment->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $comment->delete();
        return response()->json(['message' => 'Comment deleted successfully!'], 200);
    }
}
