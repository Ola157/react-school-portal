import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const AuthXsSm = ({
    handleAuth,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    password,
    setPassword,
    moduleName,
    setModuleName,
    moduleCode,
    setModuleCode,
    path,
    handlePath }) => {


    return (<Container>
        <Row className="justify-content-center">
            <Col className='login-col' sm={12} xs={12}>
                {path === 'studentsignup' || path === 'tutorsignup' ?
                    <Row >
                        <Col sm={12} xs={12}>
                            <input className='syn-input' value={firstName}
                                onInput={(event) => setFirstName(event.target.value)} placeholder='first name' />
                        </Col>
                        <Col sm={12} xs={12}>
                            <input className='syn-input' value={lastName}
                                onInput={(event) => setLastName(event.target.value)} placeholder='last name' />
                        </Col>
                    </Row> : null}

                {path === 'tutorsignup' &&
                    < Row >
                        <Col sm={12} xs={12}>
                            <input className='syn-input' value={moduleName}
                                onInput={(event) => setModuleName(event.target.value)} placeholder='module name' />
                        </Col>
                        <Col sm={12} xs={12}>
                            <input className='syn-input' value={moduleCode}
                                onInput={(event) => setModuleCode(event.target.value)} placeholder='module code' />
                        </Col>
                    </Row>}

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
                        onClick={() => handleAuth(path)}>
                        {path === 'tutor' || path === "student" ? <>sign in</> : <>register</>}
                    </button>
                </Col>

                {path == 'student' || path == 'tutor' ?
                    <div className='text-center my-1'>
                        <button className='py-0 syn-button'
                            onClick={path === 'student' ?
                                () => handlePath('studentsignup')
                                : () => handlePath('tutorsignup')}>
                            signup
                        </button>
                    </div> : <div className='text-center my-1'>
                        Existing User?
                        <button className='py-0 syn-button'
                            onClick={path === 'student' ?
                                () => handlePath('student')
                                : () => handlePath('tutor')}>
                            signin
                        </button>
                    </div>}
            </Col>
        </Row>
    </Container >)
}

export default AuthXsSm