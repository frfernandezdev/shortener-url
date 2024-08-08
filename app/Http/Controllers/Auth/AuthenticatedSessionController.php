<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();
        $token = $request->user()->createToken('token');
        $request->session()->regenerate();
        $request->session()->put('tokenId', $token->accessToken->id);
        $request->session()->put('token', $token->plainTextToken);
        return redirect()->intended(route('shortenerUrl.index', absolute: false));
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();
        $tokenId = $request->session()->get('tokenId');
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        $request->user()->tokens()->where('id', $tokenId)->delete();
        return redirect('/');
    }
}
