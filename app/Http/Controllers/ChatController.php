<?php

namespace App\Http\Controllers;

use App\Models\Chat;
use App\Models\ChatMessage;
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
}
