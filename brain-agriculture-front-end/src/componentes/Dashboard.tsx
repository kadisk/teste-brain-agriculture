"use client"
import React, { useEffect, useState } from 'react'
import { Pie } from 'react-chartjs-2'
import 'chart.js/auto'

import {
	Badge,
    Row
} from 'react-bootstrap'

const getTotalFazendas = async () => {
    try {
        const res = await fetch(`http://localhost:3333/dashboard/total-fazendas`)
        if (!res.ok) {
            throw new Error(`Erro ao buscar dados: ${res.status}`)
        }
        
        const { totalFazendas } = await res.json()
        return totalFazendas
    } catch (error) {
        console.error(error)
        return 0
    }
}
const getTotalHectares = async () => {
    try {
        const res = await fetch(`http://localhost:3333/dashboard/total-hectares`)
        if (!res.ok) {
            throw new Error(`Erro ao buscar dados: ${res.status}`)
        }
        
        const { totalHectares } = await res.json()
        return totalHectares
    } catch (error) {
        console.error(error)
        return 0
    }
}

export default function CadastroProdutorRural() {

    const [ totalFazendas, setTotalFazendas ] = useState(0)
    const [ totalHectares, setTotalHectares ] = useState(0)

    useEffect(() => {
        fetchTotalFazendas()
        fetchTotalHectares()
    }, [])

    const fetchTotalFazendas = async () => {
        const totalFazendas = await getTotalFazendas()
        setTotalFazendas(totalFazendas)
    }

    const fetchTotalHectares = async () => {
        const totalHectares = await getTotalHectares()
        setTotalHectares(totalHectares)
    }

    const data = {
        labels: ['Fazendas', 'Hectares'],
        datasets: [
            {
                label: 'Total Fazendas vs Hectares',
                data: [totalFazendas, totalHectares],
                backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
                borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
                borderWidth: 1,
            },
        ],
    }

	return (
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Dashboard</h1>
            </div>
            <div className="d-flex justify-content-around pt-3 pb-2 mb-3 border-bottom">
                <h4>Total de Fazenda <strong>{totalFazendas}</strong></h4>
                <h4>Total Hectares <strong>{totalHectares}</strong> <Badge bg="secondary">ha</Badge></h4>
            </div>
            <Row >
            <div className="col-6">
                <Pie data={data} />
                </div>
            </Row>
        </main>
	)
}
