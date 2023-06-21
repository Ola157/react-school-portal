import React from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { faSchool } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Navbar } from 'react-bootstrap';


const TutorPage = () => {
    let { moduleId } = useParams()
    const navigate = useNavigate();

    const navigateBtn = any => {
        switch (true) {
            case any === 'questions':
                navigate(`/questions/${moduleId}`)
                break;
            case any === 'announcement':
                navigate(`/announcement/${moduleId}`)
                break;
            case any === 'results':
                navigate(`/results/${moduleId}`)
                break;
            case any === 'personalInfo':
                navigate(`/staffpInfo/${moduleId}`)
                break;
            case any === 'logout':
                navigate('/*')
                break;
        }
    }

    return (<Container fluid className='display pb-5'>
        <Navbar bg="black" className="justify-content-around">

            <div className='d-flex justify-content-center align-items-center logo my-1' ><FontAwesomeIcon icon={faSchool} size="2xl" /><span>MySch</span></div>
            <button onClick={() => navigateBtn('logout')} className='border-0 bg-transparent btn'>signout</button>
        </Navbar >

        <Container>
            <Row className='d-flex justify-content-center align-items-center mt-5 mb-5'>
                <Col className='m-1 btnNav d-flex justify-content-center align-items-center border rounded' lg={2} md={2} sm={6} xs={6} onClick={() => navigateBtn('questions')} >
                    Questions
                </Col>
                <Col className='m-1 btnNav d-flex justify-content-center align-items-center border rounded' lg={2} md={2} sm={6} xs={6} onClick={() => navigateBtn('announcement')} >
                    Infos
                </Col>
                <Col className='m-1 btnNav d-flex justify-content-center align-items-center border rounded' lg={2} md={2} sm={6} xs={6} onClick={() => navigateBtn('results')} >
                    Results
                </Col>
                <Col className='m-1 btnNav d-flex justify-content-center align-items-center border rounded text-center' lg={2} md={2} sm={6} xs={6} onClick={() => navigateBtn('personalInfo')} >
                    Personal Information
                </Col>
            </Row>
        </Container>

    </Container>)
}
export default TutorPage;