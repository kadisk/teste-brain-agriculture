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

const groupByEstado = (produtorRuralList:any) => {
    return produtorRuralList.reduce((acc:any, produtorRural:any) => {
        return {
            ...acc,
            [produtorRural.estado]:[
                ...(acc[produtorRural.estado]||[]), produtorRural
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

const TotalFazendaPorEstadoChart = ({produtorRuralList}:any) => {

    
    const createGraphData = () => {
        
        const produtorRuralByEstado = groupByEstado(produtorRuralList)
        const totalFazendaPorEstadoAggregate = aggregateByTotalItem(produtorRuralByEstado)
        console.log(totalFazendaPorEstadoAggregate)

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
      <Card.Header>Total Fazendas</Card.Header>
      <Card.Body>
        {produtorRuralList && <Pie data={createGraphData()} />}
      </Card.Body>
    </Card>
}

const TotalHectaresPorEstadoChart = ({produtorRuralList}:any) => {

    
    const createGraphData = () => {
        
        const produtorRuralByEstado = groupByEstado(produtorRuralList)
        const totalFazendaPorEstadoAggregate = aggregateCountField(produtorRuralByEstado, "area_total_hectares")
        console.log(totalFazendaPorEstadoAggregate)

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
      <Card.Header>Total Hectares</Card.Header>
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
            <div className="d-flex justify-content-around pt-1 pb-1 border-bottom">
                <h4>Total de Fazenda <strong>{totalFazendas}</strong></h4>
                <h4>Total Hectares <strong>{totalHectares}</strong> <Badge bg="secondary">ha</Badge></h4>
            </div>
            <div className="pt-2 pb-1 mb-2 border-bottom">
                <div className="col-12"><h5>Por Estado</h5></div>
                <Row className="justify-content-around">
                <div className="col-auto">
                    <TotalFazendaPorEstadoChart 
                        produtorRuralList={produtorRuralList}/>
                </div>
                <div className="col-auto">
                    <TotalHectaresPorEstadoChart 
                        produtorRuralList={produtorRuralList}/>
                </div>
                </Row>
            </div>
            
        </main>
	)
}
