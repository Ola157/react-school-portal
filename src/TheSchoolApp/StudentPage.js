import React from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { faSchool } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Navbar } from 'react-bootstrap';

const StudentPage = ({ schPortal }) => {
    const { studentId } = useParams();

    const navigate = useNavigate();

    const navigateBtn = any => {
        switch (true) {
            case any === 'modules':
                navigate(`/modules/${studentId}`)
                break;
            case any === 'news':
                navigate('/news')
                break;
            case any === 'grades':
                navigate(`/grades/${studentId}`)
                break;
            case any === 'studentInfo':
                navigate(`/studentpInfo/${studentId}`)
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
                <Col className='m-1 btnNav d-flex justify-content-center align-items-center border rounded' lg={2} onClick={() => navigateBtn('modules')} >
                    My Modules
                </Col>
                <Col className='m-1 btnNav d-flex justify-content-center align-items-center border rounded' lg={2} onClick={() => navigateBtn('news')} >
                    News
                </Col>
                <Col className='m-1 btnNav d-flex justify-content-center align-items-center border rounded' lg={2} onClick={() => navigateBtn('grades')} >
                    Grades
                </Col>
                <Col className='m-1 btnNav d-flex justify-content-center align-items-center border rounded text-center' lg={2} onClick={() => navigateBtn('studentInfo')} >
                    Personal Information
                </Col>
            </Row>
        </Container>

    </Container>
    )
}
export default StudentPage;