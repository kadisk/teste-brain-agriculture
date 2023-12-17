const aggregateUsoDoSolo = (produtorRuralList:any) => {
    return produtorRuralList
     .reduce((acc:any, produtorRural:any) => {

        acc["area_total_hectares"] += produtorRural["area_total_hectares"]
        acc["area_agricultavel_hectares"] += produtorRural["area_agricultavel_hectares"]
        acc["area_vegetacao_hectares"] += produtorRural["area_vegetacao_hectares"]

        return acc
     }, {
        "area_total_hectares": 0,
        "area_agricultavel_hectares": 0,
        "area_vegetacao_hectares": 0
     })
}

export default aggregateUsoDoSolo