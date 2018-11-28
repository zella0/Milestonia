
exports.up = function (knex, Promise) {
  return knex.schema.createTable('goal', (table)=>{
    table.increments();
    table.string('goal_name').notNullable().unique();
    table.integer('goal_total_xp').notNullable();
    table.string('start_date').notNullable();
    table.string('finish_date').notNullable();
    table.boolean('top_priority').defaultTo(false);
    table.string('status').defaultTo('New');
    table.integer('org_id')
      .references('id')
      .inTable('organization')
      .onDelete('cascade')
      .index();
    table.timestamps(true, true);
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('goal');
};
