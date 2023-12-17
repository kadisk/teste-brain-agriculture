const aggregateTotalCulturas = (produtorRuralList:any) => {

    const _AddCulturas = (acc:any, culturas:any[]) => {
        return culturas.reduce((newAcc, {nome}) => {
            if(newAcc[nome]){
                newAcc[nome] += 1
            } else {
                newAcc[nome] = 1
            }

            return newAcc
        }, acc) 
    }

    return produtorRuralList
        .reduce((acc:any, {culturas}:any) => {
            return _AddCulturas(acc, culturas)
    }, {})

}

export default aggregateTotalCulturas