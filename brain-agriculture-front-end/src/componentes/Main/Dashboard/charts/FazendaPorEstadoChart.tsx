import ChartCard from './ChartCard'
import groupByProperty from './utils/groupByProperty'
import aggregateByTotalItem from './utils/aggregateByTotalItem'

const FazendaPorEstadoChart = ({produtorRuralList}:any) => {
    const createAggregate = () => {
        const produtorRuralByEstado = groupByProperty(produtorRuralList || [], "estado")
        const totalFazendaPorEstadoAggregate = aggregateByTotalItem(produtorRuralByEstado)
        return totalFazendaPorEstadoAggregate
    }
    return produtorRuralList 
    ? <ChartCard 
        title="Quantidade de Fazendas" 
        aggregate={createAggregate()} />
    : <></>
}

export default FazendaPorEstadoChart