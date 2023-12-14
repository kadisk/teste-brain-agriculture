import {
	Button
} from 'react-bootstrap'

import ProdutorRuralTable from "../componentes/ProdutorRural.table"

export default function CadastroProdutorRural() {


    

	return (
		<main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Produtor Rural</h1><Button>Cadastrar Produtor Rural</Button>
            </div>
            <ProdutorRuralTable />
        </main>
	)
}
