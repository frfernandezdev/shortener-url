<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ShortenerUrl extends Model
{
    use HasFactory;

    protected $fillable = [
        'code',
        'title',
        'original_url',
        'shortener_url',
        'disabled',
    ];

    public function user(): BelongsTo {
        return $this->belongsTo(User::class);
    }
}
