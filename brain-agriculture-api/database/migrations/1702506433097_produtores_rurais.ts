import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'produtores_rurais'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('cpf', 11).unique().nullable() // CPF único e opcional
      table.string('cnpj', 14).unique().nullable() // CNPJ único e opcional
      table.string('nome_produtor').notNullable() // Nome do produtor obrigatório
      table.string('nome_fazenda').notNullable() // Nome da fazenda obrigatório
      table.string('cidade').notNullable() // Cidade obrigatória
      table.string('estado').notNullable() // Estado obrigatório
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
