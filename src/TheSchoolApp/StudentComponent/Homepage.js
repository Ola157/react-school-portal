import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { MdSchool } from 'react-icons/md';
import { Navbar } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const StudentHomePage = ({
    handleBioData,
    handleSignOut,
    handleNavigation,
    handleOpacity }) => {

    const bioData = useSelector(state => state.bioData)
    const isLogged = useSelector(state => state.isLogged)
    const opaCity = useSelector(state => state.opacity)


    useEffect(() => {
        if (!isLogged) return handleNavigation('/')

        handleBioData('student')
        handleOpacity()

    }, [])


    return (<Container className="school-homepage" fluid
        style={{ opacity: opaCity ? '1' : '0', transition: '500ms ease-in-out' }}
    >
        <Navbar bg="dark" className='justify-content-between'>
            <MdSchool className='school-logo' />
            <button onClick={() => handleSignOut()} className='signout-Btn'>signout</button>
        </Navbar>

        <Row className='d-flex justify-content-start'>
            {bioData && <Col className='text-center user-intro-col m-1' lg={4} md={3} sm={4} xs={5}>
                <h5>Welcome {bioData.firstName}</h5>
            </Col>}
        </Row>

        <Row className="justify-content-center align-items-center my-5">
            <Col className="navigation-col m-1" lg={2} md={4} sm={6} xs={6}>
                <button
                    className="tutorButton"
                    onClick={() => handleNavigation(`/modules`)}>
                    <h5>My Modules</h5>
                </button>
            </Col>
            <Col className="navigation-col m-1" lg={2} md={4} sm={6} xs={6}>
                <button
                    className="tutorButton"
                    onClick={() => handleNavigation(`/studentinformation`)}
                >
                    <h5>Informations</h5>
                </button>
            </Col>
            <Col className="navigation-col m-1" lg={2} md={4} sm={6} xs={6}>
                <button className="tutorButton"
                    onClick={() => handleNavigation(`/studentgrades`)}>
                    <h5>Grades</h5>
                </button>
            </Col>
            <Col className="navigation-col m-1" lg={2} md={4} sm={6} xs={6}>
                <button
                    className="tutorButton"
                    onClick={() => handleNavigation(`/studentbio`)}
                >
                    <h5>Profile</h5>
                </button>
            </Col>
        </Row>

        <footer className="school-footer">
            <Container fluid>
                <Row>
                    <Col lg={12} className="text-center">
                        <p>&copy; 2023 GoldenGate Academy. All Rights Reserved.</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    </Container >
    )
}
export default StudentHomePage;