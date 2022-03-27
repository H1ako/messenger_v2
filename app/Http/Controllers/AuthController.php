<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function signUp(Request $request) {
        $email = $request->input('email');

        // check if there is a user with this email
        if (User::where('email', $email)->first()) {
            return json_encode(['error' => 'email is used']);
        }
        $newUserData = [
            'picture' => $request->input('picture'),
            'name' => $request->input('name'),
            'surname' => $request->input('surname'),
            'email' => $email,
            'password' => md5($request->input('password'))
        ];
        $newUser = new User($newUserData);

        $newUser->save();
        Auth::login($newUser, true);
        return json_encode(["url" => '/']);
    }

    public function signIn(Request $request) {
        $email = $request->input('email');
        $password = md5($request->input('password'));
        $user = User::where('email', $email)->first();

        if ($user && $user->password == $password) {
            Auth::login($user, true);
        }

        return json_encode(["url" => '/']);
    }

    public function signOut(Request $request) {
        Auth::logout();
    }
}
