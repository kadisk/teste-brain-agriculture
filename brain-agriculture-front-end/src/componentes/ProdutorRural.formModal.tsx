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
    const [ valueForUpdate, setValueForUpdate ] = useState()
    const [isInEditConfirmationMode, setIsInEditConfirmationMode] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const data = await getData(id)
            setProdutorRural(data)
        }
        fetchData()
    }, [])

    const handleChangeValue = (valueForUpdate:any) => {
        setValueForUpdate(valueForUpdate)
    }

    const handleResetValue = () => {
        setValueForUpdate(undefined)
    }

    const handleUpdateProcess = () => {
        setIsInEditConfirmationMode(true)
    }

    const handleCancelConfirmation = () => {
        setIsInEditConfirmationMode(false)
    }

    const handleResetUpdateProcess = () => {
        setValueForUpdate(undefined)
    }

    return (<>
        {
            isInEditConfirmationMode 
            && <Modal show size='xl'>
                <ModalHeader>
                    <ModalTitle>Tem certeza que deseja alterar esse cadastro?</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <div className="p-3 mb-2 bg-light text-dark">
                        <h5>Detalhes da Alteração:</h5>
                        {
                            valueForUpdate 
                            && Object
                            .entries(valueForUpdate)
                            .map(([key, value]) => (
                            <p key={key}><strong>{key}:</strong> {value}</p>))
                        }
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={()=> handleCancelConfirmation()}>Não</Button>
                    <Button variant="danger" >Sim</Button>
                </ModalFooter>
            </Modal>
        }
        {
            !isInEditConfirmationMode 
            && 
                <Modal show size='xl'>
                    <ModalHeader>
                    <ModalTitle>Alteração de cadastro</ModalTitle>
                    </ModalHeader>
                    <ModalBody>
                        <ProdutorRuralForm 
                            valueForUpdate={valueForUpdate}
                            data={produtorRural} 
                            onChangeValue={(valueForUpdate:any)=> handleChangeValue(valueForUpdate)}
                            onResetValue={handleResetValue}/>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={()=> onClose()}>Cancelar</Button>
                        <Button 
                            disabled={!valueForUpdate}
                            onClick={handleResetUpdateProcess}
                            >Reset</Button>
                        <Button 
                            variant="warning" 
                            disabled={!valueForUpdate}
                            onClick={handleUpdateProcess}
                            >Salvar alteração</Button>
                    </ModalFooter>
                </Modal>
        }
        </>)
}

export default ProdutorRuralFormModal
