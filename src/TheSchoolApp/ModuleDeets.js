import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { faSchool } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Navbar } from 'react-bootstrap';
import useBoo from './custom hooks/useBoo';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faCaretRight } from '@fortawesome/free-solid-svg-icons'

const ModuleDeets = ({ schPortal }) => {
    const { moduleId, studentId } = useParams()
    let [avail, setAvail] = useState('')
    let [boo, handleBoo] = useBoo(false)

    useEffect(() => {
        let a = schPortal.questionArray ? schPortal.questionArray.find(a => a.moduleId === moduleId && a.display === 'dQuestion') : ''
        setAvail(a)
    }, [])

    return (<Container fluid className='display pb-5'>
        <Navbar bg="black" className="justify-content-around">

            <div className='d-flex justify-content-center align-items-center logo my-1' ><FontAwesomeIcon icon={faSchool} size="2xl" /><span>MySch</span></div>
        </Navbar >

        <Container fluid>
            <Row className='bg-light'>
                <Col lg={12} md={12} sm={12} className='d-flex justify-content-start align-items-center my-1'>
                    <Link to={`/modules/${studentId}`} ><FontAwesomeIcon className='backIcon' icon={faArrowLeft} /></Link>
                </Col>

                <hr className='my-0'></hr>
                <Col lg={12} md={12} sm={12} className='d-flex  justify-content-center align-items-center'>
                    Module Information
                </Col>
                <hr className='my-0'></hr>
                <Col className='d-flex justify-content-around'>
                    <Col className='m-1' lg={6} md={6} sm={12} xs={12}>
                        <Col className='text-center'>Module</Col>
                        <hr className='my-1' style={{ width: "100%" }}></hr>
                        <button onClick={boo === false ? () => handleBoo(true) : () => handleBoo(false)} className='border-0 bg-transparent'><FontAwesomeIcon className='mx-1' icon={faCaretRight} /> Test</button>
                        {avail && boo ?
                            <Link className='d-block' style={{ textDecoration: 'none', color: 'black' }} to={`/test/${moduleId}/${studentId}`}><FontAwesomeIcon className='mx-1' icon={faCaretRight} /> Test Available</Link> :
                            ''}
                    </Col>

                    <Col className='m-1' lg={6} md={6} sm={12} xs={12}>

                        <Col className='text-center'>Module News</Col>

                        <hr className='my-1' style={{ width: "100%" }}></hr>

                        {schPortal.informationArray ?

                            schPortal.informationArray.filter(a => a.moduleId === moduleId).map(a =>

                                <><FontAwesomeIcon className='mx-1' icon={faCaretRight} /> {a.post}</>
                            )
                            : ''}

                    </Col>
                </Col>
            </Row>
        </Container>
    </Container>)
}
export default ModuleDeets;