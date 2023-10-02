import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom'
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { HiBackspace } from 'react-icons/hi';
import { MdSchool } from 'react-icons/md';
import { Navbar } from 'react-bootstrap';
import { useSelector } from 'react-redux';


const PersonalInformation = ({ handlePersonalInformation, handleAllChanges }) => {
    let [firstName, setFirstName] = useState('')
    let [lastName, setLastName] = useState('')
    let [dob, setdob] = useState('')
    let [homeAddy, setHomeAddy] = useState('')
    let [mobileNumber, setMobNumber] = useState('')
    let [email, setEmail] = useState('')
    let personalInformation = useSelector(state => state.personalInformation)
    const { typeId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (personalInformation) return handlePersonalInformation(typeId)
    }, [personalInformation])

    const handleChanges = (type, id) => {
        let origin = 'personalInformation'
        switch (type) {
            case 'edit':
                handleAllChanges({ origin, type, id, typeId })
                break;
            case 'done':
                let data = { firstName, lastName, dob, homeAddy, mobileNumber, email }
                if (firstName && lastName) return handleAllChanges({ origin, type, id, data, typeId })
                setFirstName('')
                setLastName('')
                setdob('')
                setHomeAddy('')
                setMobNumber('')
                break;
            case 'cancel':
                handleAllChanges({ origin, type, id, typeId })
                setFirstName('')
                setLastName('')
                setdob('')
                setHomeAddy('')
                break;
        }
    }


    return (<Container className="school-homepage" fluid>
        <Navbar bg="dark" className='justify-content-between'>
            <MdSchool className='school-logo' />
        </Navbar>

        <Row className='p-3 my-0'>
            <Col lg={2} md={3} sm={4} xs={4} className='px-0 pe-0'>
                <Link to={`/userhomepage/${typeId}`} className='return-link' >
                    <HiBackspace /> <span>HomePage</span>
                </Link>
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
                        {typeId === 'tutor' && <tr><td  >Module Name</td><td>{personalInformation.moduleName}</td></tr>}
                        {typeId === 'tutor' && <tr><td  >Module Code</td><td>{personalInformation.moduleCode}</td></tr>}
                        <tr>
                            <td>Email</td>
                            <td>{!personalInformation.edit ? personalInformation.email
                                : <input className='syn-input' type='text'
                                    onInput={(event) => setEmail(event.target.value)} />}</td>
                        </tr>
                        <tr>
                            <td>First Name</td>
                            <td>{!personalInformation.edit ? personalInformation.firstName
                                : <input className='syn-input' type='text'
                                    onInput={(event) => setFirstName(event.target.value)} />}</td>
                        </tr>
                        <tr>
                            <td>Last Name</td>
                            <td>{!personalInformation.edit ? personalInformation.lastName
                                : <input className='syn-input' type='text'
                                    onInput={(event) => setLastName(event.target.value)} />}</td>
                        </tr>
                        <tr>
                            <td>Date Of Birth</td><td>{!personalInformation.edit ? personalInformation.dob
                                : <input className='syn-input' type='date'
                                    onInput={(event) => setdob(event.target.value)} />}</td>
                        </tr>
                        <tr>
                            <td>Home Address</td>
                            <td>{!personalInformation.edit ? personalInformation.homeAddress
                                : <input className='syn-input' type='text'
                                    onInput={(event) => setHomeAddy(event.target.value)} />}</td>
                        </tr>
                        <tr>
                            <td>Mobile Number</td>
                            <td>{!personalInformation.edit ? personalInformation.mobileNumber
                                : <input className='syn-input' type='text'
                                    onInput={(event) => setMobNumber(event.target.value)} />}</td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                {!personalInformation.edit &&
                                    <button className='syn-button'
                                        onClick={() => handleChanges('edit', personalInformation._id)}>
                                        Edit
                                    </button>}
                                {personalInformation.edit && <>
                                    <button className='save-button'
                                        onClick={() => handleChanges('done', personalInformation._id)}>Save Changes</button>
                                    <button className='cancel-button'
                                        onClick={() => handleChanges('cancel', personalInformation._id)}>Cancel</button>
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
export default PersonalInformation;