import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { MdSchool } from 'react-icons/md';
import { Navbar } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const UserHomePage = ({ handlePersonalInformation, handleSignOut }) => {

    const navigate = useNavigate();
    const { type } = useParams()
    let personalInformation = useSelector(state => state.personalInformation)

    useEffect(() => {
        if (personalInformation) return handlePersonalInformation(type)
    }, [personalInformation])


    return (<Container className="school-homepage" fluid>
        <Navbar bg="dark" className='justify-content-between'>
            <MdSchool className='school-logo' />
            <button onClick={() => handleSignOut()} className='signout-Btn'>signout</button>
        </Navbar>

        <Row className='d-flex justify-content-start'>
            <Col className='text-center user-intro-col m-1' lg={4} md={3} sm={4} xs={5}>
                {type === 'tutor' ?
                    <h5>{personalInformation.moduleName} {personalInformation.moduleCode}</h5>
                    :
                    <h5>Welcome {personalInformation.firstName}</h5>}
            </Col>
        </Row>

        <Row className="justify-content-center align-items-center my-5">
            <Col className="navigation-col m-1" lg={2} md={4} sm={6} xs={6}>
                <button
                    className="tutorButton"
                    onClick={
                        type === "student"
                            ? () => navigate(`/modules/${"student"}`)
                            : () => navigate(`/questions/${"tutor"}`)
                    }
                >
                    <h5>{type !== "student" ? 'Questions' : "My Modules"}</h5>
                </button>
            </Col>
            <Col className="navigation-col m-1" lg={2} md={4} sm={6} xs={6}>
                <button
                    className="tutorButton"
                    onClick={() => navigate(`/announcement/${type}`)}
                >
                    <h5>Info</h5>
                </button>
            </Col>
            <Col className="navigation-col m-1" lg={2} md={4} sm={6} xs={6}>
                <button className="tutorButton"
                    onClick={() => navigate(`/grades/${type}`)}>
                    <h5>Grades</h5>
                </button>
            </Col>
            <Col className="navigation-col m-1" lg={2} md={4} sm={6} xs={6}>
                <button
                    className="tutorButton"
                    onClick={() => navigate(`/PersonalInformation/${type}`)}
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
export default UserHomePage;