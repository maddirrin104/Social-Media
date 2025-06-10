<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
{
    public function toArray($request)
    {

        // Lấy danh sách comment dạng chi tiết
        $commentList = is_iterable($this->comments) ? $this->comments->map(function ($comment) {
            return [
                'id' => $comment->id,
                'userId' => $comment->user_id,
                'name' => $comment->user ? $comment->user->name : null,
                'content' => $comment->content,
            ];
        }) : [];

        return [
            'id' => $this->id,
            'userId' => $this->user_id,
            'content' => $this->content,
            'image' => $this->image ? asset('storage/' . $this->image) : null,
            'likes'     => (int)($this->likes_count ?? $this->likes),
            'comments'  => (int)($this->comments_count ?? $this->comments),
            'createdAt' => (int)$this->created_at, // Đổi sang dạng timestamp JS
            'commentList' => $commentList,
        ];
    }
}

