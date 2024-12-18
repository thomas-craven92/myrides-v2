/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
  return knex.schema.createTable('events', (table) => {
    table.integer('id').primary()
    table.string('name')
    table.string('date')
    table.string('location')
    table.string('description')
    table.text('poster')
  })

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
  knex.schema.dropTable('events')
}

