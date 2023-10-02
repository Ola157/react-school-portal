import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Container } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap'
import { MdSchool } from 'react-icons/md';
import { HiBackspace } from 'react-icons/hi';
import { Navbar } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { MdOutlineCancel } from 'react-icons/md';


const Admin = ({ handle_login_signup, handleModal }) => {
    let [firstName, setFirstName] = useState('')
    let [lastName, setLastName] = useState('')
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let [moduleName, setModuleName] = useState('')
    let [moduleCode, setModuleCode] = useState('')
    const { id } = useParams()
    let [type, handleType] = useState(id)
    const navigate = useNavigate();
    let ifRegistered = useSelector(state => state.userRegistered)
    let modal = useSelector(state => state.modal)
    let userLoggedIn = useSelector(state => state.userLoggedIn)

    useEffect(() => {
        if (ifRegistered) {
            handleType(id)
        }
        if (userLoggedIn && type === 'student') {
            navigate(`/userhomepage/${id}`)
        }
        if (userLoggedIn && type === 'tutor') {
            navigate(`/userhomepage/${id}`)
        }
        if (userLoggedIn && modal) {
            handleModal('')
        }
    }, [ifRegistered, userLoggedIn, modal])

    const handlelogin_signup = () => {
        let edit = false
        let dob = ''
        let homeAddress = ''
        let mobileNumber = ''
        switch (type) {
            case 'student':
                handle_login_signup({ type, email, password })
                setPassword('')
                setEmail('')
                break
            case 'tutor':
                handle_login_signup({ type, email, password })
                setPassword('')
                setEmail('')
                break
            case 'tutorsignup':
                handle_login_signup({ type, email, password, firstName, lastName, dob, homeAddress, mobileNumber, moduleName, moduleCode, edit })
                setPassword('')
                setEmail('')
                setFirstName('')
                setLastName('')
                setModuleCode('')
                setModuleName('')
                break;
            case 'studentsignup':
                handle_login_signup({ type, email, password, firstName, lastName, dob, homeAddress, mobileNumber, edit })
                setPassword('')
                setEmail('')
                setFirstName('')
                setLastName('')
                break;
        }
    }

    return (<Container className="school-homepage" fluid>
        <Navbar bg="dark">
            <div >
                <MdSchool className='school-logo' />
            </div>
        </Navbar>

        <Row className='p-3 my-0'>
            <Col lg={2} md={3} sm={4} xs={4} className='px-0 pe-0'>
                <Link to={'/'} className='return-link' >
                    <HiBackspace /> <span>Select Profile</span>
                </Link>
            </Col>
        </Row>

        {modal &&
            <Row className='justify-content-center'>
                <Col lg={4} md={5} sm={7} xs={10} className='text-center modal-col'>
                    <span>{modal}</span> <button onClick={handleModal} className='border-0'><MdOutlineCancel /></button>
                </Col>
            </Row>}

        <Row className='justify-content-center align-items-center'>
            <Col className='login-col' lg={6} md={8} sm={10} xs={10}>
                <Col>
                    {type === 'studentsignup' || type === 'tutorsignup' ?
                        < div className='d-flex justify-content-between'>
                            <Col lg={5} md={5} sm={5} xs={5}>
                                <input className='syn-input' value={firstName}
                                    onInput={(event) => setFirstName(event.target.value)} placeholder='first name' />
                            </Col>
                            <Col lg={5} md={5} sm={5} xs={5}>
                                <input className='syn-input' value={lastName}
                                    onInput={(event) => setLastName(event.target.value)} placeholder='last name' />
                            </Col>
                        </div> : null}
                    {type === 'tutorsignup' &&
                        < div className='d-flex justify-content-between'>
                            <Col lg={5} md={5} sm={5} xs={5}>
                                <input className='syn-input' value={moduleName}
                                    onInput={(event) => setModuleName(event.target.value)} placeholder='module name' />
                            </Col>
                            <Col lg={5} md={5} sm={5} xs={5}>
                                <input className='syn-input' value={moduleCode}
                                    onInput={(event) => setModuleCode(event.target.value)} placeholder='module code' />
                            </Col>
                        </div>}

                    <Col lg={12} md={12} sm={12} xs={12}>
                        <input className='syn-input w-100' type='email' value={email}
                            onInput={(event) => setEmail(event.target.value)} placeholder='email' />
                    </Col>
                    <Col lg={12} md={12} sm={12} xs={12}>
                        <input className='syn-input w-100' type='password' value={password}
                            onInput={(event) => setPassword(event.target.value)} placeholder='password' />
                    </Col>
                    <Col className='d-flex justify-content-center' lg={12} md={12} sm={12}>
                        <button className='py-0 syn-button'
                            onClick={() => handlelogin_signup(type)}>
                            {type === 'tutor' || type === "student" ? <>Sign in</> : <>Register</>}
                        </button>
                    </Col>
                    {type === 'tutorsignup' || type === 'studentsignup' ? null : <div className='text-center my-1'>
                        <button className='py-0 syn-button'
                            onClick={type === 'student' ? () => handleType('studentsignup')
                                : () => handleType('tutorsignup')}>
                            signup
                        </button>
                    </div>}
                </Col>
            </Col>
        </Row >

        <footer className="school-footer">
            <Container fluid>
                <Row>
                    <Col lg={12} className="text-center">
                        <p>&copy; 2023 GoldenGate Academy. All Rights Reserved.</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    </Container >)
}
export default Admin;