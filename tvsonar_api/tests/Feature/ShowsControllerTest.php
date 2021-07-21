<?php

namespace Tests\Feature;

use App\Services\TvMazeService;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class ShowsControllerTests extends TestCase
{
    /**
     * Test seach shows endpoint
     *
     * @return void
     */
    public function test_search_shows()
    {
        $fakeResult = json_decode(file_get_contents(__DIR__."/../resources/search_shows.json"), true);

        Http::fake([
            TvMazeService::BASE_URL.TvMazeService::SEARCH_SHOWS_ENDPOINT => Http::response([$fakeResult, 200]),
        ]);

        $response = $this->get('/api/shows/search?q=Wife');

        $response->assertStatus(200);
        $response->assertJsonCount(3);
        $response->assertJsonFragment(["url" => "https://www.tvmaze.com/shows/16080/wife"]);
    }

    /**
     * Test list shows endpoint
     *
     * @return void
     */
    public function test_list_shows()
    {
        $fakeResult = json_decode(file_get_contents(__DIR__."/../resources/list_shows.json"), true);

        Http::fake([
            TvMazeService::BASE_URL.TvMazeService::LIST_SHOWS_ENDPOINT => Http::response([$fakeResult, 200]),
        ]);

        $response = $this->get('/api/shows/');

        $response->assertStatus(200);
        $response->assertJsonCount(245);
        $response->assertJsonFragment(["url" => "https://www.tvmaze.com/shows/250/kirby-buckets"]);
    }
}
