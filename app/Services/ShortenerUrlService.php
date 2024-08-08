<?php

namespace App\Services;

use App\Models\ShortenerUrl;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class ShortenerUrlService
{
    /**
     * Create a new class instance.
     */
    public function __construct() { }

    public function findById(string $id) {
        return ShortenerUrl::find($id);
    }

    public function findByShortenerLink(string $shortenLink) {
        return ShortenerUrl::where('code', $shortenLink)->first();
    }

    public function getAllFromCurrentUser(string|null $search, int $page, int $perPage, string $order, string $direction)
    {
        $user_id  = Auth::id();
        $query = ShortenerUrl::query();

        $query->where('user_id', $user_id);
        $query->where('disabled', false);
        $query->orderBy($order, $direction);

        return $query->paginate($perPage, ['*'], 'page', $page);
    }

    public function create(array $payload): int {
        $user = User::find(Auth::id());

        $shortenerUrl = new ShortenerUrl;
        $shortenerUrl->fill($payload);
        $shortenerUrl->code = substr(str_replace('-', '', Str::uuid()), 0, 8);
        $shortenerUrl->user()->associate($user);
        $shortenerUrl->save();

        return $shortenerUrl->id;
    }

    public function update(string $id, array $payload): int {
        $shortenerUrl = ShortenerUrl::find($id);
        $shortenerUrl->update($payload);

        return $shortenerUrl->id;
    }

    public function delete(string $id): int {
        $shortenerUrl = ShortenerUrl::find($id);
        $shortenerUrl->update(['disabled' => true]);

        return $shortenerUrl->id;
    }
}
