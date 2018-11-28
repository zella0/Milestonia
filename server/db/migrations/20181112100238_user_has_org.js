
exports.up = function(knex, Promise) {
  return knex.schema.createTable('user_has_org', (table)=>{
    table.increments();
    table.boolean('isAdmin');
    table.integer('user_id')
      .references('id')
      .inTable('user')
      .onDelete('cascade')
      .index();
    table.integer('org_id')
      .references('id')
      .inTable('organization')
      .onDelete('cascade')
      .index();
    table.unique(['user_id', 'org_id']);
    table.timestamps(true, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user_has_org');  
};
