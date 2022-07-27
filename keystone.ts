import { config, list } from '@keystone-6/core';
import { text, select, relationship } from '@keystone-6/core/fields';

export default config({
  db: {
    provider: 'mysql',
    url: 'mysql://root:root@localhost:3306/new_schema',
    onConnect: async context => { /* ... */ },
    // Optional advanced configuration
    enableLogging: true,
    useMigrations: true,
    idField: { kind: 'uuid' },
  },
  lists: {
    User: list({
      fields: {
        name: text({ validation: { isRequired: true } }),
        email: text({ validation: { isRequired: true }, isIndexed: 'unique' }),
        posts: relationship({ ref: 'Post.author', many: true }),
      },
    }),
    Post: list({
      fields: {
        title: text(),
        author: relationship({
          ref: 'User.posts'                    
        }),
        status: select({
          options: [
            { label: 'Published', value: 'published' },
            { label: 'Draft', value: 'draft' },
          ],
          defaultValue: 'draft',
          ui: { displayMode: 'segmented-control' }
        })
      },
    }),
  }
});