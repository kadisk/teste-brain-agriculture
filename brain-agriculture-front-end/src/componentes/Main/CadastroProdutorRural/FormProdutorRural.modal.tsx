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
import ProdutorRuralDetails from "./ProdutorRuralDetails"

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

import getProdutorRural from "../../../api/getProdutorRural"
import getCulturas from "../../../api/getCulturas"
import updateProdutorRural from "../../../api/updateProdutorRural"
import registerProdutorRural from "../../../api/registerProdutorRural"

interface Props {
    id?:number
    onClose: any
    onUpdate?: any
    onRegister?: any
}

function FormProdutorRuralModal({id, onClose, onUpdate, onRegister}:Props) {

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
                await updateProdutorRural(valueForUpdate)
                onUpdate()
            }
        } catch (error) {
            toast.error(`Não foi possível alteração do cadastro verifique os campos novamente`)
        }
    }

    const saveValue = async () => {
        try {
            if(valueForUpdate){
                await registerProdutorRural(valueForUpdate)
                onRegister()
            } else {
                toast.error(`Cadastro inválido`)
            }
        } catch (error:any) {
            toast.error(error.message)
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
                <ModalBody style={{backgroundColor:"#eee"}}>
                    <ProdutorRuralDetails 
                        subtitle={getConfirmationModalSubtitle()} 
                        values={valueForUpdate}/>
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
                    <ModalBody style={{backgroundColor:"#eee"}}>
                        {
                        culturas 
                        && <ProdutorRuralForm 
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

export default FormProdutorRuralModal
