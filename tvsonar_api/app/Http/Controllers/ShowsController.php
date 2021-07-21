<?php

namespace App\Http\Controllers;

use App\Services\TvMazeService;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;

class ShowsController extends Controller
{
    protected $tvMazeService;

    public function __construct(TvMazeService $tvMazeService)
    {
        $this->tvMazeService = $tvMazeService;
    }

    /**
     * Searches shows in TVmaze.com
     *
     * @param Request $request
     * @return Collection
     */
    public function search(Request $request): Collection
    {
        $validated = $request->validate([ 'q' => 'required' ]);
        $response = $this->tvMazeService->searchShows($validated['q']);

        return $response;
    }

    /**
     * Retrieves a list of shows from TVmaze.com
     *
     * @param Request $request
     * @return Collection
     */
    public function list(Request $request): Collection
    {
        $validated = $request->validate([ 'q' => 'nullable|integer' ]);
        $response = $this->tvMazeService->listShows($validated['page'] ?? 1);

        return $response;
    }
}
