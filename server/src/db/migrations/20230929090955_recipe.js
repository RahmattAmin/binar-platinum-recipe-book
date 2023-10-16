/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable("recipe", (table) => {
    table.uuid("id").unique().primary();
    table.text("title").notNullable();
    table.text("ingredients").notNullable();
    table.text("instruction").notNullable();
    table.string("caption").notNullable();
    table.string("category").notNullable();
    table.uuid("users_id").references("id").inTable("users");
    table.text("img_filename");
    table.timestamps(true, true);
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.dropTable("recipe");
}
