const aggregateByTotalItem = (group:any) => {
    return Object
        .keys(group)
        .reduce((acc:any, property:string) => {
            return {
                ...acc,
                [property]: group[property].length
            }
        }, {})
}

export default aggregateByTotalItem