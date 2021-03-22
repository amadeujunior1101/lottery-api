'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserDetailsSchema extends Schema {
  up() {
    this.create('user_details', (table) => {
      table.increments()
      table.string('cell_phone')
      table.string('cpf')
      table.string('street')
      table.string('street_number')
      table.string('district')
      table.string('zip_code')
      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .integer('city_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('cities')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.timestamps()
    })
  }

  down() {
    this.drop('user_details')
  }
}

module.exports = UserDetailsSchema
