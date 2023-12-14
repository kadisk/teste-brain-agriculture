"use client"
import React, { useEffect, useState } from 'react'

import ProdutorRuralFormModal from "./ProdutorRural.formModal"

import {
    Button
} from 'react-bootstrap'

async function getData() {
    try {
        const res = await fetch('http://localhost:3333/produtor-rural/list')
        if (!res.ok) {
            throw new Error(`Erro ao buscar dados: ${res.status}`)
        }
        
        return  await res.json()
    } catch (error) {
        console.error(error)
        return []
    }
}

function ProdutorRuralTable() {

    const [produtores, setProdutores] = useState([])
    const [ idProdutorForEdit, setIdProdutorForEdit ] = useState()

    useEffect(() => {
        refreshTable()
    }, [])

    const refreshTable = async () => {
        const data = await getData()
        setProdutores(data)
    }

    const handleEdit = (idProdutor:any) => {
        setIdProdutorForEdit(idProdutor)
    }

    const handleCancelEdit = () => {
        setIdProdutorForEdit(undefined)
    }

    const handleUpdate = () => {
        setIdProdutorForEdit(undefined)
        refreshTable()
    }

    return (
        <div className="table-responsive small">
            { 
                idProdutorForEdit 
                && <ProdutorRuralFormModal 
                        id={idProdutorForEdit}
                        onUpdate={() => handleUpdate()}
                        onClose={() => handleCancelEdit()}/>
                }
            <table className="table table-striped table-sm">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>CPF</th>
                        <th>CNPJ</th>
                        <th>Nome do Produtor</th>
                        <th>Nome da Fazenda</th>
                        <th>Cidade</th>
                        <th>Estado</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {produtores && produtores.map((produtor:any) => (
                        <tr key={produtor.id}>
                            <td>{produtor.id}</td>
                            <td>{produtor.cpf}</td>
                            <td>{produtor.cnpj}</td>
                            <td>{produtor.nome_produtor}</td>
                            <td>{produtor.nome_fazenda}</td>
                            <td>{produtor.cidade}</td>
                            <td>{produtor.estado}</td>
                            <td>
                            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                <Button variant="outline-warning" onClick={() => handleEdit(produtor.id)}>Editar</Button>
                                <Button variant="outline-danger">Remover</Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ProdutorRuralTable
