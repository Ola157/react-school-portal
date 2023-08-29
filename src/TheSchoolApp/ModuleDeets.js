import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { faSchool } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Navbar, Table } from 'react-bootstrap';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faCaretRight } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux';
import axios from 'axios';

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

        <Row className='d-flex justify-content-center'>
            {/* <Col lg={12} md={12} sm={12} className='d-flex justify-content-start align-items-center my-1'>
                    <Link to={`/modules/${studentId}`} ><FontAwesomeIcon className='backIcon' icon={faArrowLeft} /></Link>
                </Col> */}

            <Col lg={8} md={8} sm={8} className='d-flex  justify-content-center align-items-center h3headings my-2'>
                <h3 >Module Data</h3>
            </Col>
        </Row>

        <Row className='d-flex justify-content-evenly' >
            <Col className='m-1 moduleData py-2' lg={5} md={6} sm={12} xs={12}>
                <Col lg={12} md={12} sm={12} xs={12} className='text-center'><h5 className='moduleDataHeadings'>Module Assessments</h5></Col>

                <Col>
                    {allQuestions.length > 0 ?
                        <Table className='table-responsive' striped bordered hover>
                            <thead>
                                <tr>
                                    <th>
                                        Assesment Title
                                    </th>
                                </tr>
                            </thead>
                            {allQuestions.length > 0 && allQuestions.map((question) => (
                                <tbody key={question._id}>
                                    <tr>
                                        <td>{question.testTitle}</td>
                                        <td className='text-center'><Link className='modulelink' to={`/assesment/${question._id}`}>Click To Attempt</Link> </td>
                                    </tr>
                                </tbody>
                            ))}
                        </Table> :
                        <h6 className='text-center'>No Assessments, Check Back</h6>}
                </Col>
            </Col>

            <Col className='m-1 moduleData py-2' lg={5} md={6} sm={12} xs={12}>
                <Col lg={12} md={12} sm={12} xs={12} className='text-center'><h5 className='moduleDataHeadings'>Module Informations</h5></Col>

                <Col>
                    {allInformations.length > 0 ?
                        <Table className='table-responsive' striped bordered hover>
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