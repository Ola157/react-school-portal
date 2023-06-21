import React from 'react';
import { useParams } from 'react-router-dom'
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import { faSchool } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Navbar } from 'react-bootstrap';

const Grades = ({ schPortal }) => {
    const { studentId } = useParams()

    return (<Container fluid className='display pb-5'>
        <Navbar bg="black" className="justify-content-around">

            <div className='d-flex justify-content-center align-items-center logo my-1' ><FontAwesomeIcon icon={faSchool} size="2xl" /><span>MySch</span></div>
        </Navbar >
        <Container fluid className='mt-2'>
            <Row className='bg-light'>
                <Col className='text-center' lg={12}>Grades</Col>
                <hr className='my-0'></hr>
                {schPortal.resultArray ?
                    <Table striped bordered hover className='text-center'>
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

                    : <Col className='text-center'>No Grades Yet</Col>}

            </Row>
        </Container >
    </Container >)
}
export default Grades;