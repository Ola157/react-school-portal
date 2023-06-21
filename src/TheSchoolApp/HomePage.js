import React from 'react';
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPeopleLine } from '@fortawesome/free-solid-svg-icons'
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons'
import { faSchool } from '@fortawesome/free-solid-svg-icons'
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Navbar } from 'react-bootstrap';

const HomePage = () => {
    const navigate = useNavigate();

    const navigateBtn = id => {
        switch (true) {
            case id === 'staff':
                navigate(`admin/${id}`)
                break;
            case id === 'student':
                navigate(`admin/${id}`)
                break;
            case id === 'guest':
                navigate('/guest')
                break;
        }

    }

    return (
        <Container className='display pb-5' fluid >
            <Navbar bg="black" className="justify-content-around">

                <div className='d-flex justify-content-center align-items-center logo my-1' ><FontAwesomeIcon icon={faSchool} size="2xl" /><span>MySch</span></div>

            </Navbar >


            <Row className='justify-content-center'>
                <Col className='homepage my-5 px-0 pe-0 rounded border py-1' rounded lg={4} >
                    <div className='text-center'>Please select a profile</div>
                    <hr className='my-1 text-white'></hr>
                    <div className='d-flex justify-content-center align-items-center logo my-1' ><FontAwesomeIcon icon={faSchool} size="2xl" /><span>MySch</span></div>
                    <div className='text-center my-2'>Welcome to MySch - MySch's Student Portal</div>
                    <hr className='my-0 text-white'></hr>
                    <button className='d-flex btn justify-content-between align-items-center w-100' onClick={() => navigateBtn('student')} ><FontAwesomeIcon icon={faPeopleLine} />Student  <FontAwesomeIcon icon={faRightToBracket} /></button>
                    <hr className='my-0 text-white'></hr>
                    <button className='d-flex btn justify-content-between align-items-center w-100' onClick={() => navigateBtn('staff')} ><FontAwesomeIcon icon={faPeopleLine} />Staff  <FontAwesomeIcon icon={faRightToBracket} /></button>
                    <hr className='my-0 text-white'></hr>
                    <button className='d-flex btn justify-content-between align-items-center w-100' onClick={() => navigateBtn('guest')} ><FontAwesomeIcon icon={faPeopleLine} />Guest  <FontAwesomeIcon icon={faRightToBracket} /></button>
                </Col>

            </Row >
        </Container >)
}
export default HomePage;