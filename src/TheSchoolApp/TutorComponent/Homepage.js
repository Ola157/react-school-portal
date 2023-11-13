import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { MdSchool } from 'react-icons/md';
import { Navbar } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const TutorHomePage = ({
    handleModuleInformation,
    handleSignOut,
    handleNavigation
}) => {

    const moduleInformation = useSelector(state => state.moduleInformation)
    const isLogged = useSelector(state => state.isLogged)

    useEffect(() => {
        if (!isLogged) return handleNavigation('/')
        handleModuleInformation()
    }, [])

    return (<Container className="school-homepage" fluid>
        <Navbar bg="dark" className='justify-content-between'>
            <MdSchool className='school-logo' />
            <button onClick={() => handleSignOut()} className='signout-Btn'>signout</button>
        </Navbar>

        <Row className='justify-content-start m-0'>
            <Col className='text-center user-intro-col m-1' lg={4} md={3} sm={4} xs={5}>
                {moduleInformation && <h5>{moduleInformation.moduleName} {moduleInformation.moduleCode}</h5>}
            </Col>
        </Row>

        <Row className="homepage-row">
            <Col className="navigation-col" lg={2} md={4} sm={6} xs={10}>
                <button
                    className="tutorButton"
                    onClick={() => handleNavigation(`/assessments`)}>
                    <h5>Assessments</h5>
                </button>
            </Col>

            <Col className="navigation-col" lg={2} md={4} sm={6} xs={10}>
                <button
                    className="tutorButton"
                    onClick={() => handleNavigation(`/tutorinformation`)}
                >
                    <h5>Informations</h5>
                </button>
            </Col>

            <Col className="navigation-col" lg={2} md={4} sm={6} xs={10}>
                <button className="tutorButton"
                    onClick={() => handleNavigation(`/tutorgrades`)}>
                    <h5>Grades</h5>
                </button>
            </Col>

            <Col className="navigation-col" lg={2} md={4} sm={6} xs={10}>
                <button
                    className="tutorButton"
                    onClick={() => handleNavigation(`/tutorbiodata`)}
                >
                    <h5>BioData</h5>
                </button>
            </Col>
        </Row>

        <div className="fixed-margin">
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
    </Container >
    )
}
export default TutorHomePage;