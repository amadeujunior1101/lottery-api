"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class GameSchema extends Schema {
  up() {
    this.create("games", (table) => {
      table.increments();
      table.string("type").notNullable();
      table.string("description").notNullable();
      table.integer("range").notNullable();
      table.float("price", 8, 2).notNullable();
      table.integer("max_number").notNullable();
      table.string("color").notNullable();
      table.float("min_cart_value", 8, 2).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("games");
  }
}

module.exports = GameSchema;
