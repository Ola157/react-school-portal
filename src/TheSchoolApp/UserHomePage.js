import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { faSchool } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Navbar } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const UserHomePage = ({ handlePersonalInformation, handleSignOut }) => {

    const navigate = useNavigate();
    const { type } = useParams()
    let personalInformation = useSelector(state => state.personalInformation)

    useEffect(() => {
        if (personalInformation) return handlePersonalInformation(type)
    }, [personalInformation])

    const handleLogOut = () => {
        handleSignOut()
        localStorage.removeItem('accessToken')
        navigate('/')
    }

    return (<Container fluid className='display pb-5'>
        <Navbar bg="black" className="justify-content-around">

            <div className='d-flex justify-content-center align-items-center logo my-1' ><FontAwesomeIcon icon={faSchool} size="2xl" /><span>MySch</span></div>
            <button onClick={() => handleLogOut('logout')} className='signOutBtn'>signout</button>
        </Navbar >

        <Row className='d-flex justify-content-start'>
            <Col className='text-center my-2 mx-3' lg={4} md={3} sm={4} xs={5}>
                <div className='d-flex justify-content-evenly align-items-center py-0 module'> <span>{type === 'tutor' ? personalInformation.moduleName : <><span>Welcome </span> {personalInformation.firstName}</>}</span> <span>{type === 'tutor' && personalInformation.moduleCode}</span></div>
            </Col>
        </Row>
        <Row className='d-flex justify-content-center align-items-center mt-5 mb-5'>
            <Col className='m-1  d-flex justify-content-center align-items-center p-0' lg={2} md={2} sm={6} xs={6} >
                <button className='tutorButton' onClick={type === 'student' ? () => navigate(`/modules/${'student'}`) : () => navigate(`/questions/${'tutor'}`)} >{type != 'student' ? 'Questions' : "My Modules"}</button>
            </Col>
            <Col className='m-1 d-flex justify-content-center align-items-center p-0' lg={2} md={2} sm={6} xs={6}  >
                <button className='tutorButton' onClick={() => navigate(`/announcement/${type}`)}>Informations</button>
            </Col>
            <Col className='m-1 d-flex justify-content-center align-items-center p-0' lg={2} md={2} sm={6} xs={6}  >
                <button className='tutorButton' onClick={() => navigate(`/grades/${type}`)}>Grades</button>
            </Col>
            <Col className='m-1 d-flex justify-content-center align-items-center p-0 ' lg={2} md={2} sm={6} xs={6} >
                <button className='tutorButton' onClick={() => navigate(`/PersonalInformation/${type}`)} > Personal Information</button>
            </Col>
        </Row>

    </Container >
    )
}
export default UserHomePage;