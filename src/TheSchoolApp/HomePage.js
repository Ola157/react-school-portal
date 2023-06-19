import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPeopleLine } from '@fortawesome/free-solid-svg-icons'
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons'
import { faSchool } from '@fortawesome/free-solid-svg-icons'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'

import { Link } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import NavDropdown from 'react-bootstrap/NavDropdown';





const HomePage = ({ schPortal, funcBoo }) => {
    let [boo, setBoo] = useState(true)
    let [booTwo, setBoot] = useState(false)
    let [checka, setChexka] = useState('')
    let [stuValidate, setStu] = useState('')
    // const mySubmit = (values) => {
    //     // let newMod = [...module]
    //     // newMod = newMod.find((a, i) => values.moduleName == a.moduleName && values.moduleCode == a.moduleCode)
    //     // setChexka(values)
    //     alert('hi')
    // }
    let [a, setA] = useState(<FontAwesomeIcon icon={faCaretDown} />)

    const funcName = e => {
        let newMod = { ...schPortal }

        if (newMod.moduleArray !== '') { newMod = newMod.moduleArray.find((a) => a.moduleName === e) }
        setChexka(newMod)
    }

    const funcStudentCode = e => {
        let newMod = { ...schPortal }
        if (newMod.studentArray !== '') { newMod = newMod.studentArray.find((a) => a.studentCode === e) }
        setStu(newMod)
    }

    const myBtn = () => {
        console.log(stuValidate)
    }

    const btnBoo = () => {
        setBoo(true)
        setBoot(false)
    }

    const booBtn = () => {
        setBoot(true)
        setBoo(false)
    }

    const studentBtn = () => {
        funcBoo(true)
    }

    const btnTwo = () => {
        funcBoo(false)
    }

    const profileSelectBtn = selectedProfile => {
        switch (true) {
            case selectedProfile === 'staff':
                console.log('staff');
                break;
            case selectedProfile === 'student':
                console.log('student');
                break;
            case selectedProfile === 'guest':
                console.log('guest');
                break;
        }

    }

    const cancelBtn = pageCancel => {
        switch (true) {
            case pageCancel === 'homepageCancel':
                setBoo(false);
                break;
            case pageCancel === 'nextpageCancel':
                setBoo(true);
                break;
        }
    }

    return (
        <Container fluid className=' bg-dark' style={{ height: '800px' }}>
            <Navbar bg="dark" variant="white" className="justify-content-around" style={{ height: '50px' }}>
                {/* <Container fluid> */}
                {/* <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                    </Nav> */}
                {/* </Container > */}
                {/* < NavDropdown title='' id="nav-dropdown" style={{ marginRight: '200px' }}>
                    <NavDropdown.Item eventKey="4.1">Action</NavDropdown.Item>
                    <NavDropdown.Item eventKey="4.2">Another action</NavDropdown.Item>
                    <NavDropdown.Item eventKey="4.3">Something else here</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item eventKey="4.4">Separated link</NavDropdown.Item>
                </NavDropdown > */}
            </Navbar >
            <Row className='justify-content-center'>
                <hr style={{ color: 'white', marginBottom: '0' }}></hr>

                {/* <div style={{ fontSize: '20px', marginBottom: '0px', marginTop: '4px', display: 'flex', justifyContent: 'center' }}>WELCOME TO NEW COLLEGE</div>
                    <div className='d-flex justify-content-around mt-0 mb-2'><hr style={{ width: '70%' }}></hr></div>
                    {boo == false ?
                        <> <Button onClick={() => btnBoo()} style={{ marginTop: '0px', marginRight: '10px', marginBottom: '2px' }}>Login As Tutor</Button><br></br></>
                        : ''}
                    {boo ? <>

                        <div>   <input style={{ marginBottom: '2px' }} onInput={event => funcName(event.target.value)} placeholder='Module Name' /></div>
                        <div> <input style={{ marginBottom: '2px' }} placeholder='Module Code' /></div>
                        <div> <Link to={checka ? `/tutor/${checka.moduleName}` : ''}><Button onClick={myBtn}>Login</Button></Link></div>

                        Don't have an account? <Link to='/admin'><Button onClick={btnTwo}>Sign Up</Button></Link> <br></br>
                    </>
                        : ''}

                    {booTwo == false ? <><Button onClick={() => booBtn()} style={{ marginTop: '1px', marginRight: '10px', marginBottom: '10px' }}>Login As Student</Button><br></br>
                    </> : ''}

                    {booTwo ? <>

                        <div>   <input style={{ marginBottom: '2px' }} onInput={event => funcStudentCode(event.target.value)} placeholder='Student Code' /></div>
                        <div> <input style={{ marginBottom: '2px' }} placeholder='Student Password' /></div>
                        <div> <Link to={stuValidate ? `/student/${stuValidate.studentCode}` : ''}><Button onClick={myBtn}>Login</Button></Link></div>

                        Don't have an account? <Link to={'/admin'}><Button onClick={studentBtn}>Sign Up</Button></Link> <br></br>

                    </>
                        : ''} */}

                {boo ?

                    <Col className='bg-white p-0 mt-0 rounded border' rounded lg={4} >
                        <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'baseline', fontWeight: 'bold' }}><h5 className="text-center mx-5">Please Select A Profile</h5><button onClick={() => cancelBtn('homepageCancel')} className="mx-3 border-0 bg-white float-right" style={{ fontWeight: 'bold', color: 'black' }}>X</button></div>
                        <hr className='my-1'></hr>
                        <div className='bg-white my-2 px-3' ><FontAwesomeIcon style={{ height: '50px', color: 'red' }} icon={faSchool} size="2xl" /><span className='mx-3' style={{ fontWeight: 'light' }}>MySch</span></div>
                        <p className='px-3' style={{ color: 'black' }}>Welcome to MySch - MySch's Student Portal</p>
                        <div><Link className="d-grid gap-2" to='/admin'><Button variant="light" size="lg" onClick={() => profileSelectBtn('student')} ><span style={{ float: 'left' }}><FontAwesomeIcon icon={faPeopleLine} /></span><span className='px-2' style={{ float: 'left' }}>Student</span>  <span style={{ float: 'right' }}><FontAwesomeIcon icon={faRightToBracket} /></span></Button>{' '}</Link></div>
                        <div><Link className="d-grid gap-2" to='/admin'><Button variant="light" size="lg" onClick={() => profileSelectBtn('staff')} ><span style={{ float: 'left' }}><FontAwesomeIcon icon={faPeopleLine} /></span><span className='px-2' style={{ float: 'left' }}>Staff</span>  <span style={{ float: 'right' }}><FontAwesomeIcon icon={faRightToBracket} /></span></Button>{' '}</Link></div>
                        <div><Link className="d-grid gap-2" to='/guest'> <Button variant="light" size="lg" onClick={() => profileSelectBtn('guest')} ><span style={{ float: 'left' }}><FontAwesomeIcon icon={faPeopleLine} /></span><span className='px-2' style={{ float: 'left' }}>Guest</span>  <span style={{ float: 'right' }}><FontAwesomeIcon icon={faRightToBracket} /></span></Button>{' '}</Link></div>
                    </Col>

                    : <Col className='bg-white border mb-3 mt-4 text-center rounded border' lg={4} style={{ height: '200px' }}>
                        <h2 className='my-4'>Select Profile</h2>
                        <h5 className='my-4'>Now select profile to get going</h5>
                        <Button onClick={() => cancelBtn('nextpageCancel')}>Select A Profile</Button>
                    </Col>
                }

            </Row >
        </Container >)
}
export default HomePage;