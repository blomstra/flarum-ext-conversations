import app from 'flarum/admin/app';

app.initializers.add('blomstra/conversations', () => {
  app.extensionData
    .for('blomstra-conversations')
    .registerPermission(
      {
        icon: 'fas fa-bullseye',
        label: app.translator.trans('blomstra-conversations.admin.permissions.view-conversation-source'),
        permission: 'discussion.viewConversationSource',
      },
      'moderate',
      55
    )
    .registerPermission(
      {
        icon: 'fas fa-file-code',
        label: app.translator.trans('blomstra-conversations.admin.permissions.view-raw-source'),
        permission: 'discussion.viewRawSource',
      },
      'moderate',
      54
    );
});
