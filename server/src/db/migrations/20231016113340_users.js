/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable("users", (table) => {
    table.uuid("id").unique().notNullable().primary();
    table.string("fullname");
    table.string("username");
    table.string("password");
    table.string("email");
    table.string("profile_image");
    table.timestamps(true, true);
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.dropTable("users");
}
