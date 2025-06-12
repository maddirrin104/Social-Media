<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $me = $request->user();

        $notifications = \DB::table('notifications')
        ->where('receiver_id', $me->id)
        ->orderBy('created_at', 'desc')
        ->get()
        ->map(function ($item) {
            // Chuyển created_at sang ISO 8601 (Laravel Carbon)
            $item->created_at = \Carbon\Carbon::parse($item->created_at)->toIso8601String();
            return $item;
        });

        return response()->json($notifications);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Notification $notification)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Notification $notification)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Notification $notification)
    {
        //
    }
}
