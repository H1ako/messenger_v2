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

Route::post('/friends', function (Request $request) {
    if (Auth::check()) {
        $user = Auth::user();
        $friends = $user->friends;
        return $friends;
    }
});

Route::post('/chats-get/{chat_type}', function ($chat_type, Request $request) {
    if (Auth::check()) {
        $user = Auth::user();
        $chats = [];

        switch ($chat_type) {
            case 'all':
                $chatIds = $user->chats()->pluck('id');
                $chats = Chat::whereIn('id', $chatIds)->get();

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
                break;
                
            case 'groupchats':
                $chatIds = $user->groupchats()->pluck('id');
                $chats = Chat::whereIn('id', $chatIds)->get();

                foreach ($chats as $chat) {
                    if ($chat->last_message_sender) {
                        $chat->last_message_sender = User::find($chat->last_message_sender);
                    }
                }
                break;

            case 'dialogs':
                $chatIds = $user->dialogs()->pluck('id');
                $chats = Chat::whereIn('id', $chatIds)->get();

                foreach ($chats as $chat) {
                    $companionId = ChatMember::where('chat_id', $chat->id)
                                            ->where('member_id', '!=', Auth::id())
                                            ->pluck('member_id');
                    $chat->companion = User::find($companionId);
                }
                break;
        }

        return $chats;
    }
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