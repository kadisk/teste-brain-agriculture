"use client"
import React, { useEffect, useState } from 'react'

import ProdutorRuralFormModal from "./ProdutorRural.formModal"

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
        const fetchData = async () => {
            const data = await getData()
            setProdutores(data)
        }
        fetchData()
    }, [])

    const handleEdit = (idProdutor:any) => {
        setIdProdutorForEdit(idProdutor)
    }

    return (
        <div className="table-responsive small">
            { idProdutorForEdit && <ProdutorRuralFormModal/>}
            <table className="table table-striped table-sm">
                <thead>
                    <tr>
                        <th>#</th>
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
                                <button type="button" className="btn btn-outline-warning" onClick={() => handleEdit(produtor.id)}>Editar</button>
                                <button type="button" className="btn btn-outline-danger">Remover</button>
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
