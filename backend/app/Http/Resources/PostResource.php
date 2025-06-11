<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
{
    public function toArray($request)
    {
        // Lấy danh sách comment dạng chi tiết
        $commentList = $this->comments()
            ->with('user')
            ->get()
            ->map(function ($comment) {
                return [
                    'id' => $comment->id,
                    'userId' => $comment->user_id,
                    'name' => $comment->user ? $comment->user->name : null,
                    'avatar' => $comment->user && $comment->user->avatar
                        ? asset('storage/' . $comment->user->avatar)
                        : asset('storage/avatars/defaultAvatar.png'),
                    'content' => $comment->content,
                ];
            });

        $user = $this->user;
        $userData = $user ? [
            'id'      => $user->id,
            'name'    => $user->name,
            'avatar'  => $user->avatar ? asset('storage/' . $user->avatar) : asset('storage/avatars/defaultAvatar.png'),
        ] : null;

        $likesRelation = $this->whenLoaded('likes', fn () => $this->getRelation('likes'));

        return [
            'id' => $this->id,
            'userId' => $this->user_id,
            'author' => $userData,
            'content' => $this->content,
            'image' => $this->image ? asset('storage/' . $this->image) : null,
            'likes'     => (int)($this->likes_count ?? $this->likes),
            'liked' => ($likesRelation && !$likesRelation instanceof \Illuminate\Http\Resources\MissingValue)
                             ? $likesRelation->contains('user_id', $request->user()?->id)
                             : $this->likes()->where('user_id', $request->user()?->id)->exists(),
            'comments'  => (int)($this->comments_count ?? $this->comments),
            'createdAt' => (int)$this->created_at, // Đổi sang dạng timestamp JS
            'commentList' => $commentList,
        ];
    }
}

