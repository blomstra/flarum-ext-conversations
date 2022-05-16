<?php

namespace Blomstra\Conversations\Listener;

use Flarum\Post\Event\Saving;
use Illuminate\Support\Arr;

class SavePostSourceToDatabase
{
    public function handle(Saving $event): void
    {
        if ($source = Arr::get($event->data, 'attributes.source')) {
            $event->post->source = $source;
        }

        if ($sourceData = Arr::get($event->data, 'attributes.source-data')) {
            $event->post->source_data = $sourceData;
        }
    }
}
