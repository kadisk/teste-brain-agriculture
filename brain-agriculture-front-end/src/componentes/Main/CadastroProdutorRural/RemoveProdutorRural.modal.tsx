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

interface Props {
    id:number
    onClose: any
    onRemove: any
}
import getProdutorRural from "../../../api/getProdutorRural"
import removeProdutorRural from "../../../api/removeProdutorRural"

import ProdutorRuralDetails from "./ProdutorRuralDetails"

function RemoveProdutorRuralModal({id, onClose, onRemove}:Props) {

    const [ produtorRural, setProdutorRural ] = useState()


    useEffect(() => {
        fetchProdutorRural()
    }, [])


    const fetchProdutorRural = async () => {
        if (id){
            const data = await getProdutorRural(id)
            setProdutorRural(data)
        }
    }

    const removeRecord = async (id:any) => {
        try {
            if(id){
                await removeProdutorRural(id)
                onRemove()
            } else {
                toast.error(`Removção inválida inválido`)
            }
        } catch (error:any) {
            toast.error(`Não foi possível remover o cadastro`)
        }
    }


    const handleRemove = (id:any) => removeRecord(id)

    return <Modal show size='xl'>
            <ModalHeader>
                <ModalTitle>Este cadastro esta prestes a ser removido definitivamente. <br/>Tem certeza que deseja concluir a remoção?</ModalTitle>
            </ModalHeader>
            <ModalBody style={{backgroundColor:"#eee"}}>
                <ProdutorRuralDetails 
                    subtitle="Detalhes do Novo Cadastro:" 
                    values={produtorRural}/>
            </ModalBody>
            <ModalFooter>
                <Button variant="danger" onClick={ () => handleRemove(id)} >REMOVER</Button>
                <Button variant="secondary" onClick={() => onClose()}>cancelar</Button>
            </ModalFooter>
            <ToastContainer/>
        </Modal>
}

export default RemoveProdutorRuralModal
