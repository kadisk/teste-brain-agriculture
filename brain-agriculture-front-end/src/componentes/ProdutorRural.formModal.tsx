import React, { useEffect, useState } from 'react'

import {
    Modal,
    ModalBody,
    ModalHeader,
    ModalTitle,
    Button,
    ModalFooter
} from 'react-bootstrap'

import ProdutorRuralForm from "./ProdutorRural.form"

interface ProdutorRuralType {
    id: number;
    cpf: string;
    cnpj: string;
    nome_produtor: string;
    nome_fazenda: string;
    cidade: string;
    estado: string;
    created_at: string;
    updated_at: string;
}

async function getData(id:number) {
    try {
        const res = await fetch(`http://localhost:3333/produtor-rural/${id}`)
        if (!res.ok) {
            throw new Error(`Erro ao buscar dados: ${res.status}`)
        }
        
        return  await res.json()
    } catch (error) {
        console.error(error)
        return []
    }
}

interface Props {
    id:number
    onClose: any
}

function ProdutorRuralFormModal({id, onClose}:Props) {

    const [ produtorRural, setProdutorRural ] = useState<ProdutorRuralType>()

    useEffect(() => {
        const fetchData = async () => {
            const data = await getData(id)
            setProdutorRural(data)
        }
        fetchData()
    }, [])


    return (<Modal show size='xl'>
                <ModalHeader>
                <ModalTitle>Alteração de cadastro</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <ProdutorRuralForm data={produtorRural}/>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={()=> onClose()}>Cancelar</Button>
                    <Button>Salvar alteração</Button>
                </ModalFooter>
        </Modal>
    )
}

export default ProdutorRuralFormModal
