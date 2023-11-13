import React, { useEffect } from "react";
import { Col, Container, Navbar, Row, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { HiBackspace } from 'react-icons/hi';
import { MdSchool } from 'react-icons/md';

const StudentInformation = ({
    handleGetInformations,
    handleNavigation
}) => {
    const informations = useSelector(state => state.informations)

    useEffect(() => {
        handleGetInformations('student')
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
                <h3 className='text-center'>Informations</h3>
            </Col>
        </Row>

        <Row className='justify-content-center mt-5 mx-0 me-0'>
            {informations.length > 0 &&
                <Col lg={10} md={10} sm={10} xs={10} className='table-responsive table-col my-3 text-center'>
                    <Table bordered>
                        <thead>
                            <tr>
                                <th>Module Name</th>
                                <th>Title</th>
                                <th>Information</th>
                            </tr>
                        </thead>
                        {informations.map((info, index) =>
                        (<tbody key={index} >

                            <tr><td>{info.moduleName}</td><td>{info.title}</td><td>{info.information}</td></tr>
                        </tbody>))}
                    </Table>
                </Col>
            }
        </Row >

        <Row className='justify-content-center m-0'>
            {!informations.length > 0 &&
                <Col lg={7} md={5} sm={8} xs={10} className='table-col d-flex justify-content-center text-center'>
                    <Table bordered>
                        <tbody>
                            <tr>
                                <td colSpan={2}>No Informations, Check Back</td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
            }
        </Row>

        <div className="fixed-margin">
        </div>

        <footer className="school-footer">
            <Container fluid>
                <Row>
                    <Col lg={12} className="text-center">
                        <p>&copy; 2023 GoldenGate Academy. All Rights Reserved.</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    </Container>)
}
export default StudentInformation