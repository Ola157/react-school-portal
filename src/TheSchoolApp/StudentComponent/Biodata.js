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
    handleNavigation,
    handleOpacity
}) => {

    let [firstName, setFirstName] = useState('')
    let [lastName, setLastName] = useState('')
    let [dob, setdob] = useState('')
    let [homeAddy, setHomeAddy] = useState('')
    let [mobileNumber, setMobNumber] = useState('')
    let [email, setEmail] = useState('')
    const bioData = useSelector(state => state.bioData)
    const opaCity = useSelector(state => state.opacity)


    useEffect(() => {
        handleBioData('student')
        handleOpacity()

    }, [])


    const handleChanges = (type) => {
        const data = { firstName, lastName, dob, homeAddy, mobileNumber, email }
        handleBiodataChanges({ type, data, page: 'student' })
    }

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
                <h3 className='text-center'>Personal Information</h3>
            </Col>
        </Row>

        <Row className='justify-content-center my-5'>
            <Col lg={8} md={8} sm={10} xs={10} className='table-col table-responsive'>
                <Table bordered className='text-center'>
                    <tbody>
                        <tr>
                            <td>Email</td>
                            <td>{bioData && !bioData.edit ? bioData.email
                                : <input className='syn-input' type='text'
                                    onInput={(event) => setEmail(event.target.value)} />}</td>
                        </tr>
                        <tr>
                            <td>First Name</td>
                            <td>{bioData && !bioData.edit ? bioData.firstName
                                : <input className='syn-input' type='text'
                                    onInput={(event) => setFirstName(event.target.value)} />}</td>
                        </tr>
                        <tr>
                            <td>Last Name</td>
                            <td>{bioData && !bioData.edit ? bioData.lastName
                                : <input className='syn-input' type='text'
                                    onInput={(event) => setLastName(event.target.value)} />}</td>
                        </tr>
                        <tr>
                            <td>Date Of Birth</td><td>{bioData && !bioData.edit ? bioData.dob
                                : <input className='syn-input' type='date'
                                    onInput={(event) => setdob(event.target.value)} />}</td>
                        </tr>
                        <tr>
                            <td>Home Address</td>
                            <td>{bioData && !bioData.edit ? bioData.homeAddress
                                : <input className='syn-input' type='text'
                                    onInput={(event) => setHomeAddy(event.target.value)} />}</td>
                        </tr>
                        <tr>
                            <td>Mobile Number</td>
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
                                        onClick={() => handleChanges('save')}>Save Changes</button>
                                    <button className='cancel-button'
                                        onClick={() => handleChanges('cancel')}>Cancel</button>
                                </>}
                            </td>
                        </tr>
                    </tbody>
                </Table>
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
export default StdBioDataPage;