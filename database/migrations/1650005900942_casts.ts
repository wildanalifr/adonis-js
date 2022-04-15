import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Casts extends BaseSchema {
  protected tableName = 'casts'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table
        .integer('id_movie')
        .unsigned()
        .references('id')
        .inTable('movies')
        .onDelete('CASCADE')
        .notNullable()
      table
        .integer('id_actor')
        .unsigned()
        .references('id')
        .inTable('actors')
        .onDelete('CASCADE')
        .notNullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
