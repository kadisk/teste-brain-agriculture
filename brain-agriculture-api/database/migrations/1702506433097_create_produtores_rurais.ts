import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'produtores_rurais'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('tipo_documento', 4).notNullable()
      table.string('numero_documento', 14).notNullable()
      table.string('nome_produtor').notNullable()
      table.string('nome_fazenda').notNullable()
      table.string('cidade').notNullable() 
      table.string('estado', 2).notNullable() 
      table.integer('area_total_hectares').defaultTo(0).notNullable()
      table.integer('area_agricultavel_hectares').defaultTo(0).notNullable()
      table.integer('area_vegetacao_hectares').defaultTo(0).notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
