export default async function updateProdutorRural(values:any) {
    const response = await fetch(`http://localhost:3333/produtor-rural/${values.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
    })

    if (!response.ok) {
        const {message} = await response.json()
        throw new Error(message)
    }
}