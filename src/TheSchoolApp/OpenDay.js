import React from 'react';
import { Navbar } from 'react-bootstrap';
import { faSchool } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const OpenDay = () => {
    return (<div>
        <Navbar bg="white" variant="white" className="justify-content-around py-2" style={{ height: '50px' }}>
            {/* <Container fluid> */}
            {/* <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                    </Nav> */}
            {/* </Container > */}

            <div > <FontAwesomeIcon style={{ height: '30px', color: 'red', marginLeft: '-40px' }} icon={faSchool} size="2xl" /><span className='mx-1 py-2' style={{ fontWeight: 'light' }}>MySch</span></div>
            {/* < NavDropdown title='' id="nav-dropdown" style={{ marginRight: '200px' }}>
                    <NavDropdown.Item eventKey="4.1">Action</NavDropdown.Item>
                    <NavDropdown.Item eventKey="4.2">Another action</NavDropdown.Item>
                    <NavDropdown.Item eventKey="4.3">Something else here</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item eventKey="4.4">Separated link</NavDropdown.Item>
                </NavDropdown > */}
        </Navbar >
    </div>)
}
export default OpenDay