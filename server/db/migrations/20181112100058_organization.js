
exports.up = function(knex, Promise) {
  return knex.schema.createTable('organization', (table)=>{
    table.increments();
    table.string('org_name').notNullable();
    table.string('icon_img');
    table.integer('org_total_pts');
    table.integer('org_current_pts').defaultTo(0);
    table.timestamps(true, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('organization');
};
