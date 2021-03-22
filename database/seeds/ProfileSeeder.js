"use strict";

const Database = use("Database");

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

class ProfileSeeder {
  async run() {
    await Database.table("profiles").insert([
      { id: 1, name: "Admin" },
      { id: 2, name: "Seller" },
      { id: 3, name: "Buyer" }
    ]);
  }
}

module.exports = ProfileSeeder;