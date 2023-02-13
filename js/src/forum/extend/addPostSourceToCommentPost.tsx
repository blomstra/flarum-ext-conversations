import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import Model from 'flarum/common/Model';
import Post from 'flarum/common/models/Post';
import ItemList from 'flarum/common/utils/ItemList';
import CommentPost from 'flarum/forum/components/CommentPost';
import Tooltip from 'flarum/common/components/Tooltip';
import Button from 'flarum/common/components/Button';
import PostControls from 'flarum/forum/utils/PostControls';

import type Mithril from 'mithril';
import HtmlViewModal from '../components/HtmlViewModal';

export default function addSourceToCommentPost() {
  Post.prototype.source = Model.attribute('source');
  Post.prototype.sourceData = Model.attribute('source_data');
  Post.prototype.sourceRaw = Model.attribute('source_raw');

  extend(CommentPost.prototype, 'headerItems', function (items: ItemList<Mithril.Children>) {
    const source = this.attrs.post.source();
    const sourceData = this.attrs.post.sourceData();

    if (!source) {
      return;
    }

    const displayText = app.translator.trans('blomstra-conversations.forum.post.source.' + source);
    const className = 'ConversationSource';

    let element;

    if (source && !sourceData) {
      element = <span className={className}>{displayText}</span>;
    } else {
      element = (
        <Tooltip text={sourceData}>
          <span className={className}>{displayText}</span>
        </Tooltip>
      );
    }

    items.add('source', element, 90);
  });

  extend(PostControls, 'moderationControls', function (items: ItemList<Mithril.Children>, post: Post) {
    const sourceRaw = post.sourceRaw();

    if (sourceRaw) {
      items.add(
        'sourceRawHtml',
        <Button
          class="Button"
          icon="fas fa-file-code"
          onclick={() => {
            app.modal.show(HtmlViewModal, { sourceRaw, source: false });
          }}
        >
          {app.translator.trans('blomstra-conversations.forum.post.controls.view')}
        </Button>,
        85
      );

      items.add(
        'sourceRaw',
        <Button
          class="Button"
          icon="fas fa-file-code"
          onclick={() => {
            app.modal.show(HtmlViewModal, { sourceRaw, source: true });
          }}
        >
          {app.translator.trans('blomstra-conversations.forum.post.controls.view-code')}
        </Button>,
        80
      );
    }
  });
}
