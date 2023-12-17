const countArrayByProperty = (arrObj:any, property:string) => {
    return arrObj.reduce((acc:number, obj:string) => {
        return acc + parseInt(obj[property])
    }, 0)
}

export default countArrayByProperty