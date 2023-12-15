import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import Cultura from './Cultura'

export default class ProdutorRural extends BaseModel {

  public static table = 'produtores_rurais'

  @column({ isPrimary: true })
  public id: number

  @column()
  public tipoDocumento: string

  @column()
  public numeroDocumento: string

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

  @manyToMany(() => Cultura, {
    pivotTable: 'produtor_rural_culturas'
  })
  public culturas: ManyToMany<typeof Cultura>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
