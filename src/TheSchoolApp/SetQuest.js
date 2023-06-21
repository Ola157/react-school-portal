import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { faSchool } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Navbar } from 'react-bootstrap';


const SetQuest = ({ schPortal, addQuestion }) => {
    const { moduleId } = useParams();
    const navigate = useNavigate();
    let [question, setQuestion] = useState('')
    let [optionA, setOptionA] = useState('')
    let [optionB, setOptionB] = useState('')
    let [optionC, setOptionC] = useState('')
    let [optionD, setOptionD] = useState('')
    let [answer, setAnswer] = useState('')
    let studentAnswer = ''
    let edit = ''
    let display = ''
    let [availQuest, setAvail] = useState('')

    useEffect(() => {
        let a = schPortal.questionArray ? schPortal.questionArray.find(a => a.moduleId === moduleId) : ''
        setAvail(a)
    }, [schPortal.questionArray, []])

    const addOview = any => {
        switch (true) {
            case any === 'add' && question !== '' && optionA !== '' && optionB !== '' && optionC !== '' && optionD !== '' && answer !== '':
                addQuestion(moduleId, question, optionA, optionB, optionC, optionD, answer, studentAnswer, display, edit);
                setQuestion('')
                setOptionA('')
                setOptionB('')
                setOptionC('')
                setOptionD('')
                setAnswer('')
                break;
            case any === 'view':
                navigate(`/modulequestions/${moduleId}`);
                break;
        }
    }

    return (
        <Container fluid className='display pb-5'>
            <Navbar bg="black" className="justify-content-around">

                <div className='d-flex justify-content-center align-items-center logo my-1' ><FontAwesomeIcon icon={faSchool} size="2xl" /><span>MySch</span></div>

            </Navbar >

            <Container fluid>
                <Row>
                    <Col lg={12} className='mt-1 mb-5 bg-light py-1'>
                        <div className='text-center'>Set Questions</div>
                        <hr className='my-0'></hr>
                        <div className='m-1'>Question <input className='questInp border rounded' value={question} onInput={(event) => setQuestion(event.target.value)} /></div>
                        <hr className='my-0'></hr>
                        <div className='m-1'> A <input className='questInp border rounded' value={optionA} onInput={(event) => setOptionA(event.target.value)} /></div>
                        <hr className='my-0'></hr>
                        <div className='m-1'> B <input className='questInp border rounded' value={optionB} onInput={(event) => setOptionB(event.target.value)} /></div>
                        <hr className='my-0'></hr>
                        <div className='m-1'> C <input className='questInp border rounded' value={optionC} onInput={(event) => setOptionC(event.target.value)} /></div>
                        <hr className='my-0'></hr>
                        <div className='m-1'> D < input className='questInp border rounded' value={optionD} onInput={(event) => setOptionD(event.target.value)} /></div>
                        <hr className='my-0'></hr>
                        <div className='m-1'> Answer < input className='border rounded w-90' value={answer} onInput={(event) => setAnswer(event.target.value)} /></div>
                        <div className='m-1'><button className='border rounded w-90 btn py-0' onClick={() => addOview('add')}>add</button></div>
                        {availQuest ? <button className='btn py-0 border rounded' onClick={() => addOview('view')}>view questions</button> : ''}
                    </Col >
                </Row >
            </Container >
        </Container >
    )
}
export default SetQuest;
