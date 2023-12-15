import React, {useEffect, useState} from 'react'
import { useForm } from 'react-hook-form'

const CPFMask = (cpf:any) => cpf
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1')

const CNPJMask = (cnpj:any) => cnpj
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1')

const RemoveMask = (valor:string) => valor.replace(/\D/g, '')
interface ProdutorRuralType {
    id: number
    tipo_documento: string
    numero_documento: string
    nome_produtor: string
    nome_fazenda: string
    cidade: string
    estado: string
    area_vegetacao_hectares: number
    area_agricultavel_hectares: number
    area_total_hectares: number
    created_at: string
    updated_at: string
}
interface Props{
    data:ProdutorRuralType|undefined
    valueForUpdate:ProdutorRuralType|undefined
    onChangeValue:any
    onResetValue: any
    culturas: any[]
}

function ProdutorRuralForm({
    culturas,
    data,
    valueForUpdate,
    onChangeValue,
    onResetValue
}:Props) {

    const [ isOriginalValueChanged, setIsOriginalValueChanged ] = useState(false)
    const [ documentType, setDocumentType ] = useState("cpf")

    const { register, getValues, setValue, reset } = useForm({
        defaultValues: data || {}
    })

    useEffect(() => {
        refreshForm()
    }, [data, setValue])


    useEffect(() => {
        if(isOriginalValueChanged && !valueForUpdate){
            setIsOriginalValueChanged(false)
            refreshForm()
        }

        if(!isOriginalValueChanged && valueForUpdate){
            setIsOriginalValueChanged(true)
        }
    }, [valueForUpdate])

    const refreshForm = () => {
        if (data) {
            fillForm(valueForUpdate || data)
        } else if(!data && valueForUpdate) {
            fillForm(valueForUpdate)
        } else {
            reset()
        }
    }

    const fillForm = (values:ProdutorRuralType|{}|any) => {
        if (values) {
            Object.keys(values).forEach((key:any) => {
                setValue(key, values[key])
            })
        }
    }

    const changeForm = () => {
        const currentValues = {...data, ...getValues()}
        if (JSON.stringify(currentValues) !== JSON.stringify(data)) {

            const newCurrentValues = {
                ...currentValues,
                culturaIds: Object.entries(currentValues.culturaIds)
                            .filter(([key, value]) => value)
                            .map(([key]) => key),
                tipo_documento: documentType,
                numero_documento: currentValues.numero_documento
                    ? RemoveMask(currentValues.numero_documento) 
                    : undefined
            }
            onChangeValue(newCurrentValues)
        } else {
            onResetValue()
        }
    }

    const handleChangeForm = () => changeForm()

    const handleChangeDocumentType = (newDocumentType:string) => {
        setDocumentType(newDocumentType)
        //changeForm()
    }

    return (<form className="row g-3" onChange={() => handleChangeForm()}>
                <div className="col-md-12">
                    <label className="form-label">Nome do produtor</label>
                    <input type="text" className="form-control" {...register("nome_produtor")}/>
                </div>
                <div className="col-md-12">
                    <label className="form-label">Nome da Fazenda</label>
                    <input type="text" className="form-control" {...register("nome_fazenda")}/>
                </div>
                <div className="col-auto">
                    <label className="form-label">Tipo de Documento</label>
                    <div>
                       <div className="form-check form-check-inline">
                            <input 
                                type="radio" 
                                value="cpf" 
                                checked={documentType === 'cpf'}
                                onChange={() => handleChangeDocumentType('cpf')}
                            /> CPF  
                        </div>
                        <div className="form-check form-check-inline">
                            <input 
                                type="radio" 
                                value="cnpj" 
                                checked={documentType === 'cnpj'}
                                onChange={() => handleChangeDocumentType('cnpj')}
                            /> CNPJ
                        </div>
                    </div>
                </div>
                <div className="col-auto">
                    <label className="form-label">Número do {documentType.toUpperCase()}</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        {...register("numero_documento")}
                    />
                </div>
                <div className="col-8">
                    <label className="form-label">Cidade</label>
                    <input type="text" className="form-control" {...register("cidade")}/>
                </div>
                <div className="col-4">
                    <label className="form-label">Estado</label>
                    <select id="inputState" className="form-select" {...register("estado")}>
                        <option selected>Escolha...</option>
                        <option value="AC">Acre</option>
                        <option value="AL">Alagoas</option>
                        <option value="AP">Amapá</option>
                        <option value="AM">Amazonas</option>
                        <option value="BA">Bahia</option>
                        <option value="CE">Ceará</option>
                        <option value="DF">Distrito Federal</option>
                        <option value="ES">Espírito Santo</option>
                        <option value="GO">Goiás</option>
                        <option value="MA">Maranhão</option>
                        <option value="MT">Mato Grosso</option>
                        <option value="MS">Mato Grosso do Sul</option>
                        <option value="MG">Minas Gerais</option>
                        <option value="PA">Pará</option>
                        <option value="PB">Paraíba</option>
                        <option value="PR">Paraná</option>
                        <option value="PE">Pernambuco</option>
                        <option value="PI">Piauí</option>
                        <option value="RJ">Rio de Janeiro</option>
                        <option value="RN">Rio Grande do Norte</option>
                        <option value="RS">Rio Grande do Sul</option>
                        <option value="RO">Rondônia</option>
                        <option value="RR">Roraima</option>
                        <option value="SC">Santa Catarina</option>
                        <option value="SP">São Paulo</option>
                        <option value="SE">Sergipe</option>
                        <option value="TO">Tocantins</option>
                    </select>
                </div>
                <div className="col-4">
                    <label className="form-label">Área de Vegetação (ha)</label>
                    <input type="number" className="form-control" defaultValue={0} {...register("area_vegetacao_hectares")}/>
                </div>
                <div className="col-4">
                    <label className="form-label">Área Agricultável (ha)</label>
                    <input type="number" className="form-control" defaultValue={0} {...register("area_agricultavel_hectares")}/>
                </div>
                <div className="col-4">
                    <label className="form-label">Área Total (ha)</label>
                    <input type="number" className="form-control" defaultValue={0} {...register("area_total_hectares")}/>
                </div>
                <div className="col-12">
                    <label className="form-label">Culturas</label>
                    <div>
                    {
                        culturas.map((cultura) => (
                        <div key={cultura.id} className="form-check form-check-inline">
                            <input 
                                className="form-check-input"
                                type="checkbox"
                                id={`cultura-${cultura.id}`}
                                value={cultura.id}
                                {...register(`culturaIds.${cultura.id}`)}
                            />
                            <label className="form-check-label" htmlFor={`cultura-${cultura.id}`}>
                                {cultura.nome}
                            </label>
                        </div>
                    ))}
                    </div>
                </div>
            </form>
    )
}



export default ProdutorRuralForm
