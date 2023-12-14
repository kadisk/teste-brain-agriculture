import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import ProdutorRural from 'App/Models/ProdutorRural'

export default class ProdutorRuralController {

    public async list({ response }: HttpContextContract) {
        const produtores = await ProdutorRural.all()
        return response.json(produtores)
    }

    public async register({ request, response }: HttpContextContract) {
        const data = request.only(['cpf', 'cnpj', 'nome_produtor', 'nome_fazenda', 'cidade', 'estado'])
        const produtor = await ProdutorRural.create(data)
        return response.status(201).json(produtor)
    }

    public async show({ params, response }: HttpContextContract) {
        try {
            const produtor = await ProdutorRural.findOrFail(params.id)
            return response.json(produtor)
        } catch (error) {
            return response.status(404).json({ message: 'Produtor Rural não encontrado' })
        }
    }

    public async update({ params, request, response }: HttpContextContract) {
        try {
            const produtor = await ProdutorRural.findOrFail(params.id)
            const data = request.only(['cpf', 'cnpj', 'nome_produtor', 'nome_fazenda', 'cidade', 'estado'])
            
            produtor.merge(data)
            await produtor.save()

            return response.json(produtor)
        } catch (error) {
            return response.status(404).json({ message: 'Produtor Rural não encontrado' })
        }
    }
}
