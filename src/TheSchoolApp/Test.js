import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { faSchool } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Navbar } from 'react-bootstrap';
import { PiArrowFatLineLeft } from 'react-icons/pi';
import { useSelector } from 'react-redux';
import axios from 'axios';


const Test = ({ handleFetchAssesment, handlePushStdGrade, handleTimeDown }) => {
    const { questionId } = useParams();
    const myAssessment = useSelector(state => state.myAssessment)
    let [startTime, handleStartTime] = useState(false)
    let [countDown, setCountDown] = useState('')
    let [studentGrade, setStdGrade] = useState([])
    let [chectStdAttempt, setAttempt] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        handleFetchAssesment(questionId)
        handleCheck()
    }, [])

    useEffect(() => {
        handleCheck()
        if (myAssessment.duration && !countDown) {
            setCountDown(myAssessment.duration)
        }
        let timeOut
        if (countDown > 0 && startTime) {
            timeOut = setTimeout(() => {
                setCountDown(prev => prev - 1)
            }, 1000)
        }
        if (countDown < 1 && startTime) {
            handleCheck()
            handleStartTime(false)
            clearTimeout(timeOut)
            setCountDown(myAssessment.duration)
            handleSubmit()
        }

    }, [countDown, startTime, myAssessment])

    const handleCheck = async () => {
        let myJwt = localStorage.getItem('accessToken')
        try {
            let response = await axios.get(`http://localhost:9090/student/validateStudentAttempt/${questionId}`, {
                headers: {
                    'Authorization': `Bearer ${myJwt}`,
                }
            })
            setAttempt(response.data)

        }
        catch (err) { console.error(err) }
    }

    const handleAnswer = (assessmentId, questionId, answer) => {
        setStdGrade([...studentGrade, { assessmentId, questionId, answer }])
    }

    const handleAssesmentBegin = () => {
        handleTimeDown(myAssessment._id)
        handleStartTime(true)
    }

    const handleSubmit = () => {
        handleCheck()
        handleStartTime(false)
        if (!studentGrade.length && myAssessment.allQuestions) {
            for (const allq of myAssessment.allQuestions) {
                studentGrade.push({ assessmentId: myAssessment._id, questionId: 0, answer: 0 })
            }
            return handlePushStdGrade(studentGrade)
        }
        if (studentGrade.length) {
            return handlePushStdGrade(studentGrade)
        }
    }
    return (
        <Container fluid className='display pb-5'>
            <Navbar bg="black" className="justify-content-around">

                <div className='d-flex justify-content-center align-items-center logo my-1' ><FontAwesomeIcon icon={faSchool} size="2xl" /><span>MySch</span></div>
            </Navbar >

            <Row className='p-3 my-0'>
                <Col lg={2} md={2} sm={2} xs={2} className='px-0 pe-0'>
                    <button className='border-0 bg-white d-flex justify-content-center align-items-center pe-0 px-0 mx-0 me-0 backLink'
                        onClick={() => navigate(`/moduleDetails/${myAssessment.moduleId}`)} >
                        <PiArrowFatLineLeft className='mx-1' style={{ fontSize: '1.3em' }} />
                        <span>Module Data</span>
                    </button>
                </Col>
            </Row>

            <Row className='d-flex justify-content-center'>
                <Col lg={5} md={6} sm={7} xs={8} className='d-flex justify-content-center align-items-center h3headings my-3'>
                    <h3>My Assesment</h3>
                </Col>

                {chectStdAttempt === 'unattempted' &&
                    <Col lg={10} md={10} sm={10} xs={10} className='bg-light my-3 py-3'>

                        {!startTime && <div className='text-center'> <button className='border-0 bg-transparent' onClick={() => handleAssesmentBegin()}>Click To Start</button></div>}

                        <Col className='text-center' style={{ textDecoration: 'underline' }}>
                            <div>Assesment Title: {myAssessment.testTitle} </div>
                            <div>Assesment Duration: {countDown} Secs </div>
                        </Col>


                        {myAssessment.allQuestions && startTime &&
                            myAssessment.allQuestions.map((quest, i) =>
                                <Col key={i}>
                                    <label name={quest._id} htmlFor={quest._id}>Question {i + 1} {quest.question}</label>
                                    <div><input onClick={() => handleAnswer(myAssessment._id, quest._id, 'A')} type='radio' className='m-1' name={quest._id} id={quest._id} /><span className='m-1'>{quest.optionA}</span></div>
                                    <div><input onClick={() => handleAnswer(myAssessment._id, quest._id, 'B')} type='radio' className='m-1' name={quest._id} id={quest._id} /><span className='m-1'>{quest.optionB}</span></div>
                                    <div><input onClick={() => handleAnswer(myAssessment._id, quest._id, 'C')} type='radio' className='m-1' name={quest._id} id={quest._id} /><span className='m-1'>{quest.optionC}</span></div>
                                    <div><input onClick={() => handleAnswer(myAssessment._id, quest._id, 'D')} type='radio' className='m-1' name={quest._id} id={quest._id} /><span className='m-1'>{quest.optionD}</span></div>
                                </Col>
                            )}
                        {myAssessment.allQuestions && startTime && <button className='py-0 my-2 submitButton' onClick={() => handleSubmit()}>Submit</button>}
                    </Col>
                }

                {chectStdAttempt === 'attempted' &&
                    <Col lg={10} md={10} sm={10} xs={10} className='my-3 py-3 text-center moduleData'>
                        <h5>Assesment Attempted</h5>
                    </Col>}
            </Row >
        </Container >

    )
}
export default Test;