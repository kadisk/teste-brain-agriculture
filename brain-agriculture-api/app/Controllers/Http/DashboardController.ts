import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import ProdutorRural from 'App/Models/ProdutorRural'

export default class DashboardController {

    public async totalFazendas({ response }: HttpContextContract) {
        const totalFazendas = await ProdutorRural.query().count('* as total')
        return response.json({ totalFazendas: totalFazendas[0].$extras.total })

    }
    
    public async totalHectares({ response }: HttpContextContract) {
        const totalHectares = await ProdutorRural.query().sum('area_total_hectares as total')
        return response.json({ totalHectares: totalHectares[0].$extras.total })

    }
    
}
