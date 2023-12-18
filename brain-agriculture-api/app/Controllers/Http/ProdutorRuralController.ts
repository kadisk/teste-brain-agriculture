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

function validarCPF(cpf: string): boolean {
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
        return false;
    }

    let soma = 0;
    let resto;

    for (let i = 1; i <= 9; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }

    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) {
        resto = 0;
    }
    if (resto !== parseInt(cpf.substring(9, 10))) {
        return false;
    }

    soma = 0;
    for (let i = 1; i <= 10; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }

    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) {
        resto = 0;
    }
    if (resto !== parseInt(cpf.substring(10, 11))) {
        return false;
    }

    return true;
}

function validarCNPJ(cnpj: string): boolean {
    if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) {
        return false;
    }

    let tamanho = cnpj.length - 2
    let numeros = cnpj.substring(0, tamanho);
    let digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;
    
    for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) pos = 9;
    }

    let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado !== parseInt(digitos.charAt(0))) {
        return false;
    }

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) pos = 9;
    }

    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado !== parseInt(digitos.charAt(1))) {
        return false;
    }

    return true;
}


export default class ProdutorRuralController {

    public async list({ response }: HttpContextContract) {
        const produtores = await ProdutorRural.query()
                                            .preload('culturas')
                                            .orderBy('id')
        return response.json(produtores)
    }

    public async register({ request, response }: HttpContextContract) {
        try{
            const data = request.only(PRODUTOR_RURAL_COLUMNS)

            const tipoDocumento = data.tipo_documento
            if(tipoDocumento === "cpf" || tipoDocumento === "cnpf"){
                const numeroDocumento = data.numero_documento.replace(/\D/g, '')
            
                if(validarCPF(numeroDocumento) || validarCNPJ(numeroDocumento)) {
                    data.numero_documento = numeroDocumento
                    const produtor = await ProdutorRural.create(data)
                    const culturaIds = request.input('culturaIds', [])
                    await produtor.related('culturas').attach(culturaIds)
                    return response.status(201).json(produtor)
                } else {
                    return response.status(400).json({ message: `verifique o numero do ${tipoDocumento}`})
                }
    
            } else {
                return response.status(400).json({ message: "Verifique o tipo documento" })
            }
        }catch(e){
            return response.status(500).json({ message: `Não foi poossivel cadastrar produtor rural`})
        }
        
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

            const culturaIds = request.input('culturaIds', [])
            await produtor.related('culturas').sync(culturaIds)

            return response.json(produtor)
        } catch (error) {
            return response.status(404).json({ message: NOT_FOUND_MESSAGE })
        }
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
