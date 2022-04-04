<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function signUp(Request $request) {
        $email = $request->input('email');
        // check if there is a user with this email
        if (User::where('email', $email)->exists()) {
            return json_encode(['error' => 'email is used']);
        }

        $validatedData = $request->validate([
            'picture' => 'image',
            'name' => 'required',
            'surname' => 'required',
            'email' => 'email|required|unique:users',
            'password' => 'required|min:8'
        ]);
        
        $newUser = User::make($validatedData);
        if (!$newUser) {
            return json_encode(['error' => 'wrong incoming data']);
        }

        $newUser->password = Hash::make($request->input('password'));
        $newUser->save();

        if ($request->hasFile('picture')) {
            $file = $request->file('picture');
            $destinationPath = 'users/avatars';
            $extension = $file->getClientOriginalExtension();
            $fileName = $newUser->id . "." . $extension;
        
            $file->move($destinationPath, $fileName);
        
            $newUser->picture = '/' . $destinationPath . '/' . $fileName;
            $newUser->save();
        }
        

        Auth::login($newUser, true);
        return json_encode([
            "url" => '/',
            "user" => $newUser
        ]);
    }

    public function signIn(Request $request) {
        $email = $request->input('email');
        $password = $request->input('password');
        $signInAttempt = Auth::attempt(['email' => $email, 'password' => $password]);

        if ($signInAttempt) {
            return json_encode([
                "url" => '/',
                "user" => Auth::user()
            ]);
        }

        return json_encode(["error" => 'wrong incoming data']);
    }

    public function signOut(Request $request) {
        if (Auth::check()) {
            Auth::logout();
            return json_encode(["url" => '/sign-in']);
        }

        return json_encode(["error" => 'not logged in']);
    }
}
