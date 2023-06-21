import React from 'react';
import { Link, useParams } from 'react-router-dom'
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { faSchool } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Navbar } from 'react-bootstrap';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'


const News = ({ schPortal }) => {
    const { studentId } = useParams()
    return (<Container fluid className='display pb-5'>
        <Navbar bg="black" className="justify-content-around">

            <div className='d-flex justify-content-center align-items-center logo my-1' ><FontAwesomeIcon icon={faSchool} size="2xl" /><span>MySch</span></div>
        </Navbar >
        <Container fluid className='mt-2'>
            <Row className='bg-light'>
                <Col lg={12} md={12} sm={12} className='d-flex justify-content-start align-items-center my-1'>
                    <Link to={`/student/${studentId}`}><FontAwesomeIcon className='backIcon' icon={faArrowLeft} /></Link>
                </Col>

                <hr className='my-0'></hr>
                <Col lg={12} md={12} sm={12} className='d-flex  justify-content-center align-items-center'>
                    Announcements
                </Col>
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
                    : <Col lg={12} md={12} sm={12} className='text-center'>No Announcements Yet</Col>}

            </Row>
        </Container >
    </Container >)
}
export default News;