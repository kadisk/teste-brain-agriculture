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

import validarCPF from "../../../utils/validarCPF"
import validarCNPJ from "../../../utils/validarCNPJ"

const evaluateRegistrationData = async ({
    request,
    response,
    onValidated
}) => {
    try{
        const data = request.only(PRODUTOR_RURAL_COLUMNS)

        const tipoDocumento = data.tipo_documento
        if(tipoDocumento === "cpf" || tipoDocumento === "cnpf"){
            const numeroDocumento = data.numero_documento.replace(/\D/g, '')
        
            if(validarCPF(numeroDocumento) || validarCNPJ(numeroDocumento)) {
                data.numero_documento = numeroDocumento
                const {area_vegetacao_hectares, area_agricultavel_hectares, area_total_hectares } = data
                if((area_vegetacao_hectares+area_agricultavel_hectares) <= area_total_hectares){
                    return onValidated(data)
                } else {
                    return response.status(400).json({ message: `a soma das áreas agricultável e de vegetação não pode ser maior que a área total`})
                }
            } else {
                return response.status(400).json({ message: `verifique o numero do ${tipoDocumento}`})
            }

        } else {
            return response.status(400).json({ message: "Verifique o tipo documento" })
        }
    }catch(e){
        return response.status(500).json({ message: `Não foi possivel cadastrar/atualizar produtor rural`})
    }
}

export default class ProdutorRuralController {

    public async list({ response }: HttpContextContract) {
        const produtores = await ProdutorRural.query()
                                            .preload('culturas')
                                            .orderBy('id')
        return response.json(produtores)
    }

    public async register({ request, response }: HttpContextContract) {
        return evaluateRegistrationData({
            request,
            response,
            onValidated: async (data) => {
                const produtor = await ProdutorRural.create(data)
                const culturaIds = request.input('culturaIds', [])
                await produtor.related('culturas').attach(culturaIds)
                return response.status(201).json(produtor)
            }
        })
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
        return evaluateRegistrationData({
            request,
            response,
            onValidated: async (data) => {
                const produtor = await ProdutorRural.findOrFail(params.id)
                produtor.merge(data)
                await produtor.save()
                const culturaIds = request.input('culturaIds', [])
                await produtor.related('culturas').sync(culturaIds)

                return response.json(produtor)
            }
        })
    }

    public async delete({ params, response }: HttpContextContract) {
        try {
            const produtor = await ProdutorRural.findOrFail(params.id)
            await produtor.related('culturas').detach()
            await produtor.delete()
            return response.status(200).json({ message: 'Produtor Rural removido com sucesso' })
        } catch (error) {
            return response.status(404).json({ message: NOT_FOUND_MESSAGE })
        }
    }
    
}

