/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable("user_profile", (table) => {
    table.uuid("id").unique().notNullable().primary();
    table.uuid("user_id").references("id").inTable("users").onDelete("CASCADE");
    table.string("email");
    table.string("full_name");
    table.string("date_of_birth");
    table.string("address");
    table.timestamps(true, true);
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.dropTable("user_profile");
}
