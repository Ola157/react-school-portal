import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { HiBackspace } from 'react-icons/hi';
import { MdSchool } from 'react-icons/md';
import { Navbar, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const ModuleDeets = ({ handleFetchModuleData }) => {
    const { moduleId } = useParams()
    let allQuestions = useSelector(state => state.allQuestions)
    let allInformations = useSelector(state => state.allInformations)

    useEffect(() => {
        handleFetchModuleData(moduleId)
    }, [])


    return (<Container className="school-homepage" fluid>
        <Navbar bg="dark" className='justify-content-between'>
            <MdSchool className='school-logo' />
        </Navbar>

        <Row className='p-3 my-0'>
            <Col lg={2} md={3} sm={4} xs={4} className='px-0 pe-0'>
                <Link to={`/modules/${'student'}`} className='return-link' >
                    <HiBackspace /> <span>My Modules</span>
                </Link>
            </Col>
        </Row>

        <Row className='justify-content-center m-1'>
            <Col lg={5} md={6} sm={7} xs={8} className='heading-col d-flex justify-content-center'>
                <h3>Module Data</h3>
            </Col>
        </Row>


        <Row className='d-flex justify-content-evenly p-3' >
            <Col lg={5} md={6} sm={12} xs={12}>
                <Col lg={12} md={12} sm={12} xs={12} className='d-flex justify-content-center'>
                    <h5 className='moduleDataHeadings'>Module Assessments</h5>
                </Col>

                <Col className='table-responsive table-col text-center'>
                    {allQuestions.length > 0 ?
                        <Table bordered >
                            <thead>
                                <tr>
                                    <th>
                                        Assesment Title
                                    </th>
                                </tr>
                            </thead>
                            {allQuestions.length &&
                                allQuestions.map((question, index) => (
                                    <tbody key={index}>
                                        <tr>
                                            <td>{question.testTitle}</td>
                                            <td className='text-center'>
                                                <Link className='module-link' to={`/assesment/${question._id}`}>Click To Attempt</Link>
                                            </td>
                                        </tr>
                                    </tbody>
                                ))}
                        </Table>
                        :
                        <Table bordered>
                            <tbody>
                                <tr>
                                    <td colSpan={2}>No Assessments, Check Back</td>
                                </tr>
                            </tbody>
                        </Table>}
                </Col>
            </Col>

            <Col lg={5} md={6} sm={12} xs={12}>
                <Col lg={12} md={12} sm={12} xs={12} className='d-flex justify-content-center'>
                    <h5 className='moduleDataHeadings'>Module Informations</h5>
                </Col>

                <Col className='table-responsive table-col text-center d-flex justify-content-center'>
                    {allInformations.length > 0 ?
                        <Table bordered >
                            <thead>
                                <tr>
                                    <th>
                                        Title
                                    </th>
                                    <th>
                                        Information
                                    </th>
                                </tr>
                            </thead>
                            {allInformations.length > 0 && allInformations.map((info, i) => (
                                <tbody key={i}><tr><td>{info.title}</td><td className='text-center'>{info.information}</td></tr></tbody>
                            ))}
                        </Table>
                        :
                        <Table bordered>
                            <tbody>
                                <tr>
                                    <td colSpan={2}>No Informations, Check Back</td>
                                </tr>
                            </tbody>
                        </Table>}
                </Col>
            </Col>
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
    </Container >)
}
export default ModuleDeets;