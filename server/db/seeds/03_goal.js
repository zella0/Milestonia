
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('goal').del()
    .then(function () {
      // Inserts seed entries
      return knex('goal').insert([
        {goal_name: 'asdf goal 1', goal_total_xp: 100, start_date: "2018-11-14T10:24:19.373Z", finish_date: "2018-11-15T10:24:19.373Z", top_priority: true, org_id: 1},
        {goal_name: 'asdf goal 2', goal_total_xp: 200, start_date: "2018-11-14T10:24:19.373Z", finish_date: "2018-11-15T10:24:19.373Z", top_priority: false, org_id: 1},
        {goal_name: 'asdf goal 3', goal_total_xp: 300, start_date: "2018-11-14T10:24:19.373Z", finish_date: "2018-11-15T10:24:19.373Z", top_priority: true, org_id: 1},
      ]);
    });
};