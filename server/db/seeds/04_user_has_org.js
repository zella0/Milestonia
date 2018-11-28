
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('user_has_org').del()
    .then(function () {
      // Inserts seed entries
      return knex('user_has_org').insert([
        {user_id: 1, org_id: 1, isAdmin: true},
        {user_id: 2, org_id: 1, isAdmin: false},
        {user_id: 3, org_id: 1, isAdmin: false},
        {user_id: 4, org_id: 1, isAdmin: false},
        {user_id: 5, org_id: 1, isAdmin: false},

        {user_id: 1, org_id: 2, isAdmin: false},
        {user_id: 2, org_id: 2, isAdmin: true},
        {user_id: 3, org_id: 2, isAdmin: false},
        {user_id: 4, org_id: 2, isAdmin: false},
        {user_id: 5, org_id: 2, isAdmin: false},

        {user_id: 1, org_id: 3, isAdmin: false},
        {user_id: 2, org_id: 3, isAdmin: false},
        {user_id: 3, org_id: 3, isAdmin: true},
        {user_id: 4, org_id: 3, isAdmin: false},
        {user_id: 5, org_id: 3, isAdmin: false},
      ]);
    });
};
