<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AllUserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'     => $this->id,
            'name'   => $this->name,
            'email'  => $this->email,
            'avatar' => $this->avatar ? asset('storage/' . $this->avatar) : asset('storage/avatars/defaultAvatar.png'),
            'bio'    => $this->bio,
            'role'   => $this->role,
            'friendCount' => $this->friend_count,
            'hometown' => $this->hometown,
            'instagram' => $this->instagram,
            'tiktok' => $this->tiktok,
        ];
    }

}



