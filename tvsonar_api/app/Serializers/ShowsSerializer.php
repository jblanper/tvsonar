<?php

namespace App\Serializers;

use Illuminate\Http\Client\Response;
use Illuminate\Support\Collection;

class ShowsSerializer
{
    /**
     * Turn the response into a collection an filters the data of each show
     *
     * @param array $attributes
     * @return Collection
     */
    public function __invoke(array $attributes): Collection
    {
        $data = collect($attributes)->map(fn($item) => collect($item));
        $hasShows = $data->get(0)->contains(fn($value, $key) => in_array($key, ['show', 'name']));

        if ($hasShows) {
            $data = $data->map(function($item) {
                $show = $item->has('show') 
                    ? collect($item->get('show')) 
                    : $item;
                return $show->only(['id', 'name', 'url', 'genres', 'image', 'summary']);
            });
        }

        return $data;
    }
}