import countArrayByProperty from "./countArrayByProperty"

const aggregateCountField = (group:any, fieldName:string) => {
    return Object
    .keys(group)
    .reduce((acc:any, property:string) => {
        return {
            ...acc,
            [property]: countArrayByProperty(group[property], fieldName)
        }
    }, {})
}

export default aggregateCountField