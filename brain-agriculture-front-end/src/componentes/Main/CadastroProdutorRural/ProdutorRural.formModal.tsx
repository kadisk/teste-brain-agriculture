import React, { useEffect, useState } from 'react'

import {
    Modal,
    ModalBody,
    ModalHeader,
    ModalTitle,
    Button,
    ModalFooter
} from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify'
import ProdutorRuralForm from "./ProdutorRural.form"

interface ProdutorRuralType {
    id: number
    cpf: string
    cnpj: string
    nome_produtor: string
    nome_fazenda: string
    cidade: string
    estado: string
    created_at: string
    updated_at: string
}

async function getProdutorRural(id:number) {
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

async function getCulturas() {
    try {
        const res = await fetch(`http://localhost:3333/culturas/list`)
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
    id?:number
    onClose: any
    onUpdate?: any
    onRegister?: any
}

function ProdutorRuralFormModal({id, onClose, onUpdate, onRegister}:Props) {

    const [ valueLoader, setValueLoader ] = useState<ProdutorRuralType>()
    const [ valueForUpdate, setValueForUpdate ] = useState<ProdutorRuralType>()
    const [isConfirmationMode, setIsConfirmationMode] = useState(false)

    const [ culturas, setCulturas ] = useState<any>()

    useEffect(() => {
        fetchCulturas()
        fetchProdutorRural()
    }, [])

    const fetchCulturas = async () => {
        const culturas = await getCulturas()
        setCulturas(culturas)
    }

    const fetchProdutorRural = async () => {
        if (id){
            const data = await getProdutorRural(id)
            setValueLoader(data)
        }
    }

    const handleChangeValue = (valueForUpdate:any) =>setValueForUpdate(valueForUpdate)
    const handleResetValue = () => setValueForUpdate(undefined)
    const handleUpdateProcess = () =>  setIsConfirmationMode(true)
    const handleCancelConfirmation = () => setIsConfirmationMode(false)
    const handleResetUpdateProcess = () =>setValueForUpdate(undefined)
    const handleUpdate = () => updateValue()
    const handleRegister = () => saveValue()
    const handleRegisterProcess = () => setIsConfirmationMode(true)

    const updateValue = async () => {
        try {
            if(valueForUpdate){
                const response = await fetch(`http://localhost:3333/produtor-rural/${valueForUpdate.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(valueForUpdate)
                })
        
                if (!response.ok) {
                    throw new Error(`Erro na atualização: ${response.status}`)
                }
                onUpdate()
            }
        } catch (error) {
            toast.error(`Não foi possível alteração do cadastro verifique os campos novamente`)
        }
    }

    const saveValue = async () => {
        try {
            if(valueForUpdate){
                const response = await fetch(`http://localhost:3333/produtor-rural/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(valueForUpdate)
                })
        
                if (!response.ok) {
                    throw new Error(`Erro no cadastro: ${response.status}`)
                }
                onRegister()
            } else {
                toast.error(`Cadastro inválido`)
            }
        } catch (error:any) {
            toast.error(`Não foi possível o cadastro  e Produtor Rural verifique os campos novamente`)
        }
    }

    const getFormModalTitle = () => id 
        ? "Alteração de Cadastro"
        : "Cadastro de Produtor Rural"

    const getConfirmationModalTitle = () => id 
        ? "Tem certeza que deseja alterar esse cadastro?"
        : "Revisão do Cadastro"

    const getConfirmationModalSubtitle = () => id 
        ? "Detalhes da Alteração:"
        : "Detalhes do Novo Cadastro:"

    return (<>
        {
            isConfirmationMode 
            && <Modal show size='xl'>
                <ModalHeader>
                    <ModalTitle>{getConfirmationModalTitle()}</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <div className="p-3 mb-2 bg-light text-dark">
                        <h5>{getConfirmationModalSubtitle()}</h5>
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
                    <Button variant="secondary" onClick={()=> handleCancelConfirmation()}>Voltar</Button>
                    <Button variant="danger" onClick={id ? handleUpdate : handleRegister} >Confirmar</Button>
                </ModalFooter>
            </Modal>
        }
        {
            !isConfirmationMode 
            && 
                <Modal show size='xl'>
                    <ModalHeader>
                    <ModalTitle>{getFormModalTitle()}</ModalTitle>
                    </ModalHeader>
                    <ModalBody>
                        {culturas && <ProdutorRuralForm 
                            culturas={culturas}
                            valueForUpdate={valueForUpdate}
                            data={valueLoader} 
                            onChangeValue={(valueForUpdate:any)=> handleChangeValue(valueForUpdate)}
                            onResetValue={handleResetValue}/>
                        }
                    </ModalBody>
                    <ModalFooter>
                        <Button variant="secondary" onClick={()=> onClose()}>Cancelar</Button>
                        <Button 
                            disabled={!valueForUpdate}
                            onClick={handleResetUpdateProcess}
                            >Reset</Button>
                        {
                            id 
                            ? <Button 
                                variant="warning" 
                                disabled={!valueForUpdate}
                                onClick={handleUpdateProcess}>Salvar alteração</Button>
                            : <Button 
                                variant="success"
                                onClick={handleRegisterProcess}>Salvar</Button>
                        }
                    </ModalFooter>
                </Modal>
        }
        <ToastContainer />
        </>)
}

export default ProdutorRuralFormModal
