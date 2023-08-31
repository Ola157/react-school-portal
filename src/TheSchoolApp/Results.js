import React, { useState, useEffect, Fragment } from 'react';
import { useParams, Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import { faSchool } from '@fortawesome/free-solid-svg-icons'
import { PiArrowFatLineLeft } from 'react-icons/pi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Navbar } from 'react-bootstrap';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useSelector } from 'react-redux';

const Results = ({ handleFetchResults, handleDisplay }) => {
    let allResults = useSelector(state => state.allResults)
    const { typeId } = useParams()
    useEffect(() => {
        if (allResults) return handleFetchResults(typeId)
    }, [allResults])


    return (<Container fluid className='display pb-5'>
        <Navbar bg="black" className="justify-content-around">

            <div className='d-flex justify-content-center align-items-center logo my-1' ><FontAwesomeIcon icon={faSchool} size="2xl" /><span>MySch</span></div>
        </Navbar >

        <Row className='p-3 my-0'>
            <Col lg={2} md={2} sm={2} xs={2} className='px-0 pe-0'>
                <Link to={`/userhomepage/${typeId}`} className='bg-white d-flex justify-content-center align-items-center pe-0 px-0 mx-0 me-0 backLink' ><PiArrowFatLineLeft className='mx-1' style={{ fontSize: '1.3em' }} /> <span>HomePage</span></Link>
            </Col>
        </Row>

        <Row className='d-flex justify-content-center'>

            <Col lg={5} md={6} sm={7} xs={8} className='d-flex justify-content-center align-items-center h3headings my-3'>

                <h3>All Grades</h3>
            </Col>

            {allResults.length && typeId === 'tutor' &&
                <Col lg={8} md={10} sm={10} xs={10} className='bg-light'>
                    <Table striped bordered hover className='text-center my-2 table-responsive'>
                        <thead>
                            <tr>
                                <th>S/N</th>
                                <th>Test Title</th>
                                <th>Student Name</th>
                                <th>Student Score</th>
                            </tr>
                        </thead>

                        {allResults && allResults.map((grade, index) =>
                        (<tbody key={index}>
                            <tr>
                                <td>{index + 1}</td>
                                <td>
                                    <button className='m-1 questionBtn' onClick={() => handleDisplay('show', grade.assesmentId)}>Click For <span style={{ fontWeight: 'bold' }}>{grade.assesmentTitle}</span> Grades</button>
                                    <button className='m-1 questionBtn' onClick={!grade.displayGrade ?
                                        () => handleDisplay('display', grade.assesmentId) :
                                        () => handleDisplay('undisplay', grade.assesmentId)}>
                                        {!grade.displayGrade ? <>Send <span style={{ fontWeight: 'bold' }}>{grade.assesmentTitle}</span> Results</> : <>Unsend <span style={{ fontWeight: 'bold' }}>{grade.assesmentTitle}</span> Results</>}
                                    </button>
                                </td>
                            </tr>
                            {grade.showResults &&
                                grade.grades.map((grad, i) => (<tr key={i}>
                                    <td colSpan={2}></td>
                                    <td>{grad.studentName}</td>
                                    <td>{grad.grade}</td>
                                </tr>))}
                        </tbody>))
                        }
                    </Table>
                </Col>
            }

            {
                allResults.length && typeId === 'student' &&
                <Col lg={8} md={10} sm={10} xs={10} className='bg-light'>
                    <Table striped bordered hover className='text-center my-2 table-responsive'>
                        <thead>
                            <tr>
                                <th>Module Name</th>
                                <th>Module Code</th>
                                <th>Test Title</th>
                                <th>Grade</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allResults.map((res, index) => (
                                <tr key={index}>
                                    <td>{res.moduleName}</td>
                                    <td>{res.moduleCode}</td>
                                    <td>{res.assesmentTitle}</td>
                                    <td>{res.grade}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            }

            {
                typeId === 'student' && !allResults.length || typeId === 'tutor' && !allResults.length ?
                    <Col lg={7} md={5} sm={8} xs={10} className='d-flex justify-content-center my-2'>
                        <h3 className='px-1 pe-1 py-2 w-50 text-center results'>No Grades Yet</h3>
                    </Col> : ''
            }

        </Row >

    </Container >)
}
export default Results;