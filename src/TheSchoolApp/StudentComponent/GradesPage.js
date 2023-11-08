import React, { useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import { HiBackspace } from 'react-icons/hi';
import { MdSchool } from 'react-icons/md';
import { Navbar, Tab } from 'react-bootstrap';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useSelector } from 'react-redux';

const StudGradesPage = ({
    handleGetGrades,
    handleNavigation,
    handleOpacity
}) => {

    const grades = useSelector(state => state.grades)
    const opaCity = useSelector(state => state.opacity)

    useEffect(() => {
        handleGetGrades()

        handleOpacity()
    }, [])

    return (<Container className="school-homepage" fluid
        style={{ opacity: opaCity ? '1' : '0', transition: '500ms ease-in-out' }}
    >

        <Navbar bg="dark" className='justify-content-between'>
            <MdSchool className='school-logo' />
        </Navbar>

        <Row className='p-3 my-0'>
            <Col lg={2} md={3} sm={4} xs={4} className='px-0 pe-0'>
                <button onClick={() => handleNavigation(`/studentHomepage`)} className='return-link' >
                    <HiBackspace /> <span>HomePage</span>
                </button>
            </Col>
        </Row>

        <Row className='justify-content-center m-1'>
            <Col lg={5} md={6} sm={7} xs={8} className='heading-col d-flex justify-content-center'>
                <h3 className='text-center'>All Grades</h3>
            </Col>
        </Row>


        <Row className='justify-content-center'>
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

        <Row className='justify-content-center'>
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