import {
	Container,
	Row
} from 'react-bootstrap'

import CadastroProdutorRural from "../componentes/Main/CadastroProdutorRural"
import Dashboard from "../componentes/Main/Dashboard"

export default function Home() {
	return (
		<Container fluid>
			<Row>
				{/*<div className="sidebar border border-right col-md-3 col-lg-2 p-0">
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

	</div>*/}
				<Dashboard />
				<CadastroProdutorRural/>
			</Row>
		</Container>
	)
}
