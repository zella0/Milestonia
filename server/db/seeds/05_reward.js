
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('reward').del()
    .then(function () {
      // Inserts seed entries
      return knex('reward').insert([
        {reward_name: 'asdf reward 1', pts_required: 100, org_id: 1},
        {reward_name: 'asdf reward 2', pts_required: 200, org_id: 1},
        {reward_name: 'asdf reward 3', pts_required: 300, org_id: 1},
        {reward_name: 'asdf reward 4', pts_required: 400, org_id: 1},

        {reward_name: 'qwer reward 1', pts_required: 200, org_id: 2},
        {reward_name: 'qwer reward 2', pts_required: 400, org_id: 2},
        {reward_name: 'qwer reward 3', pts_required: 600, org_id: 2},
        {reward_name: 'qwer reward 4', pts_required: 800, org_id: 2},

        {reward_name: 'zxcv reward 1', pts_required: 400, org_id: 3},
        {reward_name: 'zxcv reward 2', pts_required: 600, org_id: 3},
        {reward_name: 'zxcv reward 3', pts_required: 800, org_id: 3},
        {reward_name: 'zxcv reward 4', pts_required: 1600, org_id: 3},
      ]);
    });
};
