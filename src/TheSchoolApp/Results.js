import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import { HiBackspace } from 'react-icons/hi';
import { MdSchool } from 'react-icons/md';
import { Navbar } from 'react-bootstrap';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useSelector } from 'react-redux';

const Results = ({ handleFetchResults, handleDisplay }) => {
    let allResults = useSelector(state => state.allResults)
    const { typeId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (allResults) return handleFetchResults(typeId)
    }, [allResults])

    return (<Container className="school-homepage" fluid>
        <Navbar bg="dark" className='justify-content-between'>
            <MdSchool className='school-logo' />
        </Navbar>

        <Row className='p-3 my-0'>
            <Col lg={2} md={3} sm={4} xs={4} className='px-0 pe-0'>
                <Link to={`/userhomepage/${typeId}`} className='return-link' >
                    <HiBackspace /> <span>HomePage</span>
                </Link>
            </Col>
        </Row>

        <Row className='justify-content-center m-1'>
            <Col lg={5} md={6} sm={7} xs={8} className='heading-col d-flex justify-content-center'>
                <h3 className='text-center'>All Grades</h3>
            </Col>
        </Row>

        <Row className='justify-content-center'>
            {allResults.length > 0 && typeId === 'tutor' &&
                <Col lg={8} md={8} sm={10} xs={10} className='table-responsive table-col text-center'>
                    <Table bordered>
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
                                    <button className='syn-button' onClick={() => handleDisplay('show', grade.assesmentId)}>Click For <span style={{ fontWeight: 'bold' }}>{grade.assesmentTitle}</span> Grades</button>
                                    <button className='syn-button' onClick={!grade.displayGrade ?
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
                allResults.length > 0 && typeId === 'student' &&
                <Col lg={8} md={8} sm={10} xs={10} className='table-responsive table-col'>
                    <Table bordered>
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
        </Row >
        <Row className='justify-content-center'>
            {
                typeId === 'student' && !allResults.length || typeId === 'tutor' && !allResults.length ?
                    <Col lg={7} md={5} sm={8} xs={10} className='table-col d-flex justify-content-center text-center'>
                        <Table bordered>
                            <tbody>
                                <tr>
                                    <td colSpan={2}> No Grades Yet</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                    : null
            }

        </Row >
        <footer className="school-footer">
            <Container fluid>
                <Row>
                    <Col lg={12} className="text-center">
                        <p>&copy; 2023 GoldenGate Academy. All Rights Reserved.</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    </Container >)
}
export default Results;