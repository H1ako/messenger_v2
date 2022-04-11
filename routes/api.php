<?php

use App\Http\Resources\UserResource;
use App\Models\Chat;
use App\Models\ChatMember;
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
    return new UserResource(Auth::user());
})->middleware('auth');

Route::post('/user/{userId}', function ($userId, Request $request) {
    $myUser = Auth::user();
    $user = User::find($userId);
    $user->relationship = $myUser->friends()->where('friend_id', $user->id)->first();
    $user->groupchatAmount = $user->groupchats()->count();
    $user->dialogAmount = $user->dialogs()->count();
    $user->friendAmount = $user->friends()->where('relationship', 'friend')->count();
    $user->requestAmount = $user->friends()->where('relationship', 'request')->count();
    return ["user" => $user];
});

Route::post('/search/{searchType}', function ($searchType, Request $request) {
    $user = Auth::user();
    $searchResults = [];
    $searchQuery = $request->input('searchQuery');

    switch ($searchType) {
        case 'users':
            $searchResults = User::where('name', 'like', "%$searchQuery%")
                                ->orWhere('surname', 'like', "%$searchQuery%")
                                ->where('id', '!=' , $user->id)
                                ->orderBy('updated_at', 'DESC')
                                ->get();
                                
            foreach ($searchResults as $searchResult) {
                $userFriend = $user->friends()->where('friend_id', $searchResult->id)->first();

                $searchResult->aboutRelationship = $userFriend;
            }

            break;
        case 'chats':
            $userIds = User::where('name', 'like', "%$searchQuery%")
                                ->orWhere('surname', 'like', "%$searchQuery%")
                                ->where('id', '!=' , $user->id)
                                ->pluck('id');
            $userChatsIds = $user->chats()->pluck('chat_id');
            
            $chatMemberIds = ChatMember::whereIn('chat_id', $userChatsIds)
                                        ->whereIn('member_id', $userIds)
                                        ->pluck('chat_id');
            $chatIds = Chat::where('name', 'like', "%$searchQuery%")
                            ->whereIn('id', $userChatsIds)
                            ->pluck('id');
            $resultIds = $chatMemberIds->merge($chatIds);

            $searchResults = Chat::whereIn('id', $resultIds)->orderBy('updated_at', 'DESC')->get();

            foreach ($searchResults as $chat) {
                if ($chat->last_message_sender && $chat->chat_type === 'groupchat') {
                    $chat->last_message_sender = User::find($chat->last_message_sender);
                }
                if ($chat->chat_type === 'dialog') {
                    $companionId = ChatMember::where('chat_id', $chat->id)
                                            ->where('member_id', '!=', Auth::id())
                                            ->first()
                                            ->member_id;
                    $chat->companion = User::find($companionId);
                }
            }
            break;
        
        case 'friends':
            $friendIds = $user->friends()
                                ->where('relationship', 'friend')
                                ->pluck('friend_id');

            $searchResults = User::whereIn('id', $friendIds)
                                ->where('name', 'like', "%$searchQuery%")
                                ->orWhere('surname', 'like', "%$searchQuery%")
                                ->whereIn('id', $friendIds)
                                ->orderBy('updated_at', 'DESC')
                                ->get();
                                
            foreach ($searchResults as $searchResult) {
                $searchResult->friend = User::find($searchResult->friend_id);
            }
            break;
    }

    return $searchResults;    
});


Route::post('/friends/{friendType}', function ($friendType, Request $request) {
    $user = Auth::user();

    $friends = [];
    
    switch ($friendType) {
        case 'all':
            $friends = $user->friends;
            break;
        case 'friends':
            $friends = $user->friends()->where('relationship', 'friend')->orderBy('updated_at', 'DESC')->get();
            break;
        case 'requests':
            $friends = $user->friends()->where('relationship', 'request')->orderBy('updated_at', 'DESC')->get();
            break;
    }

    foreach ($friends as $friend) {
        $friend->friend = User::find($friend->friend_id);
    }

    return $friends;
})->middleware('auth');

Route::post('/chats-get/{chat_type}', function ($chat_type, Request $request) {
    $user = Auth::user();

    $chatIds = [];
    $chats = [];

    switch ($chat_type) {
        case 'all':
            $chatIds = $user->chats()->pluck('chat_id');
            $chats = Chat::whereIn('id', $chatIds)->orderBy('updated_at', 'DESC')->get();
            break;
            
        case 'groupchats':
            $chatIds = $user->groupchats()->pluck('chat_id');
            $chats = Chat::whereIn('id', $chatIds)->orderBy('updated_at', 'DESC')->get();
            break;

        case 'dialogs':
            $chatIds = $user->dialogs()->pluck('chat_id');
            $chats = Chat::whereIn('id', $chatIds)->orderBy('updated_at', 'DESC')->get();
            break;
    }

    foreach ($chats as $chat) {
        if ($chat->last_message_sender && $chat->chat_type === 'groupchat') {
            $chat->last_message_sender = User::find($chat->last_message_sender);
        }
        if ($chat->chat_type === 'dialog') {
            $companionId = $chat->members()
                                ->where('member_id', '!=', Auth::id())
                                ->first();
            $chat->companion = User::find($companionId->member_id);
            error_log($chat);
        }
    }

    return $chats;
})->middleware('auth');

Route::post('/chats/{chat_id}', function ($chat_id, Request $request) {
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
})->middleware('auth', 'chat.access');