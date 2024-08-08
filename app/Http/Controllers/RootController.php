<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class RootController extends Controller
{
    public function __invoke(Request $request): RedirectResponse {
        return $request->user()
            ? redirect()->intended(route('shortenerUrl.index', absolute: true))
            : redirect()->to(route('login', absolute: true));
    }
}
