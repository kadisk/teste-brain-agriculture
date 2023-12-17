"use client"
import React, { useEffect, useState } from 'react'
import { Pie } from 'react-chartjs-2'
import 'chart.js/auto'

import {
	Badge,
    Card,
    Row
} from 'react-bootstrap'

import getTotalFazendas from "../api/getTotalFazendas"
import getTotalHectares from "../api/getTotalHectares"
import getAllProdutorRural from "../api/getAllProdutorRural"

const groupByProperty = (produtorRuralList:any, property:string) => {
    return produtorRuralList.reduce((acc:any, produtorRural:any) => {
        return {
            ...acc,
            [produtorRural[property]]:[
                ...(acc[produtorRural[property]]||[]), produtorRural
            ]
        }
    }, {})
}

const aggregateByTotalItem = (group:any) => {
    return Object
        .keys(group)
        .reduce((acc:any, property:string) => {
            return {
                ...acc,
                [property]: group[property].length
            }
        }, {})
}

const aggregateUsoDoSolo = (produtorRuralList:any) => {
    return produtorRuralList
     .reduce((acc:any, produtorRural:any) => {

        acc["area_total_hectares"] += produtorRural["area_total_hectares"]
        acc["area_agricultavel_hectares"] += produtorRural["area_agricultavel_hectares"]
        acc["area_vegetacao_hectares"] += produtorRural["area_vegetacao_hectares"]

        return acc
     }, {
        "area_total_hectares": 0,
        "area_agricultavel_hectares": 0,
        "area_vegetacao_hectares": 0
     })
}

const aggregateTotalCulturas = (produtorRuralList:any) => {

    const _AddCulturas = (acc:any, culturas:any[]) => {
        return culturas.reduce((newAcc, {nome}) => {
            if(newAcc[nome]){
                newAcc[nome] += 1
            } else {
                newAcc[nome] = 1
            }

            return newAcc
        }, acc) 
    }

    return produtorRuralList
        .reduce((acc:any, {culturas}:any) => {
            return _AddCulturas(acc, culturas)
    }, {})

}

const countArrayByProperty = (arrObj:any, property:string) => {
    return arrObj.reduce((acc:number, obj:string) => {
        return acc + parseInt(obj[property])
    }, 0)
}

const aggregateCountField = (group:any, fieldName:string) => {
    return Object
    .keys(group)
    .reduce((acc:any, property:string) => {
        return {
            ...acc,
            [property]: countArrayByProperty(group[property], fieldName)
        }
    }, {})
}



const FazendaPorEstadoChart = ({produtorRuralList}:any) => {

    
    const createGraphData = () => {
        
        const produtorRuralByEstado = groupByProperty(produtorRuralList, "estado")
        const totalFazendaPorEstadoAggregate = aggregateByTotalItem(produtorRuralByEstado)

        return {
            labels: Object.keys(totalFazendaPorEstadoAggregate),
            datasets: [
                {
                    data: Object.values(totalFazendaPorEstadoAggregate),
                    borderWidth: 1,
                }
            ]
        }
    }

    return <Card className="text-center" style={{width:"450px"}}>
      <Card.Header>Quantidade de Fazendas</Card.Header>
      <Card.Body>
        {produtorRuralList && <Pie data={createGraphData()} />}
      </Card.Body>
    </Card>
}

const FazendaPorCulturaChart = ({produtorRuralList}:any) => {

    
    const createGraphData = () => {
        
        const totalCulturasAggregate = aggregateTotalCulturas(produtorRuralList)

        return {
            labels: Object.keys(totalCulturasAggregate),
            datasets: [
                {
                    data: Object.values(totalCulturasAggregate),
                    borderWidth: 1,
                }
            ]
        }
    }

    return <Card className="text-center" style={{width:"450px"}}>
      <Card.Header>Quantidade Total</Card.Header>
      <Card.Body>
        {produtorRuralList && <Pie data={createGraphData()} />}
      </Card.Body>
    </Card>
}

