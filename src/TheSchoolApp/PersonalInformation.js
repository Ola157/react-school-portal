import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { faSchool } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Navbar } from 'react-bootstrap';
import { PiArrowFatLineLeft } from 'react-icons/pi';
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

    return (<Container fluid className='display pb-5'>
        <Navbar bg="black" className="justify-content-around">

            <div className='d-flex justify-content-center align-items-center logo my-1' ><FontAwesomeIcon icon={faSchool} size="2xl" /><span>MySch</span></div>
        </Navbar >

        <Row className='p-3 my-0'>
            <Col lg={2} md={2} sm={2} xs={2} className='px-0 pe-0'>
                <Link to={`/userhomepage/${typeId}`} className='bg-white d-flex justify-content-center align-items-center pe-0 px-0 mx-0 me-0 backLink' ><PiArrowFatLineLeft className='mx-1' style={{ fontSize: '1.3em' }} /> <span>HomePage</span></Link>
            </Col>
        </Row>

        <Row className='d-flex justify-content-center p-3'>

            <Col lg={5} md={6} sm={7} xs={8} className='d-flex justify-content-center align-items-center h3headings my-3'>
                <h3>Personal Information</h3>
            </Col>

            <Col lg={8} md={8} sm={8} xs={8} className='personalInfo m-3'>
                <Table striped bordered hover className='text-center my-2 table-responsive'>
                    <tbody>
                        {typeId === 'tutor' && <tr><td className='assesmentInput'>Module Name</td><td>{personalInformation.moduleName}</td></tr>}
                        {typeId === 'tutor' && <tr><td className='assesmentInput'>Module Code</td><td>{personalInformation.moduleCode}</td></tr>}
                        <tr><td className='assesmentInput'>Email</td><td>{!personalInformation.edit ? personalInformation.email : <input className='border rounded' type='text' onInput={(event) => setEmail(event.target.value)} />}</td></tr>
                        <tr><td className='assesmentInput'>First Name</td><td>{!personalInformation.edit ? personalInformation.firstName : <input className='border rounded' type='text' onInput={(event) => setFirstName(event.target.value)} />}</td></tr>
                        <tr><td className='assesmentInput'>Last Name</td><td>{!personalInformation.edit ? personalInformation.lastName : <input className='border rounded' type='text' onInput={(event) => setLastName(event.target.value)} />}</td></tr>
                        <tr><td className='assesmentInput'>Date Of Birth</td><td>{!personalInformation.edit ? personalInformation.dob : <input className='border rounded' type='date' onInput={(event) => setdob(event.target.value)} />}</td></tr>
                        <tr><td className='assesmentInput'>Home Address</td><td>{!personalInformation.edit ? personalInformation.homeAddress : <input className='border rounded' type='text' onInput={(event) => setHomeAddy(event.target.value)} />}</td></tr>
                        <tr><td className='assesmentInput'>Mobile Number</td><td>{!personalInformation.edit ? personalInformation.mobileNumber : <input className='border rounded' type='text' onInput={(event) => setMobNumber(event.target.value)} />}</td></tr>
                        <tr><td colSpan={2}>
                            <button className='amends m-1 my-1 mx-3 me-3' onClick={!personalInformation.edit ? () => handleChanges('edit', personalInformation._id) : () => handleChanges('done', personalInformation._id)}>{!personalInformation.edit ? 'Edit' : 'Save Changes'}</button>
                            {personalInformation.edit && <button className='amends m-1' onClick={() => handleChanges('cancel', personalInformation._id)}>Cancel Changes</button>}
                        </td></tr>
                    </tbody>
                </Table>
            </Col>

        </Row>
    </Container >)
}
export default PersonalInformation;