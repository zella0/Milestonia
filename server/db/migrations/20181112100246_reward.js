
exports.up = function (knex, Promise) {
  return knex.schema.createTable('reward', (table)=>{
    table.increments();
    table.string('reward_name');
    table.integer('pts_required').notNullable();
    table.integer('org_id')
      .references('id')
      .inTable('organization')
      .onDelete('cascade')
      .index();
    table.timestamps(true, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('reward');  
};
