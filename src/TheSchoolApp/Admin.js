import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { Container } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSchool } from '@fortawesome/free-solid-svg-icons'
import { Navbar } from 'react-bootstrap';
import { useSelector } from 'react-redux';


const Admin = ({ handle_login_signup, handleModal }) => {
    let [firstName, setFirstName] = useState('')
    let [lastName, setLastName] = useState('')
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let [moduleName, setModuleName] = useState('')
    let [moduleCode, setModuleCode] = useState('')
    let edit = false
    let dob = ''
    let homeAddress = ''
    let mobileNumber = ''
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

    return (<Container fluid className='display pb-5'>
        <Navbar bg="black" className="justify-content-around mb-5">

            <div className='d-flex justify-content-center align-items-center logo my-1' ><FontAwesomeIcon icon={faSchool} size="2xl" /><span>MySch</span></div>

        </Navbar >

        {modal &&
            <Row className='d-flex justify-content-center'>
                <Col lg={4} md={6} sm={6} xs={8} className='text-center myModal'>
                    <span className='d-flex justify-content-between'> {modal} <button onClick={handleModal} className='border-0 bg-transparent text-white'>x</button></span>
                </Col>
            </Row>}
        <Row className='d-flex justify-content-center align-items-center'>

            <Col className='loginCol border rounded m-1' lg={4} md={5} sm={7} xs={10}>
                <Col>
                    {type === 'studentsignup' || type === 'tutorsignup' ?
                        < div className='d-flex justify-content-between'>
                            <Col lg={5} md={5} sm={12}>
                                <input className='inputs my-1 text-center w-100' value={firstName} onInput={(event) => setFirstName(event.target.value)} placeholder='first name' />
                            </Col>
                            <Col lg={5} md={5} sm={12}>
                                <input className='inputs my-1 text-center w-100' value={lastName} onInput={(event) => setLastName(event.target.value)} placeholder='last name' />
                            </Col>
                        </div> : null}
                    {type === 'tutorsignup' &&
                        < div className='d-flex justify-content-between'>
                            <Col lg={5} md={5} sm={12}>
                                <input className='inputs my-1 text-center w-100' value={moduleName} onInput={(event) => setModuleName(event.target.value)} placeholder='module name' />
                            </Col>
                            <Col lg={5} md={5} sm={12}>
                                <input className='inputs my-1 text-center w-100' value={moduleCode} onInput={(event) => setModuleCode(event.target.value)} placeholder='module code' />
                            </Col>
                        </div>}

                    <input className='inputs my-2 text-center w-100' type='email' value={email} onInput={(event) => setEmail(event.target.value)} placeholder='email' />
                    <input className='inputs my-2 text-center w-100' type='password' value={password} onInput={(event) => setPassword(event.target.value)} placeholder='password' />
                    <Col className='text-center my-2 py-0' lg={12} md={12} sm={12}>
                        <button className='py-0 loginbtn' onClick={() => handlelogin_signup(type)}>{type === 'tutor' || type === "student" ? <>Log in</> : <>Sign up</>}</button>
                    </Col>
                    {type === 'tutorsignup' || type === 'studentsignup' ? '' : <div className='text-center my-2'><button className='loginbtn py-0' onClick={type === 'student' ? () => handleType('studentsignup') : () => handleType('tutorsignup')}> signup </button></div>}
                </Col>
            </Col>
        </Row >
    </Container >)
}
export default Admin;