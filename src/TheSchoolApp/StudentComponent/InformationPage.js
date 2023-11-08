import React, { useEffect } from "react";
import { Col, Container, Navbar, Row, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { HiBackspace } from 'react-icons/hi';
import { MdSchool } from 'react-icons/md';

const StudentInformation = ({
    handleGetInformations,
    handleNavigation,
    handleOpacity
}) => {
    const informations = useSelector(state => state.informations)
    const opaCity = useSelector(state => state.opacity)

    useEffect(() => {
        handleGetInformations('student')

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
                <h3 className='text-center'>Informations</h3>
            </Col>
        </Row>

        <Row className='justify-content-center'>
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

        <Row className='justify-content-center'>
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