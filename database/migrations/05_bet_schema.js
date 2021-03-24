"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class BetSchema extends Schema {
  up() {
    this.create("bets", (table) => {
      table.increments();
      table.string("type").notNullable();
      table.float("price",8, 2).notNullable();
      table.string("date").notNullable();
      table.string("color").notNullable();
      table.string("numbers").notNullable();
      table.timestamps();

      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .notNullable();
    });
  }

  down() {
    this.drop("bets");
  }
}

module.exports = BetSchema;
