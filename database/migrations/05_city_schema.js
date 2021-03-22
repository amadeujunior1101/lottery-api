'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CitySchema extends Schema {
  up() {
    this.create('cities', table => {
      table.increments();
      table.string('name', 255).notNullable()
      table
        .integer('uf_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('ufs')
        .onUpdate('CASCADE')
        .onDelete('NO ACTION')

      table.timestamps()
    });
  }

  down() {
    this.drop('cities')
  }
}

module.exports = CitySchema;
