
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('user').del()
    .then(function () {
      // Inserts seed entries
      return knex('user').insert([
        {
          email: 'asdf@asdf.com',
          username: 'asdf',
          first_name: 'as',
          last_name: 'df',
          password: '$2a$10$0YYLm9wdD6Ia2Q6q5KXFKuhqOFaEukxr1xV/fH9uaYImRUS1eQE0q'
        },
        {email: 'qwer@qwer.com', username: 'qwer', first_name: 'qw', last_name: 'er', password: 'qwer'},
        {email: 'zxcv@zxcv.com', username: 'zxcv', first_name: 'zx', last_name: 'cv', password: 'zxcv'},
        {email: 'tyui@tyui.com', username: 'tyui', first_name: 'ty', last_name: 'ui', password: 'tyui'},
        {email: 'ghjk@ghjk.com', username: 'ghjk', first_name: 'gh', last_name: 'jk', password: 'ghjk'},
      ]);
    });
};
