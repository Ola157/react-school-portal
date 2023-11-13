import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { HiBackspace } from 'react-icons/hi';
import { MdSchool } from 'react-icons/md';
import { Navbar } from 'react-bootstrap';
import { useSelector } from 'react-redux';


const StdBioDataPage = ({
    handleBioData,
    handleBiodataChanges,
    handleNavigation
}) => {

    let [firstName, setFirstName] = useState('')
    let [lastName, setLastName] = useState('')
    let [dob, setdob] = useState('')
    let [homeAddy, setHomeAddy] = useState('')
    let [mobileNumber, setMobNumber] = useState('')
    let [email, setEmail] = useState('')
    const bioData = useSelector(state => state.bioData)


    useEffect(() => {
        handleBioData('student')
    }, [])


    const handleChanges = (type) => {
        const data = { firstName, lastName, dob, homeAddy, mobileNumber, email }
        handleBiodataChanges({ type, data, page: 'student' })
    }

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
                <h3 className='text-center'>Bio Data</h3>
            </Col>
        </Row>

        <Row className='justify-content-center my-5 mx-0 me-0'>
            <Col lg={8} md={8} sm={10} xs={12} className='table-col table-responsive'>
                <Table bordered className='text-center'>
                    <tbody>
                        <tr>
                            <td>Email</td>
                            <td>{bioData && !bioData.edit ? bioData.email
                                : <input className='syn-input w-70' type='text'
                                    onInput={(event) => setEmail(event.target.value)} />}</td>
                        </tr>
                        <tr>
                            <td>Firstname</td>
                            <td>{bioData && !bioData.edit ? bioData.firstName
                                : <input className='syn-input' type='text'
                                    onInput={(event) => setFirstName(event.target.value)} />}</td>
                        </tr>
                        <tr>
                            <td>Lastname</td>
                            <td>{bioData && !bioData.edit ? bioData.lastName
                                : <input className='syn-input' type='text'
                                    onInput={(event) => setLastName(event.target.value)} />}</td>
                        </tr>
                        <tr>
                            <td>Dob</td><td>{bioData && !bioData.edit ? bioData.dob
                                : <input className='syn-input' type='date'
                                    onInput={(event) => setdob(event.target.value)} />}</td>
                        </tr>
                        <tr>
                            <td>Address</td>
                            <td>{bioData && !bioData.edit ? bioData.homeAddress
                                : <input className='syn-input' type='text'
                                    onInput={(event) => setHomeAddy(event.target.value)} />}</td>
                        </tr>
                        <tr>
                            <td>Cell Number</td>
                            <td>{bioData && !bioData.edit ? bioData.mobileNumber
                                : <input className='syn-input' type='text'
                                    onInput={(event) => setMobNumber(event.target.value)} />}</td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                {bioData && !bioData.edit &&
                                    <button className='syn-button'
                                        onClick={() => handleChanges('edit')}>
                                        Edit
                                    </button>}
                                {bioData && bioData.edit && <>
                                    <button className='save-button'
                                        onClick={() => handleChanges('save')}>Save</button>
                                    <button className='cancel-button'
                                        onClick={() => handleChanges('cancel')}>Cancel</button>
                                </>}
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </Col>
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
    </Container >)
}
export default StdBioDataPage;