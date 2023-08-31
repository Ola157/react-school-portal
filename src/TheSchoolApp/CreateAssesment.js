import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { faSchool } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Navbar } from 'react-bootstrap';
import { PiArrowFatLineLeft } from 'react-icons/pi';

const AllQuestions = ({ handleAddAllQuestion }) => {
    const navigate = useNavigate();
    const { type } = useParams()
    let [question, setQuestion] = useState('')
    let [optionA, setOptionA] = useState('')
    let [optionB, setOptionB] = useState('')
    let [optionC, setOptionC] = useState('')
    let [optionD, setOptionD] = useState('')
    let [answer, setAnswer] = useState('')
    let [testTitle, setTestTitle] = useState('')
    let [duration, setDuration] = useState('')
    let edit = false
    let showQuestion = false
    let displayForStudents = false
    let [allQuestions, setAllQuestion] = useState('')
    let [questionNew, setQuestionNew] = useState('')
    let [optionANew, setOptionANew] = useState('')
    let [optionBNew, setOptionBNew] = useState('')
    let [optionCNew, setOptionCNew] = useState('')
    let [optionDNew, setOptionDNew] = useState('')
    let [answerNew, setAnswerNew] = useState('')

    const handleAddQuestion = (type) => {
        switch (type) {
            case 'add':
                if (question && optionA && optionB && optionC && optionD && answer) {
                    setAllQuestion([...allQuestions, { question, optionA, optionB, optionC, optionD, answer, edit }])
                    setQuestion('')
                    setOptionA('')
                    setOptionB('')
                    setOptionC('')
                    setOptionD('')
                    setAnswer('')
                }
                break;
            case 'pushAllQuestion':
                handleAddAllQuestion({ testTitle, showQuestion, duration, allQuestions, displayForStudents });
                setTestTitle('')
                setAllQuestion('')
                setDuration('')
                break;
        }
    }
    const handleEditDelete = (type, i) => {
        let amendQuestions = [...allQuestions]
        switch (type) {
            case 'edit':
                amendQuestions[i].edit = true
                break;
            case 'done':
                amendQuestions[i].question = questionNew
                amendQuestions[i].optionA = optionANew
                amendQuestions[i].optionB = optionBNew
                amendQuestions[i].optionC = optionCNew
                amendQuestions[i].optionD = optionDNew
                amendQuestions[i].answer = answerNew
                amendQuestions[i].edit = false
            case 'delete':
                amendQuestions = amendQuestions.filter((_, index) => index != i)
                break;
        }
        setAllQuestion(amendQuestions)
    }

    return (
        <Container fluid className='display pb-5'>
            <Navbar bg="black" className="justify-content-around">

                <div className='d-flex justify-content-center align-items-center logo my-1' ><FontAwesomeIcon icon={faSchool} size="2xl" /><span>MySch</span></div>

            </Navbar >

            <Row className='p-3 my-0'>
                <Col lg={2} md={2} sm={2} xs={2} className='px-0 pe-0'>
                    <Link to={`/userhomepage/${type}`} className='bg-white d-flex justify-content-center align-items-center pe-0 px-0 mx-0 me-0 backLink' ><PiArrowFatLineLeft className='mx-1' style={{ fontSize: '1.3em' }} /> <span>HomePage</span></Link>
                </Col>
            </Row>

            <Row className='mt-2 py-3 d-flex justify-content-center'>

                <Col lg={5} md={6} sm={7} xs={8} className='d-flex justify-content-center align-items-center h3headings my-3'>
                    <h3>Create Assessment Questions</h3>
                </Col>

                <Col lg={10} md={10} sm={10} xs={10} className='my-2 py-1 bg-white'>
                    <div className='m-1'><span className='me-5' style={{ fontSize: '1.2em', fontWeight: 'bold' }}>Assessment Title</span> <input className='questInp w-50 mx-5' value={testTitle} onInput={(event) => setTestTitle(event.target.value)} /></div>
                    <div className='m-1'><span className='assesmentInput'>Question</span> <input className='questInp' value={question} onInput={(event) => setQuestion(event.target.value)} /></div>
                    <div className='m-1'> <span className='assesmentInput'>Option A</span> <input className='questInp' value={optionA} onInput={(event) => setOptionA(event.target.value)} /></div>
                    <div className='m-1'> <span className='assesmentInput'>Option B</span> <input className='questInp' value={optionB} onInput={(event) => setOptionB(event.target.value)} /></div>
                    <div className='m-1'> <span className='assesmentInput'>Option C</span> <input className='questInp' value={optionC} onInput={(event) => setOptionC(event.target.value)} /></div>
                    <div className='m-1'> <span className='assesmentInput'>Option D</span> < input className='questInp' value={optionD} onInput={(event) => setOptionD(event.target.value)} /></div>
                    <div className='m-1'> <span className='assesmentInput'>Solution</span> < input className='questInp' style={{ width: '20%' }} value={answer} onInput={(event) => setAnswer(event.target.value)} /></div>
                    <div className='m-1 text-center'><button className='py-0 addQuestion' onClick={() => handleAddQuestion('add')}>Add Question</button> <button className='addQuestion' onClick={() => navigate(`/allAssesment/${type}`)}>View All Questions</button>
                    </div>
                </Col >

                {allQuestions &&
                    allQuestions.map((question, i) =>
                    (<Col lg={10} md={10} sm={10} xs={10} className='bg-white py-2' key={i}>
                        <div className='m-1'><span className='assesmentInput'>Question{i + 1}.</span> {!question.edit ? question.question : <input className='questInp' value={question.questionNew} onInput={(event) => setQuestionNew(event.target.value)} />}</div>
                        <div className='m-1'><span className='assesmentInput'>A.</span> {!question.edit ? question.optionA : <input className='questInp' value={question.optionANew} onInput={(event) => setOptionANew(event.target.value)} />}</div>
                        <div className='m-1'><span className='assesmentInput'>B.</span> {!question.edit ? question.optionB : <input className='questInp' value={question.optionBNew} onInput={(event) => setOptionBNew(event.target.value)} />}</div>
                        <div className='m-1'><span className='assesmentInput'>C.</span> {!question.edit ? question.optionC : <input className='questInp' value={question.optionCNew} onInput={(event) => setOptionCNew(event.target.value)} />}</div>
                        <div className='m-1'><span className='assesmentInput'>D.</span>{!question.edit ? question.optionD : <input className='questInp' value={question.optionDNew} onInput={(event) => setOptionDNew(event.target.value)} />}</div>
                        <div className='m-1'><span className='assesmentInput'>Solution.</span> {!question.edit ? question.answer : <input className='questInp' style={{ width: '20%' }} value={question.answerNew} onInput={(event) => setAnswerNew(event.target.value)} />}</div>
                        <div className='d-flex justify-content-evenly align-items-center my-1'><button className='editDelete' onClick={!question.edit ? () => handleEditDelete('edit', i) : () => handleEditDelete('done', i)}>{!question.edit ? 'edit' : 'done'}</button><button className='editDelete' onClick={() => handleEditDelete('delete', i)}>delete</button></div>
                    </Col>))}

                {allQuestions.length && <Col lg={10} md={10} sm={10} xs={10} className='bg-white py-2 d-flex justify-content-evenly'>
                    <span>
                        <span className='assesmentInput'>Duration</span>
                        <input className='questInp text-center mx-3' value={duration} style={{ width: '22%' }} placeholder='duration' onInput={(event) => setDuration(event.target.value)} />
                    </span>
                    <button className='editDelete py-0' onClick={() => handleAddQuestion('pushAllQuestion')}>Push All Questions</button></Col>}

            </Row>

        </Container >
    )
}
export default AllQuestions;
