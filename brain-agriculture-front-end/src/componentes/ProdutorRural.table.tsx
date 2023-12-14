
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

async function ProdutorRuralTable() {

    const produtores = await getData()

    return (
        <div className="table-responsive small">
            <table className="table table-striped table-sm">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">CPF</th>
                        <th scope="col">CNPJ</th>
                        <th scope="col">Nome do Produtor</th>
                        <th scope="col">Nome da Fazenda</th>
                        <th scope="col">Cidade</th>
                        <th scope="col">Estado</th>
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
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ProdutorRuralTable
