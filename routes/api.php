<?php

use App\Http\Resources\UserResource;
use App\Models\Chat;
use App\Models\ChatMember;
use App\Models\ChatMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Models\User;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/user', function (Request $request) {
    if (Auth::check()) {
        return new UserResource(Auth::user());
    }
});

Route::post('/search/{searchType}', function ($searchType, Request $request) {
    $user = Auth::user();
    if (!$user) return ["error" => 'not logged in'];

    $searchResults = [];
    $searchQuery = $request->input('searchQuery');
    $trimmedQuery = trim($searchQuery);

    if ($trimmedQuery) {
        switch ($searchType) {
            case 'users':
                $searchResults = User::where('id', '!=' , $user->id)
                                    ->where('name', 'like', "%$trimmedQuery%")
                                    ->orWhere('surname', 'like', "%$trimmedQuery%")
                                    ->get();
                break;
            case 'chats':
                $userIds = User::where('id', '!=' , $user->id)
                                ->where('name', 'like', "%$trimmedQuery%")
                                ->orWhere('surname', 'like', "%$trimmedQuery%")
                                ->pluck('id');
                $chatIds = Chat::where('name', 'like', "%$trimmedQuery%")->pluck('id');
                
                $resultIds = $userIds->merge($chatIds);
                $searchResults = Chat::whereIn('id', $resultIds)->get();

                foreach ($searchResults as $chat) {
                    if ($chat->last_message_sender && $chat->chat_type === 'groupchat') {
                        $chat->last_message_sender = User::find($chat->last_message_sender);
                    }
                    if ($chat->chat_type === 'dialog') {
                        $companionId = ChatMember::where('chat_id', $chat->id)
                                                ->where('member_id', '!=', Auth::id())
                                                ->pluck('member_id');
                        $chat->companion = User::find($companionId);
                    }
                }
                break;
        }

        return $searchResults;
    }
    return ["error" => 'nullable query'];
});


Route::post('/friends/{friendType}', function ($friendType, Request $request) {
    $user = Auth::user();
    if (!$user) return ["error" => 'not logged in'];

    $friends = [];
    
    switch ($friendType) {
        case 'all':
            $friends = $user->friends;
            break;
        case 'friends':
            $friends = $user->friends()->where('relationship', 'friend')->get();
            break;
        case 'requests':
            $friends = $user->friends()->where('relationship', 'request')->get();
            break;
    }

    foreach ($friends as $friend) {
        $friend->friend = User::find($friend->friend_id);
    }

    return $friends;
});

Route::post('/chats-get/{chat_type}', function ($chat_type, Request $request) {
    $user = Auth::user();
    if (!$user) return ["error" => 'not logged in'];

    $chatIds = [];
    $chats = [];

    switch ($chat_type) {
        case 'all':
            $chatIds = $user->chats()->pluck('chat_id');
            $chats = Chat::whereIn('id', $chatIds)->get();
            break;
            
        case 'groupchats':
            $chatIds = $user->groupchats()->pluck('chat_id');
            $chats = Chat::whereIn('id', $chatIds)->get();
            break;

        case 'dialogs':
            $chatIds = $user->dialogs()->pluck('chat_id');
            $chats = Chat::whereIn('id', $chatIds)->get();
            break;
    }

    foreach ($chats as $chat) {
        if ($chat->last_message_sender && $chat->chat_type === 'groupchat') {
            $chat->last_message_sender = User::find($chat->last_message_sender);
        }
        if ($chat->chat_type === 'dialog') {
            $companionId = ChatMember::where('chat_id', $chat->id)
                                    ->where('member_id', '!=', Auth::id())
                                    ->pluck('member_id');
            $chat->companion = User::find($companionId);
        }
    }

    return $chats;
});

Route::post('/chats/{chat_id}', function ($chat_id, Request $request) {
    if (Auth::check()) {
        $chat = Chat::find($chat_id);
        $messages = $chat->messages;
        $companionId = ChatMember::where('chat_id', $chat->id)
                                ->where('member_id', '!=', Auth::id())
                                ->pluck('member_id');

        foreach ($messages as $message) {
            $message->sender = User::find($message->sender);
        }

        $data = [
            "messages" => $messages,
            "chat" => $chat,
            "companion" => User::find($companionId)
        ];

        return $data;
    }
});