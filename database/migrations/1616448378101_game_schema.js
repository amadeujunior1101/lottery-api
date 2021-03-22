"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class GameSchema extends Schema {
  up() {
    this.create("games", (table) => {
      table.increments();
      table.string("type").notNullable();
      table.string("description").notNullable();
      table.decimal("range").notNullable();
      table.float("price", 2).notNullable();
      table.decimal("max-number").notNullable();
      table.string("color").notNullable();
      table.decimal("min-cart-value").notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("games");
  }
}

module.exports = GameSchema;
