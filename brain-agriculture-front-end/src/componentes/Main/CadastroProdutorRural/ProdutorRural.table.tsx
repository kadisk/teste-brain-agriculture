"use client"
import React, { useEffect, useState } from 'react'

import ProdutorRuralFormModal from "./ProdutorRural.formModal"

import getAllProdutorRural from "../../../api/getAllProdutorRural"

import {
    Button
} from 'react-bootstrap'

function ProdutorRuralTable() {

    const [produtores, setProdutores] = useState([])
    const [ idProdutorForEdit, setIdProdutorForEdit ] = useState()

    useEffect(() => {
        refreshTable()
    }, [])

    const refreshTable = async () => {
        const data = await getAllProdutorRural()
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
                        <th>Tipo Documento</th>
                        <th>Numero do Documento</th>
                        <th>Nome do Produtor</th>
                        <th>Nome da Fazenda</th>
                        <th>Cidade</th>
                        <th>Estado</th>
                        <th>Área de Vegetação</th>
                        <th>Área de Agricultável</th>
                        <th>Área Total</th>
                    </tr>
                </thead>
                <tbody>
                    {produtores && produtores.map((produtor:any) => (
                        <tr key={produtor.id}>
                            <td>{produtor.id}</td>
                            <td>{produtor.tipo_documento}</td>
                            <td>{produtor.numero_documento}</td>
                            <td>{produtor.nome_produtor}</td>
                            <td>{produtor.nome_fazenda}</td>
                            <td>{produtor.cidade}</td>
                            <td>{produtor.estado}</td>
                            <td>{produtor.area_vegetacao_hectares} ha</td>
                            <td>{produtor.area_agricultavel_hectares} ha</td>
                            <td>{produtor.area_total_hectares} ha</td>
                            <td>
                            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                <Button variant="info" onClick={() => handleEdit(produtor.id)}>Editar</Button>
                                <Button variant="secondary">Remover</Button>
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
