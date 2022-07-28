import { config, list } from '@keystone-6/core';
import { text, select, relationship } from '@keystone-6/core/fields';

export default config({
  db: {
    provider: 'postgresql',
    url: 'postgres://tvpcviokodnupv:d1a2529361b066bc24021479095aeac5af42b6de8223cc59639d295c6b6997e0@ec2-44-208-88-195.compute-1.amazonaws.com:5432/ddkc184m5a00dn',
    shadowDatabaseUrl: 'postgres://tvpcviokodnupv:d1a2529361b066bc24021479095aeac5af42b6de8223cc59639d295c6b6997e0@ec2-44-208-88-195.compute-1.amazonaws.com:5432/ddkc184m5a00dn',
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