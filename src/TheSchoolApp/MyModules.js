import React from 'react';
import { Link, useParams } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { faSchool } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Navbar } from 'react-bootstrap';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faCaretRight } from '@fortawesome/free-solid-svg-icons'


const MyModules = ({ schPortal }) => {
    const { studentId } = useParams()

    return (<Container fluid className='display pb-5'>
        <Navbar bg="black" className="justify-content-around">

            <div className='d-flex justify-content-center align-items-center logo my-1' ><FontAwesomeIcon icon={faSchool} size="2xl" /><span>MySch</span></div>
        </Navbar >

        <Container fluid>
            <Row className='bg-light mt-2 py-1'>
                <Col lg={12} md={12} sm={12} className='d-flex justify-content-start align-items-center my-1'>
                    <Link to={`/student/${studentId}`}><FontAwesomeIcon className='backIcon' icon={faArrowLeft} /></Link>
                </Col>

                <hr className='my-0'></hr>
                <Col lg={12} md={12} sm={12} className='d-flex  justify-content-center align-items-center'>
                    Modules
                </Col>
                <hr className='my-1'></hr>
                {schPortal.staffArray ? schPortal.staffArray.map((a, index) => (
                    <Col lg={12} md={12} sm={12} key={index}>

                        <Link className='d-block align-self-center' style={{ textDecoration: 'none', color: 'black' }} to={`/fullmode/${a.moduleId}/${studentId}`}><FontAwesomeIcon className='mx-1' icon={faCaretRight} /> {a.moduleId}
                        </Link>
                        <hr className='my-1'></hr>
                    </Col>))
                    : <Col className='text-center'>No Modules Yet</Col>}

            </Row>
        </Container>
    </Container >)
}
export default MyModules;