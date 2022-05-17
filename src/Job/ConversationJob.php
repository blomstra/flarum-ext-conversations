<?php

namespace Blomstra\Conversations\Job;

use Flarum\Discussion\Command\StartDiscussion;
use Flarum\Discussion\Discussion;
use Flarum\Post\Command\PostReply;
use Flarum\Post\Post;
use Flarum\Queue\AbstractJob;
use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\Tags\Tag;
use Flarum\User\User;
use Illuminate\Contracts\Bus\Dispatcher;

class ConversationJob extends AbstractJob
{
    public static ?string $onQueue = null;

    protected string $sourceId = '';
    
    public function __construct(protected SettingsRepositoryInterface $settings)
    {
        if (static::$onQueue) {
            $this->onQueue(static::$onQueue);
        }
    }

    /**
     * Create a new discussion from the given source.
     *
     * @param string $title
     * @param string $content
     * @param User $author
     * @param string $source
     * @param string $sourceData
     * @param Tag|null $tag
     * @return Discussion
     */
    public function startDiscussionFromSource(string $title, string $content, User $author, string $source, string $sourceData, Tag $tag = null): Discussion
    {
        $data = [
            'attributes' => [
                'title'        => $title,
                'content'      => $content,
                'source'       => $source,
                'source-data'  => $sourceData,
            ],
        ];
        
        if ($tag) {
            $data = $this->addTagRelationshipData($tag, $data);
        }

        return resolve(Dispatcher::class)->dispatch(new StartDiscussion($author, $data, '127.0.0.1'));
    }

    /**
     * Reply to the given discussion from the source.
     *
     * @param Discussion $discussion
     * @param string $content
     * @param User $author
     * @param string $source
     * @param string $sourceData
     * @return Post
     */
    public function replyToDiscussionFromSource(Discussion $discussion, string $content, User $author, string $source, string $sourceData): Post
    {
        $data = [
            'attributes' => [
                'content'      => $content,
                'source'       => $source,
                'source-data'  => $sourceData,
            ],
        ];

        return resolve(Dispatcher::class)->dispatch(new PostReply($discussion->id, $author, $data, '127.0.0.1'));
    }

    /**
     * Add the tag relationship data.
     *
     * @param Tag $tag
     * @param array $data
     * @return array
     */
    private function addTagRelationshipData(Tag $tag, array $data): array
    {
        return array_merge($data, [
            'relationships' => [
                'tags' => [
                    'data' => [
                        [
                            'id'   => $tag->id,
                            'type' => 'tags',
                        ],
                    ],
                ],
            ],
        ]);
    }
}
