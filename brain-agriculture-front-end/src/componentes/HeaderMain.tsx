
import { Navbar, NavbarBrand } from 'react-bootstrap'

export default function HeaderMain() {
  return (
    <Navbar bg="dark" expand="md" sticky="top" className="flex-md-nowrap p-0 shadow">
      <NavbarBrand className="col-md-3 col-lg-2 me-0 px-3 fs-6 text-white"></NavbarBrand>
    </Navbar>
  )
}