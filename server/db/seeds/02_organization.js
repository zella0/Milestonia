
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('organization').del()
    .then(function () {
      // Inserts seed entries
      return knex('organization').insert([
        {org_name: 'asdf', org_total_pts: 1000},
        {org_name: 'qwer', org_total_pts: 2000},
        {org_name: 'zxcv', org_total_pts: 3000},
        {org_name: 'tyui', org_total_pts: 4000},
        {org_name: 'ghjk', org_total_pts: 5000},
      ]);
    });
};