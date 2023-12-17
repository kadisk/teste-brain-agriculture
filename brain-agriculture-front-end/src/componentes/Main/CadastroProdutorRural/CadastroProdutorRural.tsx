"use client"
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import ProdutorRuralFormModal from "./ProdutorRural.formModal"

import {
	Button
} from 'react-bootstrap'

import ProdutorRuralTable from "./ProdutorRural.table"

export default function CadastroProdutorRural() {

    const [isRegisterMode, setIsRegisterMode] = useState(false)

    const handleCancelRegister = () => {
        setIsRegisterMode(false)
    }

    const handleRegisterProcess = () => {
        setIsRegisterMode(true)
    }

    const handleRegister = () => {
        toast.success(`Produtor Rural cadastrado com sucesso`)
        setIsRegisterMode(false)
    }

	return (<>
        { 
            isRegisterMode 
            && <ProdutorRuralFormModal 
                onRegister={() => handleRegister()}
                onClose={() => handleCancelRegister()}/>
        }
		<main>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Produtor Rural</h1><Button onClick={() => handleRegisterProcess()}>Cadastrar Produtor Rural</Button>
            </div>
            
            {
                !isRegisterMode && <ProdutorRuralTable />
            }
        </main>
        <ToastContainer />
        </>
	)
}
