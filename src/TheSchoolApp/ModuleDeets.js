import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { faSchool } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Navbar, Table } from 'react-bootstrap';
import { PiArrowFatLineLeft } from 'react-icons/pi';
import { useSelector } from 'react-redux';

const ModuleDeets = ({ handleFetchModuleData }) => {
    const { moduleId } = useParams()
    let allQuestions = useSelector(state => state.allQuestions)
    let allInformations = useSelector(state => state.allInformations)

    useEffect(() => {
        handleFetchModuleData(moduleId)
    }, [])


    return (<Container fluid className='display pb-5'>
        <Navbar bg="black" className="justify-content-around">

            <div className='d-flex justify-content-center align-items-center logo my-1' ><FontAwesomeIcon icon={faSchool} size="2xl" /><span>MySch</span></div>
        </Navbar >

        <Row className='p-3 my-0'>
            <Col lg={2} md={2} sm={2} xs={2} className='px-0 pe-0'>
                <Link to={`/modules/${'student'}`} className='bg-white d-flex justify-content-center align-items-center pe-0 px-0 mx-0 me-0 backLink' ><PiArrowFatLineLeft className='mx-1' style={{ fontSize: '1.3em' }} /> <span>My Modules</span></Link>
            </Col>
        </Row>

        <Row className='d-flex justify-content-center'>
            <Col lg={5} md={6} sm={7} xs={8} className='d-flex  justify-content-center align-items-center h3headings my-2'>
                <h3 >Module Data</h3>
            </Col>
        </Row>

        <Row className='d-flex justify-content-evenly p-3' >
            <Col className='m-1 moduleData py-2' lg={5} md={6} sm={12} xs={12}>
                <Col lg={12} md={12} sm={12} xs={12} className='text-center'><h5 className='moduleDataHeadings'>Module Assessments</h5></Col>

                <Col className='table-responsive m-2'>
                    {allQuestions.length > 0 ?
                        <Table striped bordered hover>
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
                                                <Link className='modulelink' to={`/assesment/${question._id}`}>Click To Attempt</Link>
                                            </td>
                                        </tr>
                                    </tbody>
                                ))}
                        </Table> :
                        <h6 className='text-center'>No Assessments, Check Back</h6>}
                </Col>
            </Col>

            <Col className='m-1 moduleData py-2' lg={5} md={6} sm={12} xs={12}>
                <Col lg={12} md={12} sm={12} xs={12} className='text-center'><h5 className='moduleDataHeadings'>Module Informations</h5></Col>

                <Col className='table-responsive m-2'>
                    {allInformations.length > 0 ?
                        <Table striped bordered hover>
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
                                <tbody key={i}><tr><td>{info.title}</td><td className='text-start'>{info.information}</td></tr></tbody>
                            ))}
                        </Table>
                        :
                        <h6 className='text-center'>No Informations, Check Back</h6>}
                </Col>
            </Col>

        </Row>
    </Container >)
}
export default ModuleDeets;