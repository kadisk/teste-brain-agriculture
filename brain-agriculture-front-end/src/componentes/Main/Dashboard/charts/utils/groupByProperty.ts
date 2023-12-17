const groupByProperty = (produtorRuralList:any, property:string) => {
    return produtorRuralList.reduce((acc:any, produtorRural:any) => {
        return {
            ...acc,
            [produtorRural[property]]:[
                ...(acc[produtorRural[property]]||[]), produtorRural
            ]
        }
    }, {})
}

export default groupByProperty