'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up() {
    this.create('users', (table) => {
      table.increments().unsigned()
      table.string('full_name').notNullable()
      table.string('email').notNullable().unique()
      table.string('password')
      table
        .integer('profile_id')
        .notNullable()
        .unsigned()
        .index('profile_id')
      table
        .foreign('profile_id')
        .references('profiles.id')
        .onDelete('cascade')

      table.timestamps()
    })
  }

  down() {
    this.drop('users')
  }
}

module.exports = UserSchema
