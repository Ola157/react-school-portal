import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { HiBackspace } from 'react-icons/hi';
import { MdSchool } from 'react-icons/md';
import { Navbar, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const ModuleInformation = ({
    handleModuleData,
    handleNavigation }) => {

    const { moduleId } = useParams()
    const assessments = useSelector(state => state.assessments)
    const informations = useSelector(state => state.informations)

    useEffect(() => {
        handleModuleData(moduleId)
    }, [])


    return (<Container className="school-homepage" fluid    >
        <Navbar bg="dark" className='justify-content-between'>
            <MdSchool className='school-logo' />
        </Navbar>

        <Row className='m-0 justify-content-start'>
            <Col lg={2} md={3} sm={4} xs={4} className='return-link'>
                <button onClick={() => handleNavigation(`/modules`)}  >
                    <HiBackspace /> <span>My Modules</span>
                </button>
            </Col>
        </Row>

        <Row className='justify-content-center m-1'>
            <Col lg={5} md={6} sm={7} xs={8} className='heading-col d-flex justify-content-center'>
                <h3>Module Data</h3>
            </Col>
        </Row>


        <Row className='justify-content-center p-3 mx-0 me-0 mt-3' >
            <Col lg={12} md={12} sm={7} xs={10} className='heading-col d-flex justify-content-center'>
                <h5 className='moduleDataHeadings'>Assessments</h5>
            </Col>

            <Col lg={5} md={5} sm={12} xs={12} className='table-responsive table-col text-center'>
                {assessments.length > 0 ?
                    <Table bordered >
                        <thead>
                            <tr>
                                <th>
                                    Assesment Title
                                </th>
                            </tr>
                        </thead>
                        {assessments.map((assess, index) => (
                            <tbody key={index}>
                                <tr>
                                    <td>{assess.assessmentTitle}</td>
                                    <td className='text-center'>
                                        <button className='module-link'
                                            onClick={() => handleNavigation(`/test/${assess._id}`)}>Click To Attempt</button>
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
        </Row>

        <Row className='justify-content-center p-3 mx-0 me-0 mt-3' >
            <Col lg={12} md={12} sm={7} xs={10} className='heading-col d-flex justify-content-center'>
                <h5 className='moduleDataHeadings'>Informations</h5>
            </Col>

            <Col lg={5} md={6} sm={12} xs={12} className='table-responsive table-col text-center d-flex justify-content-center'>
                {informations.length > 0 ?
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
                        {informations.map((info, i) => (
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
export default ModuleInformation;