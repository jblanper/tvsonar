<?php

namespace Tests\Unit;

use App\Serializers\ShowsSerializer;
use Tests\TestCase;

class ShowsSerializarTest extends TestCase
{
    /**
     * Test show serializer
     *
     * @return void
     */
    public function test_shows_serializer()
    {
        $unfilterdResult = json_decode(file_get_contents(__DIR__."/../resources/search_shows_unfiltered.json"), true);

        $serializer = new ShowsSerializer();
        $data = $serializer($unfilterdResult);

        $this->assertEquals(2, $data->count());
        $this->assertEquals(6, $data->get(0)->count());
        $this->assertTrue($data->get(0)->has(['id', 'name', 'url', 'genres', 'image', 'summary']));
    }
}
