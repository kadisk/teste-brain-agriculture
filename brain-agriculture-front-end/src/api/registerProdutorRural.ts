export default async function registerProdutorRural(values:any) {
    const response = await fetch(`http://localhost:3333/produtor-rural/register`, {
        method: 'POST',
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