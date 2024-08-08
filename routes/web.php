<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RootController;
use App\Http\Controllers\ShortenerUrlController;
use Illuminate\Support\Facades\Route;

Route::get('/', RootController::class)->name('root');

Route::middleware('auth')
    ->prefix('shortenerUrl')
    ->name('shortenerUrl.')
    ->group(function () {
        Route::get('/', [ShortenerUrlController::class, 'index'])->name('index');
        Route::get('/create', [ShortenerUrlController::class, 'create'])->name('create');
        Route::get('/edit/{id}', [ShortenerUrlController::class, 'show'])->name('show');
    });

Route::middleware('auth')
    ->prefix('profile')
    ->name('profile.')
    ->group(function (){
        Route::get('/', [ProfileController::class, 'edit'])->name('edit');
        Route::patch('/', [ProfileController::class, 'update'])->name('update');
        Route::delete('/', [ProfileController::class, 'destroy'])->name('destroy');
    });


require __DIR__.'/auth.php';
