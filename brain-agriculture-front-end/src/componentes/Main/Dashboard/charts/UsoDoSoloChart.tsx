
import ChartCard from './ChartCard'
import aggregateUsoDoSolo from './utils/aggregateUsoDoSolo'

const UsoDoSoloChart = ({produtorRuralList}:any) => {
    const createAggregate = () => {
        const hectaresAggregate = aggregateUsoDoSolo(produtorRuralList)
        const usoDoSoloAggregate = {
            "vegetação" : hectaresAggregate["area_vegetacao_hectares"],
            "agricultavel" : hectaresAggregate["area_agricultavel_hectares"],
            "não classificado" : hectaresAggregate["area_total_hectares"] - (hectaresAggregate["area_vegetacao_hectares"] + hectaresAggregate["area_agricultavel_hectares"])
        }
        return usoDoSoloAggregate
    }
    return produtorRuralList 
        ? <ChartCard 
        title="Área total por ha" 
        aggregate={createAggregate()} />
        : <></>
}

export default UsoDoSoloChart