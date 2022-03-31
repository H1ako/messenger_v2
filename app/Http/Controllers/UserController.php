<?php

namespace App\Http\Controllers;

use App\Models\Friend;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function removeFriend(Request $request) {
        $user = Auth::user();
        if (! $user) return ["error" => 'user is not logged in'];

        $friendId = $request->input('friendId');
        $userFriendRelationship = $user->friends()->where('friend_id', $friendId)->first();
        if ($userFriendRelationship->relationship !== 'request') return;

        $friend = User::find($friendId);
        $friendUserRelationship = $friend->friends()->where('friend_id', $user->id)->first();
        
        $userFriendRelationship->relationship = 'request';
        $userFriendRelationship->save();

        $friendUserRelationship->relationship = 'request';
        $friendUserRelationship->save();
    }

    public function sendRequest(Request $request) {
        $user = Auth::user();
        if (! $user) return ["error" => 'user is not logged in'];

        $friendId = $request->input('friendId');
        if ($user->friends()->where('friend_id', $friendId)->exists()) return;

        $friend = User::find($friendId);

        $user->friends()->create([
            'request_from' => $user->id,
            'relationship' => 'request',
            'friend_id' => $friendId
        ]);
        $friend->friends()->create([
            'request_from' => $user->id,
            'relationship' => 'request',
            'friend_id' => $user->id
        ]);
    }

    public function cancelRequest(Request $request) {
        $user = Auth::user();
        if (! $user) return ["error" => 'user is not logged in'];

        $friendId = $request->input('friendId');

        $userFriendRelationship = $user->friends()->where('friend_id', $friendId)->first();
        if ($userFriendRelationship->relationship !== 'request') return;

        $friend = User::find($friendId);
        $friendUserRelationship = $friend->friends()->where('friend_id', $user->id)->first();

        Friend::destroy([$userFriendRelationship->id, $friendUserRelationship->id]);
    }

    public function acceptRequest(Request $request) {
        $user = Auth::user();
        if (! $user) return ["error" => 'user is not logged in'];

        $friendId = $request->input('friendId');
        $userFriendRelationship = $user->friends()->where('friend_id', $friendId)->first();
        if ($userFriendRelationship->relationship !== 'request') return;

        $friend = User::find($friendId);
        $friendUserRelationship = $friend->friends()->where('friend_id', $user->id)->first();
        
        $userFriendRelationship->relationship = 'friend';
        $userFriendRelationship->save();

        $friendUserRelationship->relationship = 'friend';
        $friendUserRelationship->save();
    }

    public function declineRequest(Request $request) {
        $user = Auth::user();
        if (! $user) return ["error" => 'user is not logged in'];

        $friendId = $request->input('friendId');

        $userFriendRelationship = $user->friends()->where('friend_id', $friendId)->first();
        if ($userFriendRelationship->relationship !== 'request') return;

        $friend = User::find($friendId);
        $friendUserRelationship = $friend->friends()->where('friend_id', $user->id)->first();

        Friend::destroy([$userFriendRelationship->id, $friendUserRelationship->id]);
    }
}
