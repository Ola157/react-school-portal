import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook } from '@fortawesome/free-solid-svg-icons'
import { faMapLocation } from '@fortawesome/free-solid-svg-icons'
import { faLink } from '@fortawesome/free-solid-svg-icons'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'
import { faTable } from '@fortawesome/free-solid-svg-icons'
import { faPersonDotsFromLine } from '@fortawesome/free-solid-svg-icons'
import { faSchool } from '@fortawesome/free-solid-svg-icons'


const GuestPage = () => {

    return (<div style={{ height: '800px', backgroundColor: 'gray' }}>
        <Navbar bg="white" variant="white" className="justify-content-around py-2" style={{ height: '50px' }}>
            {/* <Container fluid> */}
            {/* <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                    </Nav> */}
            {/* </Container > */}

            <div> <FontAwesomeIcon style={{ height: '30px', color: 'red', marginLeft: '-40px' }} icon={faSchool} size="2xl" /><span className='mx-1 py-2' style={{ fontWeight: 'light' }}>MySch</span></div>
            {/* < NavDropdown title='' id="nav-dropdown" style={{ marginRight: '200px' }}>
                    <NavDropdown.Item eventKey="4.1">Action</NavDropdown.Item>
                    <NavDropdown.Item eventKey="4.2">Another action</NavDropdown.Item>
                    <NavDropdown.Item eventKey="4.3">Something else here</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item eventKey="4.4">Separated link</NavDropdown.Item>
                </NavDropdown > */}
        </Navbar >
        <Container fluid style={{ backgroundColor: 'gray' }}>
            <Col className='d-flex p-3' lg={8}>
                <Col className='rounded border bg-light me-2' style={{ height: '160px', width: '160px', marginLeft: '20%' }}><Link style={{ textDecoration: "none" }} to='/openday'><h1 className='text-center my-4' style={{ color: 'red' }}>OPEN DAYS</h1></Link></Col>
                <Col className='flex-column align-items-center rounded border bg-light mx-2 me-2' style={{ height: '160px', width: '160px', paddingLeft: '35px', paddingTop: '20px', paddingBottom: '10px' }}><Link style={{ textDecoration: "none" }} to='/openday'><FontAwesomeIcon style={{ height: '70px', color: 'red' }} icon={faBook} /><div className='mt-auto align-self-start' style={{ color: 'red' }}>ORDER A PROSPECTUS</div></Link></Col>
                <Col className='flex-column  rounded border bg-light mx-2 text-center p-4' style={{ height: '160px', width: '160px' }} ><Link style={{ textDecoration: "none" }} to='/openday'><FontAwesomeIcon style={{ height: '70px', color: 'red' }} icon={faMapLocation} /> <span className='mt-3' style={{ color: 'red' }}>Campus Map</span></Link></Col>
                <Col className='flex-column  rounded border bg-light mx-2 text-center' style={{ height: '160px', width: '160px', marginRight: '20%' }} ><Link style={{ textDecoration: "none" }} to='/openday'><hr style={{ border: 'solid', color: 'red' }}></hr> <span className='mt-1' style={{ fontSize: '20px', fontWeight: 'bold' }}><span style={{ color: 'red' }}>MySch</span><br></br><span style={{ color: 'red' }}> Global</span></span><hr style={{ border: 'solid', color: 'red' }}></hr><hr style={{ border: 'solid', color: 'red' }}></hr></Link></Col>
            </Col>

            <Col className='d-flex p-3' lg={8}>
                <Col className='flex-column text-center  rounded border bg-light me-2 py-4' style={{ height: '160px', width: '160px', marginLeft: '20%' }}><Link style={{ textDecoration: "none" }} to='/openday'><FontAwesomeIcon style={{ height: '70px', color: 'red' }} icon={faLink} /> <br></br> <span style={{ color: 'red' }}>Quick Links</span></Link></Col>
                <Col className='flex-column text-center rounded border bg-light mx-2 me-2 py-4' style={{ height: '160px', width: '160px' }}><Link style={{ textDecoration: "none" }} to='/openday'><FontAwesomeIcon style={{ height: '70px', color: 'red' }} icon={faGlobe} /><br></br><span style={{ color: 'red' }}>MSU Website</span></Link></Col>
                <Col className='flex-column text-center rounded border bg-light mx-2 me-2 py-4' style={{ height: '160px', width: '160px' }}><Link style={{ textDecoration: "none" }} to='/openday'><FontAwesomeIcon style={{ height: '70px', color: 'red' }} icon={faTable} /><br></br><span style={{ color: 'red' }}>Time Table</span></Link></Col>
                <Col className='flex-column text-center rounded border bg-light mx-2 py-4' style={{ height: '160px', width: '160px', marginRight: '20%' }} ><Link style={{ textDecoration: "none" }} to='/openday'><FontAwesomeIcon style={{ height: '70px', color: 'red' }} icon={faPersonDotsFromLine} /><span style={{ color: 'red' }}>Learning Beyond Registration</span></Link></Col>
            </Col >
        </Container >
    </div >)
}
export default GuestPage;