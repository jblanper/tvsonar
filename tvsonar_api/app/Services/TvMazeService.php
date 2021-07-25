<?php

namespace App\Services;

use App\Serializers\ShowsSerializer;
use Carbon\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class TvMazeService
{
    const BASE_URL = 'https://api.tvmaze.com';
    const SEARCH_SHOWS_ENDPOINT = '/search/shows';
    const LIST_SHOWS_ENDPOINT = '/shows';

    /**
     * Retrieves a list of available shows in TVmaze.com
     *
     * @param integer $page
     * @return Collection
     */
    public function listShows(int $page): Collection
    {
        return $this->cachedHttpGet(
            self::LIST_SHOWS_ENDPOINT,
            ['page' => $page],
            Carbon::now()->addDay(),
            new ShowsSerializer
        );
    }

    /**
     * Searches shows in TVmaze.com
     *
     * @param string $query
     * @return Collection
     */
    public function searchShows(string $query): Collection
    {
        $shows = $this->cachedHttpGet(
            self::SEARCH_SHOWS_ENDPOINT,
            ['q' => $query],
            Carbon::now()->addHours(2),
            new ShowsSerializer
        );

        return $shows
            ->filter(fn($show) => Str::startsWith(Str::lower($show->get('name')), Str::lower($query)))
            ->values();
    }

    /**
     * Retrieves information from TVmaze.com's api and caches it
     *
     * @param string $endpoint
     * @param array $queryParams
     * @param Carbon $expire_at
     * @return Collection
     */
    private function cachedHttpGet(string $endpoint, array $queryParams, Carbon $expire_at, callable $serializer): Collection
    {
        $cacheName = str_replace('/', '_', substr($endpoint, 1))."_".implode('_', $queryParams);

        return Cache::remember($cacheName, $expire_at, function() use ($endpoint, $queryParams, $serializer) {
            $response = Http::get(
                self::BASE_URL.$endpoint,
                $queryParams
            );
            return $serializer($response->json());
        });
    }
}