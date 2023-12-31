export default async function getAllProdutorRural() {
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