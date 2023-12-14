import {
	Container,
	Row
} from 'react-bootstrap'

import ProdutorRuralTable from "../componentes/ProdutorRural.table"
import ProdutorRuralForm from "../componentes/ProdutorRural.form"

export default function Home() {
	return (
		<Container fluid>
			<Row>
				<div className="sidebar border border-right col-md-3 col-lg-2 p-0">
					<ul className="nav flex-column mt-3">
						<li className="nav-item">
							<a className="nav-link">
								Dashboard
							</a>
						</li>
						<li className="nav-item">
							<a className="nav-link">
								Produtor Rural
							</a>
						</li>
					</ul>

				</div>
				<main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
					<div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
						<h1 className="h2">Produtor Rural</h1>
					</div>
					<ProdutorRuralForm />
					<ProdutorRuralTable />
				</main>
			</Row>
		</Container>
	)
}
