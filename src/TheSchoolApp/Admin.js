import React, { useState, useReducer } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import { Row } from 'react-bootstrap';
import Col from 'react-bootstrap/Col'
import useBoo from './custom hooks/useBoo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSchool } from '@fortawesome/free-solid-svg-icons'
import { Navbar } from 'react-bootstrap';


const Admin = ({ addStudent, schPortal, addStaff }) => {
    let [first, setFirstEntry] = useState('')
    let [sec, setSecEntry] = useState('')
    let firstName = ''
    let lastName = ''
    let dob = ''
    let homeAddress = ''
    const { id } = useParams()
    const [boo, handleboo] = useBoo(id)
    const navigate = useNavigate();

    const loginOsignup = (any) => {
        let validate = { ...schPortal }
        let studentval = validate.studentArray ? validate.studentArray.find(a => a.studentId === first && a.studentCode === sec) : ''
        let staffval = validate.staffArray ? validate.staffArray.find(a => a.moduleId === first && a.moduleCode === sec) : ''

        switch (true) {
            case any === 'login' && staffval && boo === 'staff':
                navigate(`/staff/${staffval.moduleId}`)
                break;
            case any === 'login' && studentval && boo === 'student':
                navigate(`/student/${studentval.studentId}`)
                break;
            case any === 'login' && !studentval:
                alert('incorrect Details')
                setFirstEntry('')
                setSecEntry('')
                break;
            case any === 'signup' && first !== '' && sec !== '' && !staffval && boo === 'staffsignup':
                addStaff(first, sec, firstName, lastName, dob, homeAddress);
                setFirstEntry('')
                setSecEntry('')
                handleboo('staff')
                break;
            case any === 'signup' && first !== '' && sec !== '' && !studentval && boo === 'studentsignup':
                addStudent(first, sec, firstName, lastName, dob, homeAddress);
                setFirstEntry('')
                setSecEntry('')
                handleboo('student')
                break;
            case any === 'login' && first == '' && sec == '' || any === 'signup' && first == '' && sec == '':
                alert('Inputs cant be blank');
                break;
        }
    }

    return (<Container fluid className='display'>
        <Navbar bg="black" className="justify-content-around">

            <div className='d-flex justify-content-center align-items-center logo my-1' ><FontAwesomeIcon icon={faSchool} size="2xl" /><span>MySch</span></div>

        </Navbar >
        <Container fluid className='py-3'>
            <Row className='d-flex justify-content-around align-items-center'>

                <Col className='adminCol border rounded m-1 p-0' lg={3} md={4} sm={12} style={{ backgroundImage: `url(${boo === 'student' ? require('./assets/schoolGoer.jpg') : require('./assets/staff1.jpg')})` }}>
                </Col>
                <Col className='adminCol border rounded m-1 py-1' lg={3} md={4} sm={12} style={{ backgroundImage: `url(${boo === 'student' ? require('./assets/passion.jpg') : require('./assets/staff2.jpg')})` }}>
                    <div className='w-100'>
                        <input className='d-block border rounded my-4 text-center w-100' style={{ height: '2.5em' }} value={first} onInput={(event) => setFirstEntry(event.target.value)} placeholder={boo === 'staff' || boo === 'staffsignup' ? 'module name' : 'student Code'} />
                        <input className='d-block border rounded my-4 text-center w-100' style={{ height: '2.5em' }} value={sec} onInput={(event) => setSecEntry(event.target.value)} placeholder={boo === 'staff' || boo === 'studentsignup' ? 'module code' : 'password'} />
                        <div className='text-center my-2 py-0'><button className='w-40 border rounded py-0 btn' onClick={boo === 'staffsignup' || boo === 'studentsignup' ? () => loginOsignup('signup') : () => loginOsignup('login')}>{boo === 'staff' || boo === "student" ? 'login' : 'signup'}</button></div>
                        {boo === 'staffsignup' || boo === 'studentsignup' ? '' : <div className='text-center mt-4'><button className='border rounded btn py-0' onClick={boo === 'student' ? () => handleboo('studentsignup') : () => handleboo('staffsignup')} style={{ textDecoration: 'underline' }}> signup </button></div>}
                    </div>
                </Col >
                <Col className='adminCol border rounded m-1 p-0' lg={3} md={4} sm={12} style={{ backgroundImage: `url(${boo === 'student' ? require('./assets/library.jpg') : require('./assets/staff3.jpg')})` }}>
                </Col>

                <Col className='adminCol border rounded m-1 p-0' lg={3} md={4} sm={12} style={{ backgroundImage: `url(${boo === 'student' ? require('./assets/reading.jpg') : require('./assets/staff4.jpg')})` }}>
                </Col>
                <Col className='adminCol border rounded bg-white m-1 py-2' lg={3} md={4} sm={12} style={{ backgroundImage: `url(${boo === 'student' ? require('./assets/nightstudy.jpg') : require('./assets/staff5.jpg')})` }}>
                </Col >
                <Col className='adminCol border rounded m-1 p-0' lg={3} md={4} sm={12} style={{ backgroundImage: `url(${boo === 'student' ? require('./assets/graduate.jpg') : require('./assets/staff6.jpg')})` }}>
                </Col>
            </Row >
        </Container>
    </Container >
    )
}
export default Admin;