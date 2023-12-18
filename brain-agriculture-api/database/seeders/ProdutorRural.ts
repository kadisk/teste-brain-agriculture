import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import ProdutorRural from 'App/Models/ProdutorRural'

export default class extends BaseSeeder {
    public async run() {

        const produtor1 = await ProdutorRural.create({
            nomeProdutor: "João Almeida",
            nomeFazenda: "Fazenda Horizonte Verde",
            tipoDocumento: "cpf",
            numeroDocumento: "32836577002",
            cidade: "Dourados",
            estado: "MS",
            areaVegetacaoHectares: 50,
            areaAgricultavelHectares: 150,
            areaTotalHectares: 200
        })
        await produtor1.related('culturas').attach([1, 2])


        const produtor2 = await ProdutorRural.create({
            nomeProdutor: "Maria Silva",
            nomeFazenda: "Rancho Sol Nascente",
            tipoDocumento: "cnpj", 
            numeroDocumento: "78839431000133",
            cidade: "Uberaba",
            estado: "MG",
            areaVegetacaoHectares: 70,
            areaAgricultavelHectares: 130,
            areaTotalHectares: 200
        })
        await produtor2.related('culturas').attach([4, 5])


        const produtor3 = await ProdutorRural.create({
            nomeProdutor: "Carlos Rocha",
            nomeFazenda: "Fazenda Terra Prometida",
            tipoDocumento: "cpf", 
            numeroDocumento: "28106677052",
            cidade: "Petrópolis",
            estado: "RJ",
            areaVegetacaoHectares: 20,
            areaAgricultavelHectares: 80,
            areaTotalHectares: 100
        })
        await produtor3.related('culturas').attach([4])


        const produtor4 = await ProdutorRural.create({
            nomeProdutor: "Luciana Barros",
            nomeFazenda: "Haras Lua Cheia",
            tipoDocumento: "cnpj", 
            numeroDocumento: "57520143000141",
            cidade: "Barreiras",
            estado: "BA",
            areaVegetacaoHectares: 100,
            areaAgricultavelHectares: 200,
            areaTotalHectares: 300
        })
        await produtor4.related('culturas').attach([1, 3])


        const produtor5 = await ProdutorRural.create({
            nomeProdutor: "Eduardo Lima",
            nomeFazenda: "Quinta do Arco-Íris",
            tipoDocumento: "cpf", 
            numeroDocumento: "08383027001",
            cidade: "Ponta Grossa",
            estado: "PR",
            areaVegetacaoHectares: 60,
            areaAgricultavelHectares: 140,
            areaTotalHectares: 200
        })
        await produtor5.related('culturas').attach([2])


        const produtor6 = await ProdutorRural.create({
            nomeProdutor: "Fernanda Gomes",
            nomeFazenda: "Chácara Estrela do Campo",
            tipoDocumento: "cnpj", 
            numeroDocumento: "58747492000163",
            cidade: "Campos do Jordão",
            estado: "SP",
            areaVegetacaoHectares: 40,
            areaAgricultavelHectares: 60,
            areaTotalHectares: 100
        })
        await produtor6.related('culturas').attach([4])

        const produtor7 = await ProdutorRural.create({
            nomeProdutor: "Roberto Nunes",
            nomeFazenda: "Fazenda Vento Leste",
            tipoDocumento: "cpf", 
            numeroDocumento: "95419502054",
            cidade: "Aracaju",
            estado: "SE",
            areaVegetacaoHectares: 30,
            areaAgricultavelHectares: 70,
            areaTotalHectares: 100
        })
        await produtor7.related('culturas').attach([5])

        const produtor8 = await ProdutorRural.create({
            nomeProdutor: "Beatriz Fontes",
            nomeFazenda: "Rancho Céu Azul",
            tipoDocumento: "cnpj", 
            numeroDocumento: "47266764000197",
            cidade: "Rondonópolis",
            estado: "MT",
            areaVegetacaoHectares: 120,
            areaAgricultavelHectares: 180,
            areaTotalHectares: 300
        })
        await produtor8.related('culturas').attach([1, 3])

        const produtor9 = await ProdutorRural.create({
            nomeProdutor: "Antônio Martins",
            nomeFazenda: "Sítio Flor de Lótus",
            tipoDocumento: "cpf", 
            numeroDocumento: "06845157090",
            cidade: "Goiânia",
            estado: "GO",
            areaVegetacaoHectares: 50,
            areaAgricultavelHectares: 150,
            areaTotalHectares: 200
        })
        await produtor9.related('culturas').attach([])

        const produtor10 = await ProdutorRural.create({
            nomeProdutor: "Juliana Costa",
            nomeFazenda: "Fazenda Águas Claras",
            tipoDocumento: "cnpj", 
            numeroDocumento: "57375499000139",
            cidade: "Viçosa",
            estado: "MG",
            areaVegetacaoHectares: 25,
            areaAgricultavelHectares: 75,
            areaTotalHectares: 100
        })
        await produtor10.related('culturas').attach([4])

        const produtor11 = await ProdutorRural.create({
            nomeProdutor: "Ricardo Souza",
            nomeFazenda: "Haras Pérola Negra",
            tipoDocumento: "cpf", 
            numeroDocumento: "43039972006",
            cidade: "Londrina",
            estado: "PR",
            areaVegetacaoHectares: 90,
            areaAgricultavelHectares: 210,
            areaTotalHectares: 300
        })
        await produtor11.related('culturas').attach([1, 2])

        const produtor12 = await ProdutorRural.create({
            nomeProdutor: "Daniela Oliveira",
            nomeFazenda: "Quinta das Oliveiras",
            tipoDocumento: "cpf", 
            numeroDocumento: "13411170069",
            cidade: "Teresina",
            estado: "PI",
            areaVegetacaoHectares: 80,
            areaAgricultavelHectares: 120,
            areaTotalHectares: 200
        })
        await produtor12.related('culturas').attach([3])

    }
}