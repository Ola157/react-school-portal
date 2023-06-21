import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container, Col, Table, Button, Navbar, Row } from 'react-bootstrap';
import { faSchool } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const BookOpenday = () => {
    let [boo, setBoo] = useState(true)
    const [showContainer, setShowContainer] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setShowContainer(true);
        }, 500);

        return () => clearTimeout(timeout);
    }, []);

    const booBtn = (a) => {
        switch (true) {
            case a === 'first':
                setBoo(false);
                break;
            case a === 'sec':
                setBoo(true);
                break;
        }
    }
    return (<Container fluid style={{ opacity: showContainer ? 1 : 0, transition: 'opacity 1s', fontSize: '17px' }}>
        <Navbar className="nav justify-content-around mb-1">

            <div className='d-flex p-2 justify-content-center align-items-center'> <FontAwesomeIcon className='navAwe' icon={faSchool} size="2xl" /><span className='mySch' >MySch</span></div>

        </Navbar >

        <Container >
            <Row >

                <Col className='table-responsive' lg={4} md={12} sm={12}>
                    <Table striped bordered hover style={{ height: '20em' }}>
                        <thead>
                            <tr>
                                <th style={{ height: '64.13px' }}><Button className='border-0' style={{ backgroundColor: 'transparent' }} variant='light'><Link to='/study' style={{ textDecoration: 'none', color: 'black' }}>STUDY</Link></Button></th>
                            </tr>
                        </thead>
                        <tbody >
                            <tr><td><Button className='border-0' style={{ backgroundColor: 'transparent' }} variant='light'><Link to='/myschpage' style={{ textDecoration: 'none', color: 'black' }}>Home</Link></Button></td></tr>
                            <tr><td><Button className='border-0' style={{ backgroundColor: 'transparent' }} variant='light'><Link to='/study' style={{ textDecoration: 'none', color: 'black' }}>Study</Link></Button></td></tr>
                            <tr><td><Button className='border-0' style={{ backgroundColor: 'transparent' }} variant='light'><Link to='/openday' style={{ textDecoration: 'none', color: 'black' }}>Open Days</Link></Button></td></tr>
                            <tr><td><Button className='border-0' style={{ backgroundColor: 'transparent' }} variant='light'><Link to='/myschpage' style={{ textDecoration: 'none', color: 'black' }}>Prepating to attend MYSCH Open day</Link></Button></td></tr>
                            <tr><td><Button className='border-0' style={{ backgroundColor: 'transparent' }} variant='light'>How to find us</Button></td></tr>
                        </tbody>
                    </Table>
                </Col>

                <Col lg={8} md={12} sm={12}>
                    <Col className='my-3' lg={8} md={6} sm={6}>
                        <h4 >Undergraduate Open Day Booking Form</h4>
                        <p><span style={{ fontWeight: 'bold' }}>Please note:</span> If you would like to book a large group, or have a disability such as a visual impairment, you may find it easier to book by calling us on 0116 2 50 60 70.</p>
                        <p style={{ fontWeight: 'bold' }}>When would you like to attend?</p>
                    </Col>
                    <Col className='my-3' lg={8} md={6} sm={6}>
                        <label className='d-block mb-1'>Level Of Study</label>
                        <select className='mb-3 border rounded' style={{ width: '100%', height: '2em' }}>
                            <option> Please Select</option>
                            <option> Further Education</option>
                            <option> Undergraduate</option>
                            <option> Postgraduate Taught </option>
                            <option> Postgraduate Research</option>
                        </select>

                        <label className='d-block mb-1'>Subject area most interested in studying</label>
                        <select className='border rounded' style={{ width: '100%', height: '2em' }}>
                            <option> Please Select</option>
                            <option> Accounting and Finance</option>
                            <option> Animation / Game Art</option>
                            <option> Architecture </option>
                            <option> Art and Design Function / Fine Art</option>
                            <option> Art and Festivals / Cultural Events Management</option>
                        </select>

                        <form className='my-2'>
                            <p className='mb-0' style={{ fontWeight: 'bold' }}>Intended year of entry</p>
                            <div className='d-flex align-items-center my-3'>
                                <input style={{ width: '1em', height: '1em' }} type="radio" name="term" value="male" id='fterm' />
                                <label className='mx-2' for="fterm" >2023/2024</label>
                                <input style={{ width: '1em', height: '1em' }} type="radio" name="term" value="female" id='sterm' />
                                <label className='mx-2' for="sterm">2024/2025</label>
                            </div>
                        </form>

                        <form className='my-2'>
                            <p className='mb-0' style={{ fontWeight: 'bold' }}>Number of guests attending (in addition to yourself)</p>
                            <div className='d-flex align-items-center my-3'>
                                <input style={{ width: '1em', height: '1em' }} className='me-1' type="radio" name="term" value="male" id='one' />
                                <label className='mx-2' for="one" >1</label>
                                <input style={{ width: '1em', height: '1em' }} className='me-1' type="radio" name="term" value="female" id='two' />
                                <label className='mx-2' for="two">2</label>
                                <input style={{ width: '1em', height: '1em' }} className='me-1' type="radio" name="term" value="female" id='unsure' />
                                <label className='mx-2' for="unsure">Not Sure</label>
                            </div>
                        </form>
                    </Col>

                    <Row className='d-flex justify-content-between'>
                        <Col lg={6} md={12} sm={12}>
                            <label className='d-block'>First Name</label>
                            <input className='border rounded' placeholder='Enter First Name' type='text' style={{ width: '100%', height: '1.5em' }} />
                        </Col>

                        <Col lg={6} md={12} sm={12}>
                            <label className='d-block'>Last Name</label>
                            <input className='border rounded' placeholder='Enter Last Name' type='text' style={{ width: '100%', height: '1.5em' }} />
                        </Col>
                    </Row>

                    <Row className='d-flex justify-content-between'>
                        <Col lg={6} md={12} sm={12}>
                            <label for='email' className='d-block' >Email Address</label>
                            <input className='border rounded' id='email' placeholder='enter email address' type='text' style={{ width: '100%', height: '1.5em' }} />
                        </Col>

                        <Col lg={6} md={12} sm={12}>
                            <label for='remail' className='d-block'>Confirm Email Address</label>
                            <input className='border rounded' id='remail' placeholder='re-enter email address' type='text' style={{ width: '100%', height: '1.5em' }} />
                        </Col>
                    </Row>

                    <Col className='my-3' lg={5} md={6} sm={12}>
                        <label className='d-block'>Mobile Number (UK Only)</label>
                        <div><input className='border rounded' placeholder='Please enter your mobile number' type='text' style={{ width: '100%', height: '1.5em' }} /></div>
                    </Col>
                    <Col className='my-3' lg={3} md={6} sm={3} xs={6}>
                        <label for='dob' className='d-block'>Date Of Birth</label>
                        <input className='border rounded text-center' id='dob' placeholder='DD' type='date' style={{ width: '100%', height: '1.5em' }} />
                    </Col>

                    <Col className='my-3' lg={6} md={12} sm={12}>
                        <label for='nationality' className='d-block'>Nationality</label>
                        <select className='border rounded' id='nationality' style={{ width: '100%', height: '1.5em' }}>
                            <option> Please Select</option>
                            <option> Further Education</option>
                            <option> Undergraduate</option>
                            <option> Postgraduate Taught </option>
                            <option> Postgraduate Research</option>
                        </select>
                    </Col>
                    <Col className='my-3' lg={6} md={12} sm={12}>
                        <label for='residence' className='d-block'>Country Of Residence</label>
                        <select className='border rounded' id='residence' style={{ width: '100%', height: '1.5em' }}>
                            <option> Please Select</option>
                            <option> Further Education</option>
                            <option> Undergraduate</option>
                            <option> Postgraduate Taught </option>
                            <option> Postgraduate Research</option>
                        </select>
                    </Col>
                    <Col className='my-1' lg={6} md={6} sm={12} >
                        {boo ?
                            <div className='my-1'>
                                <label className='d-block' for='postcode'>PostCode Lookup</label>
                                <input className='border rounded' id='postcode' style={{ width: '100%', height: '1.5em' }} />
                                <Button onClick={() => booBtn('first')} className='bg-white border-0' style={{ textDecoration: 'underline', color: 'black', height: '2.5em' }}>Not Living In The Uk?</Button>
                            </div> :
                            <div className='p-1' style={{ backgroundColor: 'yellow', color: 'black' }}>
                                <p className='p-0'> Please note: We do not post information outside of the UK, but we will email you relevant information regarding your open day booking.<Button onClick={() => booBtn('sec')} className='d-inline border-0 bg-transparent' style={{ color: 'red' }}>I am a UK resident</Button></p>
                            </div>}
                    </Col>
                    <Col lg={6} md={12} sm={12} className='my-1'>
                        <form >
                            <p className='mb-0' style={{ fontWeight: 'bold' }}>How Do You Plan To Get Here</p>
                            <div className='d-flex align-items-center my-3' style={{ width: '100%' }}>
                                <input style={{ width: '100%', height: '1em' }} type="radio" name="means" value="male" id='bicycle' />
                                <label className='mx-2' for="bicycle" >Bicycle</label>
                                <input style={{ width: '100%', height: '1em' }} type="radio" name="means" value="female" id='bus' />
                                <label className='mx-2' for="bus">Bus</label>
                                <input style={{ width: '100%', height: '1em' }} type="radio" name="means" value="female" id='car' />
                                <label className='mx-2' for="car">Car</label>
                                <input style={{ width: '100%', height: '1em' }} type="radio" name="means" value="female" id='train' />
                                <label className='mx-2' for="train">Train</label>
                                <input style={{ width: '100%', height: '1em' }} type="radio" name="means" value="female" id='nsure' />
                                <label className='mx-1' for="nsure">Not Sure</label>
                            </div>
                        </form>
                    </Col>

                    <Col lg={12} md={12} sm={12} className='my-1'>
                        <form >
                            <p className='mb-0' style={{ fontWeight: 'bold' }}>Would you like to receive support from our Disability Team?</p>
                            <div className='d-flex align-items-center my-3'>
                                <input style={{ width: '1em', height: '1em' }} type="radio" name="teamhelp" value="male" id='bicycle' />
                                <label className='mx-2'> No</label>
                                <input style={{ width: '1em', height: '1em' }} type="radio" name="teamhelp" value="male" id='bicycle' />
                                <label className='mx-2'> Yes</label>
                            </div>
                        </form>
                    </Col>
                    <Col className='my-1' lg={8} md={6} sm={12} >
                        <Button style={{ height: '2.5em' }} >Submit Details And Make Bookings</Button>
                    </Col>
                </Col>
            </Row>
        </Container >
        <Navbar variant="white" className="justify-content-around py-1 mb-1 border rounded" style={{ height: '3em', backgroundColor: 'black' }}>

            <div className='d-flex p-2 justify-content-center align-items-center'> <FontAwesomeIcon style={{ height: '1.0em', color: 'red' }} icon={faSchool} size="2xl" /><Link to='/*' style={{ textDecoration: 'none', color: 'black', alignSelf: 'center' }}><span className='mx-1 py-2' style={{ fontWeight: 'bold', color: 'gold' }}>MySch</span></Link></div>

        </Navbar >
    </Container >)
}
export default BookOpenday;