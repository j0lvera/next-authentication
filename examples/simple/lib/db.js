const { Model }  = require("objection");
const Knex = require("knex");

// Initialize knex
const knex = Knex({
  client: "sqlite3",
  useNullAsDefault: true,
  connection: {
    filename: "db.sqlite3",
  },
});

Model.knex(knex);

// User model
class User extends Model {
  static get tableName() {
    return "users";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["username", "password"],

      properties: {
        id: { type: "integer" },
        username: { type: "string", minLength: 1, maxLength: 80 },
        password: { type: "string", minLength: 1, maxLength: 255 },
      },
    };
  }
}

async function createSchema() {
  if (await knex.schema.hasTable("users")) {
    return;
  }

  // Create database schema. You should use knex migration, but we create it
  // here for simplicity
  await knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("username");
    table.string("password");
  });
}

module.exports = { User, createSchema };