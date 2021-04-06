"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use("Hash");

class User extends Model {
  static boot() {
    super.boot();

    this.addHook("beforeSave", this.beforeSave);
  }

  static async beforeSave(userInstance) {
    if (userInstance.dirty.full_name && userInstance.dirty.password) {
      userInstance.full_name = userInstance.full_name
        .trim()
        .replace(/\s{2,}/g, " ")
        .replace(/[^a-zA-ZÀ-ú ]/g, "")
        .toUpperCase();

      userInstance.password = await Hash.make(userInstance.password);
    }
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens() {
    return this.hasMany("App/Models/Token");
  }
  // add relacionamento bet
  bet() {
    return this.belongsTo("App/Models/Bet");
  }
}

module.exports = User;
