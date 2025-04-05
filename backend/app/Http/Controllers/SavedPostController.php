<?php

namespace App\Http\Controllers;

use App\Models\SavedPost;
use App\Models\Post;
use Illuminate\Http\Request;

class SavedPostController extends Controller
{
    /**
     * Save a post to the user's saved posts.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function savePost(Request $request)
    {
        // Validate input
        $request->validate([
            'post_id' => 'required|exists:posts,post_id',
        ]);

        // Check if the post is already saved
        $savedPost = SavedPost::where('post_id', $request->post_id)
                              ->where('user_id', auth()->user()->user_id)
                              ->first();

        if ($savedPost) {
            return response()->json([
                'message' => 'Post is already saved!'
            ], 400);
        }

        // Save the post to user's saved posts
        $savedPost = new SavedPost();
        $savedPost->post_id = $request->post_id;
        $savedPost->user_id = auth()->user()->user_id;
        $savedPost->save();

        return response()->json([
            'message' => 'Post saved successfully!',
            'saved_post' => $savedPost
        ], 201);
    }

    /**
     * Remove a post from the user's saved posts.
     *
     * @param int $postId
     * @return \Illuminate\Http\JsonResponse
     */
    public function unsavePost($postId)
    {
        // Find the saved post
        $savedPost = SavedPost::where('post_id', $postId)
                              ->where('user_id', auth()->user()->user_id)
                              ->first();

        if (!$savedPost) {
            return response()->json([
                'message' => 'Post not found in saved posts!'
            ], 404);
        }

        // Delete the saved post
        $savedPost->delete();

        return response()->json([
            'message' => 'Post unsaved successfully!'
        ], 200);
    }

    /**
     * Get all saved posts for the current user.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getSavedPosts()
    {
        $savedPosts = SavedPost::where('user_id', auth()->user()->user_id)
                               ->with('post')  // Eager load related posts
                               ->get();

        return response()->json([
            'saved_posts' => $savedPosts
        ]);
    }
}
