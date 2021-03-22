"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class BetSchema extends Schema {
  up() {
    this.create("bets", (table) => {
      table.increments();
      table.string("type").notNullable();
      table.float("price", 2).notNullable();
      table.string("date").notNullable();
      table.string("bets").notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("bets");
  }
}

module.exports = BetSchema;
