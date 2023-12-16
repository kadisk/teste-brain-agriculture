const getTotalFazendas = async () => {
    try {
        const res = await fetch(`http://localhost:3333/dashboard/total-fazendas`)
        if (!res.ok) {
            throw new Error(`Erro ao buscar dados: ${res.status}`)
        }
        
        const { totalFazendas } = await res.json()
        return totalFazendas
    } catch (error) {
        console.error(error)
        return 0
    }
}

export default getTotalFazendas