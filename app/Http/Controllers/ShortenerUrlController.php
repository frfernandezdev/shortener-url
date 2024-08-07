<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\ShortenerUrl;
use App\Services\ShortenerUrlService;
use App\Http\Requests\ShortenerUrlCreateRequest;
use App\Http\Requests\ShortenerUrlUpdateRequest;

class ShortenerUrlController extends Controller
{
    /**
     * Create a new controller instance.
     */
    public function __construct(protected ShortenerUrlService $service) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search', null);
        $page = $request->input('page', 1);
        $perPage = $request->input('perPage', 10);
        $order = $request->input('order', 'id');
        $direction = $request->input('direction', 'asc');

        $paginator = $this->service->getAllFromCurrentUser($search, $page, $perPage, $order, $direction);

        return Inertia::render('ShortenerURL/List', [
            'csrf' => csrf_token(),
            'domain' => $request->root(),
            'paginator' => [
                'page' => $paginator->currentPage(),
                'perPage' => $paginator->perPage(),
                'items' => $paginator->items(),
                'nextPageUrl' => $paginator->nextPageUrl(),
                'previousPageUrl' => $paginator->previousPageUrl(),
                'hasMorePages' => $paginator->hasMorePages(),
                'total' => $paginator->total()
            ]
        ]);
    }

    /**
     * Display a create form fo the resource.
     */
    public function create()
    {
        return Inertia::render('ShortenerURL/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ShortenerUrlCreateRequest $request)
    {
        $validated = $request->validated();

        $this->service->create($validated);

        return redirect()->intended(route('shortenerUrl.index'));
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $shortenerUrl = $this->service->findById($id);
        return Inertia::render('ShortenerURL/Edit', ['item' => $shortenerUrl]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ShortenerUrlUpdateRequest $request, string $id)
    {
        $validated = $request->validated();

        $this->service->update($id, $validated);

        return redirect()->intended(route('shortenerUrl.index'));
    }

    /**
     * Redirect to shortenLink.
     */
    public function shortenLink(string $shortenLink) {
        $shortenerUrl = $this->service->findByShortenerLink($shortenLink);
        return redirect($shortenerUrl->original_url);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $this->service->delete($id);
        return redirect()->intended(route('shortenerUrl.index'));
    }
}
