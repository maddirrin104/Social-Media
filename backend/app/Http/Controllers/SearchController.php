<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SearchHistory;
use Illuminate\Support\Facades\Auth;

class SearchController extends Controller
{
    // Thêm lịch sử tìm kiếm
    public function addSearchQuery(Request $request)
    {
        $request->validate([
            'query' => 'required|string|max:255',
        ]);

        $userId = Auth::id(); // Lấy ID của người dùng hiện tại

        $searchHistory = new SearchHistory();
        $searchHistory->user_id = $userId;
        $searchHistory->query = $request->query;
        $searchHistory->save();

        return response()->json([
            'message' => 'Search query added successfully',
            'data' => $searchHistory
        ], 201);
    }

    // Lấy lịch sử tìm kiếm của người dùng
    public function getSearchHistory($userId)
    {
        // Kiểm tra nếu userId có khớp với người dùng hiện tại, nếu không sẽ trả về lỗi
        if (Auth::id() != $userId) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $searchHistory = SearchHistory::where('user_id', $userId)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'data' => $searchHistory
        ], 200);
    }
}
