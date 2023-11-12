import React, { useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import { HiBackspace } from 'react-icons/hi';
import { MdSchool } from 'react-icons/md';
import { Navbar } from 'react-bootstrap';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useSelector } from 'react-redux';

const StudGradesPage = ({
    handleGetGrades,
    handleNavigation
}) => {

    const grades = useSelector(state => state.grades)

    useEffect(() => {
        handleGetGrades()
    }, [])


    return (<Container className="school-homepage" fluid>

        <Navbar bg="dark" className='justify-content-between'>
            <MdSchool className='school-logo' />
        </Navbar>

        <Row className='m-0 justify-content-start'>
            <Col lg={2} md={3} sm={4} xs={4} className='return-link'>
                <button onClick={() => handleNavigation(`/studentHomepage`)}  >
                    <HiBackspace /> <span>HomePage</span>
                </button>
            </Col>
        </Row>

        <Row className='justify-content-center m-1'>
            <Col lg={5} md={6} sm={7} xs={10} className='heading-col d-flex justify-content-center'>
                <h3 className='text-center'>Grades</h3>
            </Col>
        </Row>


        <Row className='justify-content-center mt-5 mx-0 me-0'>
            {grades.length > 0 &&
                <Col lg={8} md={8} sm={10} xs={10} className='table-responsive table-col text-center'>
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
                            {grades.map((res, index) => (
                                <tr key={index}>
                                    <td>{res.moduleName}</td>
                                    <td>{res.moduleCode}</td>
                                    <td>{res.assessmentTitle}</td>
                                    <td>{res.grade}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            }
        </Row >

        <Row className='justify-content-center m-0'>
            {!grades.length ?
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
export default StudGradesPage;