const HectaresPorEstadoChart = ({produtorRuralList}:any) => {

    
    const createGraphData = () => {
        
        const produtorRuralByEstado = groupByProperty(produtorRuralList, "estado")
        const totalFazendaPorEstadoAggregate = aggregateCountField(produtorRuralByEstado, "area_total_hectares")

        return {
            labels: Object.keys(totalFazendaPorEstadoAggregate),
            datasets: [
                {
                    data: Object.values(totalFazendaPorEstadoAggregate),
                    borderWidth: 1,
                }
            ]
        }
    }

    return <Card className="text-center" style={{width:"450px"}}>
      <Card.Header>Área total por ha</Card.Header>
      <Card.Body>
        {produtorRuralList && <Pie data={createGraphData()} />}
      </Card.Body>
    </Card>
}
const UsoDoSoloChart = ({produtorRuralList}:any) => {

    
    const createGraphData = () => {
        const hectaresAggregate = aggregateUsoDoSolo(produtorRuralList)

        const usoDoSoloAggregate = {
            "vegetação" : hectaresAggregate["area_vegetacao_hectares"],
            "agricultavel" : hectaresAggregate["area_agricultavel_hectares"],
            "não classificado" : hectaresAggregate["area_total_hectares"] - (hectaresAggregate["area_vegetacao_hectares"] + hectaresAggregate["area_agricultavel_hectares"])
        }

        return {
            labels: Object.keys(usoDoSoloAggregate),
            datasets: [
                {
                    data: Object.values(usoDoSoloAggregate),
                    borderWidth: 1,
                }
            ]
        }
    }

    return <Card className="text-center" style={{width:"450px"}}>
      <Card.Header>Área total por ha</Card.Header>
      <Card.Body>
        {produtorRuralList && <Pie data={createGraphData()} />}
      </Card.Body>
    </Card>
}




export default function CadastroProdutorRural() {

    const [ totalFazendas, setTotalFazendas ] = useState(0)
    const [ totalHectares, setTotalHectares ] = useState(0)
    const [ produtorRuralList, setProdutorRuralList ] = useState()

    useEffect(() => {
        fetchAllData()
    }, [])

    const fetchAllData = async () => {
        setTotalFazendas(await getTotalFazendas())
        setTotalHectares(await getTotalHectares())  
        setProdutorRuralList(await getAllProdutorRural()) 
    }

	return (
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-2 pb-1 mb-2 border-bottom">
                <h1 className="h2">Dashboard</h1>
            </div>
            <div className="d-flex justify-content-around border-bottom">
                <h4>Total de Fazenda <strong>{totalFazendas}</strong></h4>
                <h4>Total Hectares <strong>{totalHectares}</strong> <Badge bg="secondary">ha</Badge></h4>
            </div>
            <div className="pt-2 pb-1 mb-2 border-bottom">
                <div className="col-12"><h5>Por Uso do Solo</h5></div>
                <Row className="justify-content-around">
                <div className="col-auto">
                    <UsoDoSoloChart 
                        produtorRuralList={produtorRuralList}/>
                </div>
                </Row>
            </div>
            <div className="pt-2 pb-1 mb-2 border-bottom">
                <div className="col-12"><h5>Por Cultura</h5></div>
                <Row className="justify-content-around">
                <div className="col-auto">
                    <FazendaPorCulturaChart 
                        produtorRuralList={produtorRuralList}/>
                </div>
                </Row>
            </div>
            <div className="pt-2 pb-1 mb-2 border-bottom">
                <div className="col-12"><h5>Por Estado</h5></div>
                <Row className="justify-content-around">
                <div className="col-auto">
                    <FazendaPorEstadoChart 
                        produtorRuralList={produtorRuralList}/>
                </div>
                <div className="col-auto">
                    <HectaresPorEstadoChart 
                        produtorRuralList={produtorRuralList}/>
                </div>
                </Row>
            </div>
            
        </main>
	)
}
