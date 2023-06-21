import React from 'react';
import { Link, useParams } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { faSchool } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Navbar } from 'react-bootstrap';

const MyModules = ({ schPortal }) => {
    const { studentId } = useParams()

    return (<Container fluid className='display pb-5'>
        <Navbar bg="black" className="justify-content-around">

            <div className='d-flex justify-content-center align-items-center logo my-1' ><FontAwesomeIcon icon={faSchool} size="2xl" /><span>MySch</span></div>
        </Navbar >

        <Container fluid>
            <Row className='bg-light mt-2 py-1'>
                <Col className='text-center'>My Modules</Col>
                <hr className='my-1'></hr>
                <Col >
                    {schPortal.staffArray ? schPortal.staffArray.map(a => (<>
                        <Link to={`/fullmode/${a.moduleId}/${studentId}`}>{a.moduleId}</Link>
                    </>)) : ''}
                </Col>
            </Row>
        </Container>
    </Container>)
}
export default MyModules;