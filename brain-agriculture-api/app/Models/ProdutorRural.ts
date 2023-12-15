import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class ProdutorRural extends BaseModel {

  public static table = 'produtores_rurais'

  @column({ isPrimary: true })
  public id: number

  @column()
  public cpf: string

  @column()
  public cnpj: string

  @column()
  public nomeProdutor: string

  @column()
  public nomeFazenda: string

  @column()
  public cidade: string

  @column()
  public estado: string

  @column()
  public areaTotalHectares: number

  @column()
  public areaAgricultavelHectares: number

  @column()
  public areaVegetacaoHectares: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
