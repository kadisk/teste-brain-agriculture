export default async function registerProdutorRural(values:any) {
    const response = await fetch(`http://localhost:3333/produtor-rural/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
    })

    if (!response.ok) {
        throw new Error(`Erro no cadastro: ${response.status}`)
    }
}