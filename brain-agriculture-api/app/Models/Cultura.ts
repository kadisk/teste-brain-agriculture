import { BaseModel, column, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import ProdutorRural from './ProdutorRural'

export default class Cultura extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nome: string

  @manyToMany(() => ProdutorRural, {
    pivotTable: 'produtor_rural_culturas'
  })
  public produtoresRurais: ManyToMany<typeof ProdutorRural>
}