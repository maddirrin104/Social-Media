<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Media;
use Illuminate\Support\Facades\Storage;
use App\Models\Post;
use App\Models\Message;

class MediaController extends Controller
{
    /**
     * Upload media (image/video) to the server.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function uploadMedia(Request $request)
    {
        // Validate input
        $request->validate([
            'file' => 'required|file|mimes:jpeg,png,jpg,gif,mp4,avi|max:10240',
            'post_id' => 'nullable|exists:posts,post_id',  // Optional post id
            'message_id' => 'nullable|exists:messages,message_id',  // Optional message id
        ]);

        // Store the media file
        $file = $request->file('file');
        $filePath = $file->store('media', 'public');

        // Create new Media record
        $media = new Media();
        $media->media_url = $filePath;
        $media->media_type = $file->getMimeType();
        
        if ($request->has('post_id')) {
            $media->post_id = $request->post_id;
        }

        if ($request->has('message_id')) {
            $media->message_id = $request->message_id;
        }

        $media->save();

        return response()->json([
            'message' => 'Media uploaded successfully!',
            'media' => $media
        ], 201);
    }
}
