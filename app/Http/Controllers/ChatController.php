<?php

namespace App\Http\Controllers;

use App\Models\Chat;
use App\Models\ChatMessage;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ChatController extends Controller
{
    public function newMessage($chat_id, Request $request) {
        $messageData = $request->validate([
            "text" => "required"
        ]);

        $user = Auth::user();
        $chatMemebrship = $user->chats()->where('chat_id', $chat_id)->first();
        $chat = Chat::find($chatMemebrship->chat_id);

        if (!$user) return ["error" => 'not logged in'];
        if (!$chatMemebrship) return ["error" => 'user is not chat member'];

        $text = $request->input('text');

        $newMessage = new ChatMessage([
            'chat_id' => $chat_id,
            'text' => $text,
            'sender' => $user->id
        ]);
        $newMessage->save();

        if ($newMessage) {
            $chat->last_message_sender = $user->id;
            $chat->last_message = $text;
            $chat->save();
        }
    }

    public function checkChat($friendId, Request $request) {
        $user = Auth::user();
        if (! $user) return ["error" => 'user is not logged in'];

        $userChatsIds = $user->dialogs()->pluck('chat_id');
        $friend = User::find($friendId);
        
        $chat = $friend->dialogs()->whereIn('chat_id', $userChatsIds)->first();
        if ($chat) return ["url" => "/chats/$chat->chat_id"];

        $newChat = Chat::make(['chat_type' => 'dialog']);
        $newChat->save();

        $user->dialogs()->create([
            'chat_id' => $newChat->id,
            'chat_type' => 'dialog'
        ]);
        $friend->dialogs()->create([
            'chat_id' => $newChat->id,
            'chat_type' => 'dialog'
        ]);
        return ["url" => "/chats/$newChat->id"];
    }
}
