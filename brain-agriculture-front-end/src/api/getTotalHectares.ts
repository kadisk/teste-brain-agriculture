const getTotalHectares = async () => {
    try {
        const res = await fetch(`http://localhost:3333/dashboard/total-hectares`)
        if (!res.ok) {
            throw new Error(`Erro ao buscar dados: ${res.status}`)
        }
        
        const { totalHectares } = await res.json()
        return totalHectares
    } catch (error) {
        console.error(error)
        return 0
    }
}

export default getTotalHectares