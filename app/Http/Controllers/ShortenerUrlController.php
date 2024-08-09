<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Services\ShortenerUrlService;
use App\Http\Requests\ShortenerUrlCreateRequest;
use App\Http\Requests\ShortenerUrlUpdateRequest;

class ShortenerUrlController extends Controller
{
    /**
     * Create a new controller instance.
     */
    public function __construct(protected ShortenerUrlService $service) {}

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
            'token' => $request->session()->get('token'),
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
    public function create(Request $request)
    {
        return Inertia::render('ShortenerURL/Create', [
            'token' => $request->session()->get('token'),
        ]);
    }

    /**
    * @OA\Post(
    *     path="/api/shortenerUrl",
    *     tags={"shortenerUrl"},
    *     security={{"bearerAuth":{}}},
    *     @OA\RequestBody(
    *       required=true,
    *       description="Provide All Info Below",
    *       @OA\JsonContent(
    *           required={"title", "original_url"},
    *           @OA\Property(
    *               property="title",
    *               type="string",
    *               format="text",
    *               example="ShortenerUrl 1"
    *           ),
    *           @OA\Property(
    *               property="original_url",
    *               type="string",
    *               format="text",
    *               example="http://example.com"
    *           )
    *       )
    *     ),
    *     @OA\Response(
    *       response="200",
    *       description="Store a newly created resource in storage.",
    *       @OA\JsonContent(
    *           @OA\Property(
    *               property="id",
    *               type="string",
    *               format="text"
    *           )
    *       )
    *     )
    * )
    */
    public function store(ShortenerUrlCreateRequest $request)
    {
        $validated = $request->validated();
        $id =  $this->service->create($validated);
        return response()->json([
            'id' => $id
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, string $id)
    {
        $shortenerUrl = $this->service->findById($id);
        return Inertia::render('ShortenerURL/Edit', [
            'token' => $request->session()->get('token'),
            'item' => $shortenerUrl
        ]);
    }

    /**
    * @OA\Patch(
    *     path="/api/shortenerUrl/{id}",
    *     tags={"shortenerUrl"},
    *     security={{"bearerAuth":{}}},
    *     @OA\Parameter(
    *       parameter="id",
    *       name="id",
    *       description="The id of shortenerUrl",
    *       in="path",
    *       required=true
    *     ),
    *     @OA\RequestBody(
    *       required=true,
    *       description="Provide All Info Below",
    *       @OA\JsonContent(
    *           required={"title", "original_url"},
    *           @OA\Property(
    *               property="title",
    *               type="string",
    *               format="text",
    *               example="ShortenerUrl 1"
    *           ),
    *           @OA\Property(
    *               property="original_url",
    *               type="string",
    *               format="text",
    *               example="http://example.com"
    *           )
    *       )
    *     ),
    *     @OA\Response(
    *       response="200",
    *       description="Store a newly created resource in storage.",
    *       @OA\JsonContent(
    *           @OA\Property(
    *               property="id",
    *               type="string",
    *               format="text"
    *           )
    *       )
    *     )
    * )
    */
    public function update(ShortenerUrlUpdateRequest $request, string $id)
    {
        $validated = $request->validated();
        $id = $this->service->update($id, $validated);
        return response()->json([
            'id' => $id
        ]);
    }

    /**
     * Redirect to shortenLink.
     */
    public function shortenerLink(string $shortenerLink) {
        $shortenerUrl = $this->service->findByShortenerLink($shortenerLink);
        return redirect($shortenerUrl->original_url);
    }

    /**
    * @OA\Delete(
    *     path="/api/shortenerUrl/{id}",
    *     tags={"shortenerUrl"},
    *     security={{"bearerAuth":{}}},
    *     @OA\Parameter(
    *       parameter="id",
    *       name="id",
    *       description="The id of shortenerUrl",
    *       in="path",
    *       required=true
    *     ),
    *     @OA\Response(
    *       response="200",
    *       description="Store a newly created resource in storage.",
    *       @OA\JsonContent(
    *           @OA\Property(
    *               property="id",
    *               type="string",
    *               format="text"
    *           )
    *       )
    *     )
    * )
    */
    public function destroy(string $id)
    {
        $this->service->delete($id);
        return response()->json([
            'id' => $id
        ]);
    }
}
