"use client"
import React, { useEffect, useState } from 'react'

import {
	Badge,
    Row
} from 'react-bootstrap'

import getTotalFazendas from "../api/getTotalFazendas"
import getTotalHectares from "../api/getTotalHectares"
import getAllProdutorRural from "../api/getAllProdutorRural"

import UsoDoSoloChart from "../componentes/charts/UsoDoSoloChart"
import FazendaPorCulturaChart from "../componentes/charts/FazendaPorCulturaChart"
import FazendaPorEstadoChart from "../componentes/charts/FazendaPorEstadoChart"
import HectaresPorEstadoChart from "../componentes/charts/HectaresPorEstadoChart"

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
