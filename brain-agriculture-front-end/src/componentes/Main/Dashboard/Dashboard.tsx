"use client"
import React, { useEffect, useState } from 'react'

import {
	Badge,
    Row,
    Form
} from 'react-bootstrap'

import getTotalFazendas from "../../../api/getTotalFazendas"
import getTotalHectares from "../../../api/getTotalHectares"
import getAllProdutorRural from "../../../api/getAllProdutorRural"

import UsoDoSoloChart from "./charts/UsoDoSoloChart"
import FazendaPorCulturaChart from "./charts/FazendaPorCulturaChart"
import FazendaPorEstadoChart from "./charts/FazendaPorEstadoChart"
import HectaresPorEstadoChart from "./charts/HectaresPorEstadoChart"

const DashboardContent = ({children}:any) => 
    <div className="pb-1 mb-2 border-bottom">
        {children}
    </div>

export default function CadastroProdutorRural() {

    const [ totalFazendas, setTotalFazendas ] = useState(0)
    const [ totalHectares, setTotalHectares ] = useState(0)
    const [ produtorRuralList, setProdutorRuralList ] = useState()

    const [selectedOption, setSelectedOption] = useState("estado")

    useEffect(() => {
        fetchAllData()
    }, [])

    const fetchAllData = async () => {
        setTotalFazendas(await getTotalFazendas())
        setTotalHectares(await getTotalHectares())  
        setProdutorRuralList(await getAllProdutorRural()) 
    }

    const handleSelectChange = (event:any) => {
        setSelectedOption(event.target.value)
    }

    const renderDashboardContent = () => {
        switch(selectedOption){
            case "solo":
                return <Row className="justify-content-around">
                            <div className="col-auto">
                                <UsoDoSoloChart 
                                    produtorRuralList={produtorRuralList}/>
                            </div>
                        </Row>
            case "cultura":
                return <Row className="justify-content-around">
                            <div className="col-auto">
                                <FazendaPorCulturaChart 
                                    produtorRuralList={produtorRuralList}/>
                            </div>
                        </Row>
            case "estado": 
                return <Row className="justify-content-around">
                            <div className="col-auto">
                                <FazendaPorEstadoChart 
                                    produtorRuralList={produtorRuralList}/>
                            </div>
                            <div className="col-auto">
                                <HectaresPorEstadoChart 
                                    produtorRuralList={produtorRuralList}/>
                            </div>
                        </Row>
            default:
                return "No content"
        }
    }

	return (
        <main>
            <div className="d-flex justify-content-around border-bottom mt-2">
                <h5>Total de Fazenda <strong>{totalFazendas}</strong></h5>
                <h5>Total Hectares <strong>{totalHectares}</strong> <Badge bg="secondary">ha</Badge></h5>
            </div>
            <div className="p-1 mb-2 border-bottom">
                <div className="col-4">
                    <Form.Select className="col-4" 
                        value={selectedOption}
                        onChange={handleSelectChange}>
                        <option value="estado">Por Estado</option>
                        <option value="cultura">Por Cultura</option>
                        <option value="solo">Por Usos no Solo</option>
                    </Form.Select>
                </div>
            </div>
            <DashboardContent>
                {renderDashboardContent()}
            </DashboardContent>
        </main>
	)
}
