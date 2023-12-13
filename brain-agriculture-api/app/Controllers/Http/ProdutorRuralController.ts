import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import ProdutorRural from 'App/Models/ProdutorRural'

export default class ProdutorRuralController {

    public async list({ response }: HttpContextContract) {
        const produtores = await ProdutorRural.all()
        return response.json(produtores)
    }

    public async register({ request, response }: HttpContextContract) {
        const dados = request.only(['cpf', 'cnpj', 'nomeProdutor', 'nomeFazenda', 'cidade', 'estado'])
        const produtor = await ProdutorRural.create(dados)
        return response.status(201).json(produtor)
    }
}
