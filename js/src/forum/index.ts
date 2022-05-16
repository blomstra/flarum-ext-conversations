import app from 'flarum/forum/app';
import addSourceToCommentPost from './extend/addPostSourceToCommentPost';

app.initializers.add('blomstra/conversations', () => {
  addSourceToCommentPost();
});
