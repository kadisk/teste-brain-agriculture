import React, {useEffect} from 'react'
import { useForm } from 'react-hook-form'
interface ProdutorRuralType {
    id: number;
    cpf: string;
    cnpj: string;
    nome_produtor: string;
    nome_fazenda: string;
    cidade: string;
    estado: string;
    created_at: string;
    updated_at: string;
}
interface Props{
    data:ProdutorRuralType|undefined
}

function ProdutorRuralForm({data}:Props) {

    const { register, handleSubmit, setValue } = useForm({
        defaultValues: data || {}
    });

    useEffect(() => {
        if (data) {
            Object.keys(data).forEach(key => {
                setValue(key, data[key])
            })
        }
    }, [data, setValue])

    return (<form className="row g-3">
                <div className="col-md-12">
                    <label className="form-label">Nome do produtor</label>
                    <input type="text" className="form-control" {...register("nome_produtor")}/>
                </div>
                <div className="col-md-12">
                    <label className="form-label">Nome da Fazenda</label>
                    <input type="text" className="form-control" {...register("nome_fazenda")}/>
                </div>
                <div className="col-10">
                    <label className="form-label">Cidade</label>
                    <input type="text" className="form-control" {...register("cidade")}/>
                </div>
                <div className="col-2">
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
            </form>
    )
}

export default ProdutorRuralForm
