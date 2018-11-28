exports.up = function (knex, Promise) {
  return knex.schema.createTable('user_goals_progress', (table) => {
    table.increments();
    table.integer('goal_current_xp').defaultTo(0);
    table.string('completed_at');
    table.integer('user_id')
      .references('id')
      .inTable('user')
      .onDelete('cascade')
      .index();
    table.integer('goal_id')
      .references('id')
      .inTable('goal')
      .onDelete('cascade')
      .index();
    table.unique(['user_id', 'goal_id']);
    table.timestamps(true, true);
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('user_goals_progress');
};
