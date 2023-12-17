const ProdutorRuralDetails = ({values, subtitle}:any) => {
    return <div className="p-3 mb-2 text-dark">
                <h5>{subtitle}</h5>
                {
                    values 
                    && Object
                    .entries(values)
                    .map(([key, value]:[any,any]) => (
                    <p key={key}><strong>{key}:</strong> {JSON.stringify(value)}</p>))
                }
            </div>
}


export default ProdutorRuralDetails