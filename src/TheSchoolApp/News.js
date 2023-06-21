import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { faSchool } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Navbar } from 'react-bootstrap';

const News = ({ schPortal }) => {
    return (<Container fluid className='display pb-5'>
        <Navbar bg="black" className="justify-content-around">

            <div className='d-flex justify-content-center align-items-center logo my-1' ><FontAwesomeIcon icon={faSchool} size="2xl" /><span>MySch</span></div>
        </Navbar >
        <Container fluid className='mt-2'>
            <Row className='bg-light'>
                <Col className='text-center' lg={12}>Announcements</Col>
                <hr className='my-0'></hr>
                {schPortal.informationArray ?
                    schPortal.informationArray.filter(a => a.display === 'dInfo').map(a => (
                        <Col className='d-flex'>
                            <Col>
                                {a.moduleId}
                            </Col>
                            < Col >
                                {a.post}
                            </Col>
                        </Col>))
                    : <Col className='text-center'>No Announcements Yet</Col>}

            </Row>
        </Container >
    </Container >)
}
export default News;