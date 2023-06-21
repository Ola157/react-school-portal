import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { faSchool } from '@fortawesome/free-solid-svg-icons'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Navbar } from 'react-bootstrap';

const StudentPersonalInfo = ({ schPortal, addPersonalInfo }) => {
    const { studentId } = useParams();
    let [firstName, setFirstName] = useState('')
    let [lastName, setLastName] = useState('')
    let [dob, setdob] = useState('')
    let [homeAddy, setHomeAddy] = useState('')

    return (
        <Container fluid className='display pb-5'>
            <Navbar bg="black" className="justify-content-around">

                <div className='d-flex justify-content-center align-items-center logo my-1' ><FontAwesomeIcon icon={faSchool} size="2xl" /><span>MySch</span></div>
            </Navbar >
            <Container fluid>
                <Row className='bg-white mt-2'>
                    <Col className='d-flex justify-content-start align-items-center my-1'>
                        <Link to={`/student/${studentId}`}><FontAwesomeIcon className='backIcon' icon={faArrowLeft} /></Link>
                    </Col>

                    <hr className='my-0'></hr>
                    <Col className='d-flex  justify-content-center align-items-center'>
                        Personal Information
                    </Col>
                    {schPortal.studentArray ?
                        schPortal.studentArray.filter(a => a.studentId === studentId).map((a, i) => (
                            <Table striped bordered hover className='text-center my-2 table-responsive' key={i}>
                                <tbody>
                                    <tr></tr>
                                    <tr><td>Module Name</td><td>{a.studentId}</td></tr>
                                    <tr><td>Module Code</td><td>{a.studentCode}</td></tr>
                                    <tr><td>First Name</td><td>{a.firstName ? a.firstName : <input className='border rounded' type='text' onInput={(event) => setFirstName(event.target.value)} />}</td></tr>
                                    <tr><td>Last Name</td><td>{a.lastName ? a.lastName : <input className='border rounded' type='text' onInput={(event) => setLastName(event.target.value)} />}</td></tr>
                                    <tr><td>Date Of Birth</td><td>{a.dob ? a.dob : <input className='border rounded' type='date' onInput={(event) => setdob(event.target.value)} />}</td></tr>
                                    <tr><td>Home Address</td><td>{a.homeAddress ? a.homeAddress : <input className='border rounded' type='text' onInput={(event) => setHomeAddy(event.target.value)} />}</td></tr>
                                    <tr><td>{!a.firstName ? <button className='m-1 border rounded btn py-0' onClick={() => addPersonalInfo({ studentId, firstName, lastName, dob, homeAddy })}>Add</button> : ''}</td></tr>
                                </tbody>
                            </Table>
                        ))
                        : ''}
                </Row>
            </Container>
        </Container >)
}
export default StudentPersonalInfo;