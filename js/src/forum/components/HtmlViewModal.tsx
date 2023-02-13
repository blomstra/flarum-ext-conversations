import Modal from 'flarum/common/components/Modal';
import app from 'flarum/forum/app';

export default class HtmlViewModal extends Modal {
  className(): string {
    return 'HtmlViewModal Modal--large';
  }

  title() {
    return app.translator.trans('blomstra-conversations.forum.post.source-raw-heading');
  }

  content() {
    const sourceRaw = this.attrs.sourceRaw;
    const viewSource = this.attrs.source;

    if (viewSource) {
      return (
        <div className="Modal-body">
          <code>{sourceRaw}</code>
        </div>
      );
    }

    return <div className="Modal-body">{m.trust(sourceRaw)}</div>;
  }
}
