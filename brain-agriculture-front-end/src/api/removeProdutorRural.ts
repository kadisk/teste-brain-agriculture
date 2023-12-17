export default async function removeProdutorRural(id:any) {
    const response = await fetch(`http://localhost:3333/produtor-rural/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if (!response.ok) {
        throw new Error(`Erro na atualização: ${response.status}`)
    }
}