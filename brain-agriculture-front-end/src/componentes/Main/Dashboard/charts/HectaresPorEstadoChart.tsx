import ChartCard from './ChartCard'
import groupByProperty from './utils/groupByProperty'
import aggregateCountField from './utils/aggregateCountField'

const HectaresPorEstadoChart = ({produtorRuralList}:any) => {
    const createAggregate = () => {
        const produtorRuralByEstado = groupByProperty(produtorRuralList || [], "estado")
        const totalFazendaPorEstadoAggregate = aggregateCountField(produtorRuralByEstado, "area_total_hectares")
        return totalFazendaPorEstadoAggregate
    }
    return produtorRuralList 
    ? <ChartCard 
        title="Área total por ha" 
        aggregate={createAggregate()} />
    : <></>
}

export default HectaresPorEstadoChart