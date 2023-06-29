import React from 'react';
import { useParams, Link } from 'react-router-dom'
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import { faSchool } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Navbar } from 'react-bootstrap';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

const Grades = ({ schPortal }) => {
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
                    Grades
                </Col>

                {schPortal.resultArray ?
                    <Table striped bordered hover className='text-center table-responsive'>
                        <thead>
                            <tr>
                                <th>Module</th>
                                <th>Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {schPortal.resultArray.filter(a => a.display === 'dGrades' && studentId === a.studentId).map(a => (
                                <tr>
                                    <td>{a.moduleId}</td>
                                    <td>{a.finalScore}</td>
                                </tr>))}
                        </tbody>
                    </Table>

                    : <div>
                        <hr className='my-0'></hr>
                        <Col lg={12} md={12} sm={12} className='text-center'>No Grades Yet</Col>
                    </div>}

            </Row>
        </Container >
    </Container >)
}
export default Grades;