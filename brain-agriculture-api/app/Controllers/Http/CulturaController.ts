import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cultura from 'App/Models/Cultura'

export default class CulturaController {
    public async list({ response }: HttpContextContract) {
        const culturas = await Cultura.all()
        return response.json(culturas)
    }
}
