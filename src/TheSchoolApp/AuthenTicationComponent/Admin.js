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
import AuthLgMd from './AuthLgMdPage';
import AuthXsSm from './AuthXsSmPage';


const Admin = ({
    handleAuthentication
}) => {

    let [firstName, setFirstName] = useState('')
    let [lastName, setLastName] = useState('')
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let [moduleName, setModuleName] = useState('')
    let [moduleCode, setModuleCode] = useState('')
    const { id } = useParams()
    let [path, handlePath] = useState(id)
    const navigate = useNavigate();
    const state = useSelector(state => state)
    const message = useSelector(state => state.message)
    const error = useSelector(state => state.error)


    useEffect(() => {
        handleUseEffect()
    }, [state]);

    const handleUseEffect = () => {
        if (state.isLogged) {
            const path = id === 'student' ?
                '/studenthomepage' : '/tutorhomepage';
            return navigate(path);
        }
        if (state.isRegistered) {
            return handlePath(id);
        }
    }

    const handleAuth = () => {
        if (!email && !password) return
        let edit = false
        let dob = ''
        let homeAddress = ''
        let mobileNumber = ''
        switch (path) {
            case 'student':
                handleAuthentication({ path, email, password })
                setPassword('')
                setEmail('')
                break
            case 'tutor':
                handleAuthentication({ path, email, password })
                setPassword('')
                setEmail('')
                break
            case 'tutorsignup':
                handleAuthentication({ path, email, password, firstName, lastName, dob, homeAddress, mobileNumber, moduleName, moduleCode, edit })
                setPassword('')
                setEmail('')
                setFirstName('')
                setLastName('')
                setModuleCode('')
                setModuleName('')
                break;
            case 'studentsignup':
                handleAuthentication({ path, email, password, firstName, lastName, dob, homeAddress, mobileNumber, edit })
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
            <Col lg={2} md={3} sm={5} xs={7} className='px-0 pe-0'>
                <Link to={'/'} className='return-link' >
                    <HiBackspace /> <span>Select Profile</span>
                </Link>
            </Col>
        </Row>

        <div className={`message-row ${message || error ? 'visible' : 'hidden'}`}>
            {(message || error) && (
                <Row className='justify-content-center'>
                    <Col lg={6} md={6} sm={7} xs={10} className='text-center message-col'>
                        <span>{message ? message : error}</span>
                    </Col>
                </Row>
            )}
        </div>


        <div className='d-none d-md-block py-5'>
            <AuthLgMd handleAuth={handleAuth}
                firstName={firstName}
                setFirstName={setFirstName}
                lastName={lastName}
                setLastName={setLastName}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                moduleName={moduleName}
                setModuleName={setModuleName}
                moduleCode={moduleCode}
                setModuleCode={setModuleCode}
                path={path}
                handlePath={handlePath}
            />
        </div>

        <div className='d-block d-md-none py-5'>
            <AuthXsSm handleAuth={handleAuth}
                firstName={firstName}
                setFirstName={setFirstName}
                lastName={lastName}
                setLastName={setLastName}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                moduleName={moduleName}
                setModuleName={setModuleName}
                moduleCode={moduleCode}
                setModuleCode={setModuleCode}
                path={path}
                handlePath={handlePath}
            />
        </div>



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