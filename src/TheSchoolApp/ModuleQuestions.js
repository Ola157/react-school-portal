import React, { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { faSchool } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Navbar } from 'react-bootstrap';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { useSelector } from 'react-redux';
import { PiArrowFatLineLeft } from 'react-icons/pi';


const ModuleQuestions = ({ handleFetchQuestions, handleShowQuestion, handleAllChanges, handleDisplay }) => {
    let [question, setQuestion] = useState('')
    let [optionA, setOptionA] = useState('')
    let [optionB, setOptionB] = useState('')
    let [optionC, setOptionC] = useState('')
    let [optionD, setOptionD] = useState('')
    let [answer, setAnswer] = useState('')
    let allQuestions = useSelector(state => state.allQuestions)
    const navigate = useNavigate()
    const { type } = useParams()

    useEffect(() => {
        if (true) {
            handleFetchQuestions()
        }
    }, [allQuestions])

    const handleAmends = (type, id) => {
        let origin = 'moduleQuestions'
        switch (type) {
            case 'edit':
                handleAllChanges({ origin, type, id })
                break;
            case 'done':
                let data = { question, optionA, optionB, optionC, optionD, answer }
                if (data.question) return handleAllChanges({ origin, type, id, data })
                break;
            case 'delete':
                handleAllChanges({ origin, type, id })
                break;
            case 'cancel':
                handleAllChanges({ origin, type, id })
                break;
        }
    }

    return (<Container fluid className='display pb-5'>
        <Navbar bg="black" className="justify-content-around">

            <div className='d-flex justify-content-center align-items-center logo my-1' ><FontAwesomeIcon icon={faSchool} size="2xl" /><span>MySch</span></div>
        </Navbar >

        <Row className='p-3 my-0'>
            <Col lg={2} md={2} sm={2} xs={2} className='px-0 pe-0'>
                <Link to={`/questions/${type}`} className='bg-white d-flex justify-content-center align-items-center pe-0 px-0 mx-0 me-0 backLink' ><PiArrowFatLineLeft className='mx-1' style={{ fontSize: '1.3em' }} /> <span>Assessment</span></Link>
            </Col>
        </Row>

        <Row className='mt-1 d-flex justify-content-center align-items-center' >

            {allQuestions.length && <Col lg={5} md={6} sm={7} xs={8} className='d-flex justify-content-center align-items-center h3headings my-3'>
                <h3>All Assesment Questions</h3>
            </Col>}


            {allQuestions.length ?
                allQuestions.map((question, index) => (
                    <Col lg={10} md={10} sm={10} xs={10} className='bg-light py-2' key={index}>
                        <div className='m-1'><span className='assesmentInput'>{index + 1}. </span><button className='questionBtn m-1' onClick={() => handleShowQuestion(question._id)}><span className='assesmentInput'>{question.testTitle.toUpperCase()}</span></button><button className='amends' onClick={() => handleAmends('delete', question._id)}>Remove</button>
                            <button className='questionBtn m-1' onClick={!question.displayForStudents ? () => handleDisplay('displayAssessment', question._id) : () => handleDisplay('!displayAssessment', question._id)}>{!question.displayForStudents ? 'Send Assesment' : 'Unsend Assessment'}</button></div>

                        {question.showQuestion && <><div ><span className='assesmentInput'>Duration </span><span>{question.duration}</span></div>
                            {question.allQuestions ? question.allQuestions.map((quest, index) => (<div key={index}>
                                <div className='m-1'><span className='assesmentInput'>Question{index + 1}. </span><span>{!quest.edit ? quest.question : <input className='border rounded my-1' placeholder='Question' onInput={(event) => setQuestion(event.target.value)} />}</span></div >
                                <div className='m-1'><span className='assesmentInput'>A. </span><span>{!quest.edit ? quest.optionA : <input className='border rounded my-1' placeholder='Option A' onInput={(event) => setOptionA(event.target.value)} />}</span></div>
                                <div className='m-1'><span className='assesmentInput'>B. </span><span>{!quest.edit ? quest.optionB : <input className='border rounded my-1' placeholder='Option B' onInput={(event) => setOptionB(event.target.value)} />}</span></div>
                                <div className='m-1'><span className='assesmentInput'>C. </span><span>{!quest.edit ? quest.optionC : <input className='border rounded my-1' placeholder='Option C' onInput={(event) => setOptionC(event.target.value)} />}</span></div>
                                <div className='m-1'><span className='assesmentInput'>D. </span><span>{!quest.edit ? quest.optionD : <input className='border rounded my-1' placeholder='Option D' onInput={(event) => setOptionD(event.target.value)} />}</span></div>
                                <div className='m-1'><span className='assesmentInput'>Solution. </span><span>{!quest.edit ? quest.answer : <input className='border rounded my-1' placeholder='Answer' onInput={(event) => setAnswer(event.target.value)} />}</span></div>
                                <div>
                                    <button className='amends m-1' onClick={!quest.edit ? () => handleAmends('edit', quest._id) : () => handleAmends('done', quest._id)}>{!quest.edit ? 'Edit' : 'Save Changes'} </button>
                                    {quest.edit && <button className='amends m-1' onClick={() => handleAmends('cancel', quest._id)}>Cancel Changes</button>}
                                </div>
                            </div>)) : null}
                        </>}
                    </Col>))
                : <Col lg={10} md={10} sm={10} xs={10} className='text-center'><button onClick={() => navigate('/questions')} className='bg-light py-3 px-2 pe-2 my-5 assesmentInput border-0' style={{ fontSize: '1em' }}>No Questions Yet, Click To Add New Question</button> </Col>}
        </Row>
    </Container >)
}
export default ModuleQuestions;