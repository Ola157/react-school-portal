import React, { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { faSchool } from '@fortawesome/free-solid-svg-icons'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Navbar } from 'react-bootstrap';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'


const ModuleQuestions = ({ schPortal, editQuestion, delQuestion, addEdited, displayControl, handleTime }) => {
    const { moduleId } = useParams();
    let counter = 1
    let [question, setQuestion] = useState('')
    let [optionA, setOptionA] = useState('')
    let [optionB, setOptionB] = useState('')
    let [optionC, setOptionC] = useState('')
    let [optionD, setOptionD] = useState('')
    let [answer, setAnswer] = useState('')
    let [time, setTime] = useState('')
    let [validate, setVal] = useState('')

    useEffect(() => {
        let a = schPortal.questionArray ? schPortal.questionArray.find(a => a.moduleId === moduleId && a.display === 'dQuestion') : ''
        setVal(a)
    }, [schPortal.questionArray, []])

    const addBtn = (any, index) => {
        if (any === 'add' && question !== '' && optionA !== '' && optionB !== '' && optionC !== '' && optionD !== '' && answer !== '') {
            addEdited(index, moduleId, question, optionA, optionB, optionC, optionD, answer)
        }

        switch (true) {
            case any === 'send':
                handleTime(moduleId, time)
                displayControl({ any: 'dQuestion', moduleId });
                break;
            case any === 'del':
                displayControl({ any: '!dQuestion', moduleId });
                break;
        }
    }

    console.log(schPortal)
    return (<Container fluid className='display pb-5'>
        <Navbar bg="black" className="justify-content-around">

            <div className='d-flex justify-content-center align-items-center logo my-1' ><FontAwesomeIcon icon={faSchool} size="2xl" /><span>MySch</span></div>
        </Navbar >
        <Container fluid>
            <Row className='bg-light mt-1' >
                <Col className='d-flex justify-content-start align-items-center my-1'>
                    <Link to={`/questions/${moduleId}`}><FontAwesomeIcon className='backIcon' icon={faArrowLeft} /></Link>
                </Col>

                <hr className='my-0'></hr>
                <Col className='d-flex  justify-content-center align-items-center'>
                    Module Questions
                </Col>


                < Table striped bordered hover className='table-responsive my-1'>
                    <thead>
                        <tr>
                            <th>S/N</th>
                            <th>QUESTION</th>
                            <th>OPTION A</th>
                            <th>OPTION B</th>
                            <th>OPTION C</th>
                            <th>OPTION D</th>
                            <th>ANSWER</th>
                        </tr>
                    </thead>
                    <tbody>
                        {schPortal.questionArray ?
                            schPortal.questionArray.filter(a => a.moduleId === moduleId).map((b, index) => (
                                < tr key={index} >
                                    <td>{counter++}</td>
                                    <td>{b.question}</td>
                                    <td>{b.optionA}</td>
                                    <td>{b.optionB}</td>
                                    <td>{b.optionC}</td>
                                    <td>{b.optionD}</td>
                                    <td>{b.answer}</td>
                                    <td><button className='btn border rounded py-0' onClick={() => editQuestion({ any: 'edit', index, moduleId })}>edit</button></td>
                                    <td><button className='btn border rounded py-0' onClick={() => delQuestion(index, moduleId)}>Delete</button></td>
                                    {
                                        b.edit === 'edit' ?
                                            <>
                                                <tr className='d-flex justify-content-center'>
                                                    <td>
                                                        <input className='border rounded my-1' placeholder='Question' onInput={(event) => setQuestion(event.target.value)} />
                                                        <input className='border rounded my-1' placeholder='Option A' onInput={(event) => setOptionA(event.target.value)} />
                                                        <input className='border rounded my-1' placeholder='Option B' onInput={(event) => setOptionB(event.target.value)} />
                                                        <input className='border rounded my-1' placeholder='Option C' onInput={(event) => setOptionC(event.target.value)} />
                                                        <input className='border rounded my-1' placeholder='Option D' onInput={(event) => setOptionD(event.target.value)} />
                                                        <input className='border rounded my-1' placeholder='Answer' onInput={(event) => setAnswer(event.target.value)} />
                                                        <button className='btn border rounded py-0 d-block my-1' onClick={() => addBtn('add', index)}>Done</button>
                                                        <button className='btn border rounded py-0 d-block my-1' onClick={() => editQuestion({ any: '!edit', index, moduleId })}>Cancel</button>
                                                    </td>
                                                </tr>
                                            </>
                                            : ''
                                    }
                                </tr>
                            ))
                            : ''}

                    </tbody>
                </Table>
                {!validate ?
                    <>
                        <div className='my-2'><input className='text-center rounded border' placeholder='Set Test Duration' onInput={event => setTime(event.target.value)} /></div>

                        <button className='btn border rounded py-0 d-block my-1' onClick={() => addBtn('send')}>Send Questions</button>
                    </>
                    : <button className='btn border rounded py-0 d-block my-1' onClick={() => addBtn('del')}>Delete Test Questions</button>
                }
            </Row>
        </Container>


    </Container >)
}
export default ModuleQuestions;