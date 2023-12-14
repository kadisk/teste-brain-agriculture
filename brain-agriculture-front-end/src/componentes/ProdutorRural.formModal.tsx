

import {
    Modal,
    ModalBody
} from 'react-bootstrap'

import ProdutorRuralForm from "./ProdutorRural.form"

function ProdutorRuralFormModal() {

    return (<Modal show size='xl' onClose={() => {}}>
                <ModalBody>
                    <ProdutorRuralForm/>
                </ModalBody>
        
        </Modal>
    )
}

export default ProdutorRuralFormModal
