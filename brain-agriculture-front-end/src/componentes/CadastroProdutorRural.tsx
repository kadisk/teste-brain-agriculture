"use client"
import React, { useEffect, useState } from 'react'

import ProdutorRuralFormModal from "./ProdutorRural.formModal"

import {
	Button
} from 'react-bootstrap'

import ProdutorRuralTable from "../componentes/ProdutorRural.table"

export default function CadastroProdutorRural() {

    const [isRegisterMode, setIsRegisterMode] = useState(false)


    const handleCancelRegister = () => {
        setIsRegisterMode(false)
    }

    const handleRegisterProcess = () => {
        setIsRegisterMode(true)
    }

    const handleRegister = () => {
        setIsRegisterMode(false)
    }

	return (<>
        { 
            isRegisterMode 
            && <ProdutorRuralFormModal 
                onRegister={() => handleRegister()}
                onClose={() => handleCancelRegister()}/>
        }
		<main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Produtor Rural</h1><Button onClick={() => handleRegisterProcess()}>Cadastrar Produtor Rural</Button>
            </div>
            
            {
                !isRegisterMode && <ProdutorRuralTable />
            }
        </main>
        </>
	)
}
