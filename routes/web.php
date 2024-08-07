<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RootController;
use App\Http\Controllers\ShortenerUrlController;
use Illuminate\Support\Facades\Route;

Route::get('/', RootController::class)->name('root');

Route::name('shortenerUrl.')->prefix('shortenerUrl')->group(function () {
    Route::get('/', [ShortenerUrlController::class, 'index'])->name('index');
    Route::get('/link/{shortenLink}', [ShortenerUrlController::class, 'shortenLink'])->name('link');
    Route::get('/create', [ShortenerUrlController::class, 'create'])->name('create');
    Route::post('/create', [ShortenerUrlController::class, 'store'])->name('store');
    Route::get('/edit/{id}', [ShortenerUrlController::class, 'show'])->name('show');
    Route::patch('/edit/{id}', [ShortenerUrlController::class, 'update'])->name('update');
    Route::delete('/delete/{id}', [ShortenerUrlController::class, 'destroy'])->name('destroy');
})->middleware('auth');

Route::name('profile.')->prefix('profile')->group(function (){
    Route::get('/', [ProfileController::class, 'edit'])->name('edit');
    Route::patch('/', [ProfileController::class, 'update'])->name('update');
    Route::delete('/', [ProfileController::class, 'destroy'])->name('destroy');
})->middleware('auth');


require __DIR__.'/auth.php';
