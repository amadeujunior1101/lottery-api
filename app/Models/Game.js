"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Game extends Model {
  // add relacionamento bet
  bet() {
    return this.belongsTo("App/Models/Bet");
  }
}

module.exports = Game;
