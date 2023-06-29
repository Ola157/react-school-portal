import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import { faSchool } from '@fortawesome/free-solid-svg-icons'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Navbar } from 'react-bootstrap';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const Results = ({ schPortal, displayControl }) => {
    const { moduleId } = useParams();
    let [validate, setVal] = useState('')
    let [valTwo, setValTwo] = useState('')
    let counter = 1

    useEffect(() => {
        let a = schPortal.resultArray ? schPortal.resultArray.find(a => a.display === 'dGrades' && a.moduleId === moduleId) : ''
        let b = schPortal.resultArray ? schPortal.resultArray.find(a => a.moduleId === moduleId) : ''
        setValTwo(b)
        setVal(a)
    }, [schPortal.resultArray, []])

    return (<Container fluid className='display pb-5'>
        <Navbar bg="black" className="justify-content-around">

            <div className='d-flex justify-content-center align-items-center logo my-1' ><FontAwesomeIcon icon={faSchool} size="2xl" /><span>MySch</span></div>
        </Navbar >

        <Container fluid>
            <Row className='bg-light mt-2'>
                <Col lg={12} md={12} sm={12} className='d-flex justify-content-start align-items-center my-1'>
                    <Link to={`/staff/${moduleId}`}><FontAwesomeIcon className='backIcon' icon={faArrowLeft} /></Link>
                </Col>

                <hr className='my-0'></hr>
                <Col lg={12} md={12} sm={12} className='d-flex  justify-content-center align-items-center'>
                    Results
                </Col>

                <Col >
                    {schPortal.resultArray ?
                        <Table striped bordered hover className='text-center my-2 table-responsive'>
                            <thead>
                                <tr>
                                    <th>S/N</th>
                                    <th>Student Number</th>
                                    <th>Student Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                {schPortal.resultArray.filter((a) => a.moduleId === moduleId).map((a, index) =>
                                (<tr key={index}>
                                    <td>{counter++}</td>
                                    <td>{a.studentId}</td>
                                    <td>{a.finalScore}</td>
                                </tr>))
                                }
                            </tbody>
                        </Table>
                        : <Col className='text-center'>No Grades Yet</Col>}

                    {valTwo ?
                        !validate ?
                            <div className='my-2'><button className='btn my-1 py-0 border rounded' onClick={() => displayControl({ any: 'dGrades', moduleId })}>Send Grades</button></div>
                            : <div className='my-2'><button className='btn my-1 py-0 border rounded' onClick={() => displayControl({ any: '!dGrades', moduleId })}>Delete Grades</button></div>
                        : ''}
                </Col>
            </Row>
        </Container>

    </Container>)
}
export default Results;