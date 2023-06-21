import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form';
import { faSchool } from '@fortawesome/free-solid-svg-icons'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Navbar } from 'react-bootstrap';

const SendUpdate = ({ addInfos, schPortal, deleteInfos, displayControl }) => {
    let [post, setPost] = useState('')
    let display = ''
    let counter = 1
    let { moduleId } = useParams();
    let [validate, setVal] = useState('')

    useEffect(() => {
        let a = schPortal.informationArray ? schPortal.informationArray.find(a => a.moduleId === moduleId && a.display === 'dInfo') : ''
        setVal(a)
    }, [schPortal.informationArray, []])

    const addBtn = () => {
        addInfos(post, moduleId, display)
        setPost('')
    }


    return (<Container fluid className='display pb-5'>
        <Navbar bg="black" className="justify-content-around">

            <div className='d-flex justify-content-center align-items-center logo my-1' ><FontAwesomeIcon icon={faSchool} size="2xl" /><span>MySch</span></div>
        </Navbar >
        <Container fluid>
            <Row className='bg-light mt-2'>
                <Col className='d-flex justify-content-start align-items-center my-1'>
                    <Link to={`/staff/${moduleId}`}><FontAwesomeIcon className='backIcon' icon={faArrowLeft} /></Link>
                </Col>

                <hr className='my-0'></hr>
                <Col className='d-flex  justify-content-center align-items-center'>
                    Announcements
                </Col>

                <Col lg={12} md={12} sm={12} >
                    <Form.Control
                        as="textarea"
                        placeholder="Send an Information here"
                        onInput={event => setPost(event.target.value)}
                        style={{ height: '5em' }}
                        value={post}
                        className='my-1'
                    />
                    <button className='btn my-1 py-0 border rounded' onClick={() => addBtn()}>Post</button> <br></br>

                    <Table striped bordered hover className='text-center'>
                        {schPortal.informationArray ?
                            <tbody>
                                {schPortal.informationArray.filter(a => a.moduleId === moduleId)
                                    .map((a, index) => (<tr key={index}>
                                        <td>{counter++}</td>
                                        <td>{a.post}</td>
                                        <td><button className='btn my-1 py-0 border rounded' onClick={() => deleteInfos(index, moduleId)}>Delete Announcement</button></td>
                                    </tr>))}
                            </tbody>
                            : ''}
                    </Table>
                    {!validate ?
                        <div className='my-2'><button className='btn my-1 py-0 border rounded' onClick={() => displayControl({ any: 'dInfo', moduleId })}>Send Announcement</button></div>
                        : <div className='my-2'><button className='btn my-1 py-0 border rounded' onClick={() => displayControl({ any: '!dInfo', moduleId })}>Delete Announcement</button></div>
                    }
                </Col>
            </Row>
        </Container>
    </Container >
    )
}
export default SendUpdate;