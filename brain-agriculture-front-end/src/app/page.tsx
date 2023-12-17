"use client"
import { useState } from 'react'
import {
	Container,
	Tab,
	Tabs
} from 'react-bootstrap'

import CadastroProdutorRural from "../componentes/Main/CadastroProdutorRural"
import Dashboard from "../componentes/Main/Dashboard"

export default function Home() {
    const [key, setKey] = useState("dashboard")

    return (
        <Container>
            <Tabs defaultActiveKey="dashboard" className="mt-3" onSelect={(k) => setKey(k)}>
                <Tab eventKey="dashboard" title="Dashboard" key="dashboardTab">
                    {key === "dashboard" && <Dashboard />}
                </Tab>
                <Tab eventKey="cadastro" title="Cadastro de Produtor" key="cadastroTab">
                    {key === "cadastro" && <CadastroProdutorRural />}
                </Tab>
            </Tabs>
        </Container>
    )
}