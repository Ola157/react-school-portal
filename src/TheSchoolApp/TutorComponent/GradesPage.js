import React, { useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import { HiBackspace } from 'react-icons/hi';
import { MdSchool } from 'react-icons/md';
import { Navbar } from 'react-bootstrap';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useSelector } from 'react-redux';

const TutorGradesPage = ({
    handleTutorGrades,
    handleSendGrade,
    handleNavigation
}) => {


    const grades = useSelector(state => state.grades)

    useEffect(() => {
        handleTutorGrades()
    }, [])

    return (<Container className="school-homepage" fluid>
        <Navbar bg="dark" className='justify-content-between'>
            <MdSchool className='school-logo' />
        </Navbar>

        <Row className='m-0 justify-content-start'>
            <Col lg={2} md={3} sm={4} xs={4} className='return-link'>
                <button onClick={() => handleNavigation(`/tutorHomepage`)}  >
                    <HiBackspace /> <span>HomePage</span>
                </button>
            </Col>
        </Row>

        <Row className='justify-content-center m-1'>
            <Col lg={5} md={6} sm={7} xs={8} className='heading-col d-flex justify-content-center'>
                <h3 className='text-center'>Grades</h3>
            </Col>
        </Row>

        <Row className='justify-content-center my-5 mx-0 me-0'>
            {grades &&
                <Col lg={10} md={10} sm={10} xs={10} className='table-responsive table-col text-center mb-5'>
                    {grades.map((grade, index) =>
                    (<Table bordered key={index}>
                        <thead>
                            <tr>
                                <th colSpan={2}>{grade.assessmentTitle}</th>
                                <th>
                                    <button className='syn-button py-0' onClick={!grade.sendGrade ?
                                        () => handleSendGrade('send', grade.assessmentId) :
                                        () => handleSendGrade('cancel', grade.assessmentId)}>
                                        {!grade.sendGrade ? <>Send</> : <>Unsend</>}
                                    </button>
                                </th>
                            </tr>
                            <tr>
                                <th>S/N</th>
                                <th>Name</th>
                                <th>Grade</th>
                            </tr>
                        </thead>
                        <tbody >
                            {grade.grades.map((grad, i) => (<tr key={i}>
                                <td>{i + 1}</td>
                                <td>{grad.studentName}</td>
                                <td>{grad._doc.grade}</td>
                            </tr>))}
                        </tbody>
                    </Table>))}
                </Col>
            }
        </Row >

        <Row className='justify-content-center'>
            {!grades.length &&
                <Col lg={7} md={5} sm={8} xs={10} className='table-col d-flex justify-content-center text-center'>
                    <Table bordered>
                        <tbody>
                            <tr>
                                <td colSpan={2}> No Grades Yet</td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
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
export default TutorGradesPage;