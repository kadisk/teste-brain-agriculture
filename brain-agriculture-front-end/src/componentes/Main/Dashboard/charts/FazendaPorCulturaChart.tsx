import ChartCard from './ChartCard'
import aggregateTotalCulturas from './utils/aggregateTotalCulturas'

const FazendaPorCulturaChart = ({produtorRuralList}:any) => {
    const createAggregate = () => aggregateTotalCulturas(produtorRuralList || [])
    return produtorRuralList 
    ? <ChartCard 
        title="Quantidade Total" 
        aggregate={createAggregate()} />
    : <></>
}

export default FazendaPorCulturaChart