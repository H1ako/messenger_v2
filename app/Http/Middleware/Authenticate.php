<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Auth\Middleware\Authenticate as Middleware;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    protected function redirectTo($request, Closure $next)
    {
        if (! $request->expectsJson() && !in_array($request->path(), ['login/sign-in', 'login/sign-up'])) {
            return 'login/sign-in';
        }
    }
}
