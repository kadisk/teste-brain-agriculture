import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import ProdutorRural from 'App/Models/ProdutorRural'

const PRODUTOR_RURAL_COLUMNS = [
    'nome_produtor',
    'tipo_documento',
    'numero_documento',
    'nome_fazenda',
    'cidade',
    'estado',
    'area_total_hectares',
    'area_agricultavel_hectares',
    'area_vegetacao_hectares'
]

const NOT_FOUND_MESSAGE = "Produtor Rural não encontrado"

export default class ProdutorRuralController {

    public async list({ response }: HttpContextContract) {
        const produtores = await ProdutorRural.all()
        return response.json(produtores)
    }

    public async register({ request, response }: HttpContextContract) {
        const data = request.only(PRODUTOR_RURAL_COLUMNS)
        const produtor = await ProdutorRural.create(data)
        const culturaIds = request.input('culturaIds', [])
        await produtor.related('culturas').attach(culturaIds)
        return response.status(201).json(produtor)
    }

    public async show({ params, response }: HttpContextContract) {
        try {
            const produtor = await ProdutorRural.query()
                .where('id', params.id)
                .preload('culturas')
                .firstOrFail()
            return response.json(produtor)
        } catch (error) {
            return response.status(404).json({ message: NOT_FOUND_MESSAGE })
        }
    }

    public async update({ params, request, response }: HttpContextContract) {
        try {
            const produtor = await ProdutorRural.findOrFail(params.id)
            const data = request.only(PRODUTOR_RURAL_COLUMNS)
            
            produtor.merge(data)
            await produtor.save()

            return response.json(produtor)
        } catch (error) {
            return response.status(404).json({ message: NOT_FOUND_MESSAGE })
        }
    }
}
