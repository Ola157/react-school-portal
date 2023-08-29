import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { faSchool } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Navbar } from 'react-bootstrap';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux';
import axios from 'axios';


const Test = ({ handleFetchAssesment, handlePushStdGrade }) => {
    const { questionId } = useParams();
    const myAssesment = useSelector(state => state.myAssessment)
    let [showAssess, handleShowAssessment] = useState(false)
    let [countDown, setCountDown] = useState('')
    let [studentGrade, setStdGrade] = useState('')
    let [chectStdAttempt, setAttempt] = useState('')

    useEffect(() => {
        if (true) {
            handleFetchAssesment(questionId)
        }
    }, [])

    useEffect(() => {
        handleCheck()
        const handlePageDisplay = () => {
            if (!countDown && myAssesment.length) {
                let interval = myAssesment.find(durate => durate.duration)
                interval = interval.duration
                setCountDown(interval)
            }
            let timeout;
            if (countDown >= 1 && showAssess) {
                timeout = setTimeout(() => { setCountDown((prev) => prev - 1) }, 1000)
            }
            if (countDown < 1 && showAssess) {
                handleSubmit()
                setCountDown(0)
                handleShowAssessment(false)
            }
            return () => { clearTimeout(timeout) }
        }
        handlePageDisplay()

    }, [countDown, showAssess, myAssesment])

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

    const handleAnswer = (moduleId, assessmentId, questionId, answer) => {
        setStdGrade([...studentGrade, { assessmentId, moduleId, questionId, answer }])
    }

    const handleSubmit = () => {
        let modId = studentGrade.find(mod => mod.moduleId)
        modId = modId.moduleId
        handlePushStdGrade(modId, studentGrade)
    }
    return (
        <Container fluid className='display pb-5'>
            <Navbar bg="black" className="justify-content-around">

                <div className='d-flex justify-content-center align-items-center logo my-1' ><FontAwesomeIcon icon={faSchool} size="2xl" /><span>MySch</span></div>
            </Navbar >

            <Row className='d-flex justify-content-center'>
                <Col lg={5} md={6} sm={7} xs={8} className='d-flex justify-content-center align-items-center h3headings my-3'>
                    <h3>My Assesment</h3>
                </Col>
                {chectStdAttempt === 'unattempted' &&
                    <Col lg={10} md={10} sm={10} xs={10} className='bg-light my-3 py-3'>

                        {myAssesment.map((question, index) =>
                            < Col key={index} className='text-center' style={{ textDecoration: 'underline' }}>
                                <div>Assesment Title: {question.testTitle} </div>
                                <div>Assesment Duration: {countDown} Secs </div>
                                {!showAssess && countDown != 0 && <div><button className='border-0 bg-transparent' onClick={() => handleShowAssessment(true)}>Click To Start</button></div>}
                            </Col>)}

                        {showAssess && countDown > 1 &&
                            myAssesment.map(assessment =>
                                assessment.allQuestions.map((quest, i) =>
                                    <Col key={i}>
                                        <label name={quest._id} htmlFor={quest._id}>Question {i + 1} {quest.question}</label>
                                        <div><input onClick={() => handleAnswer(assessment.moduleId, assessment._id, quest._id, 'A')} type='radio' className='m-1' name={quest._id} id={quest._id} /><span className='m-1'>{quest.optionA}</span></div>
                                        <div><input onClick={() => handleAnswer(assessment.moduleId, assessment._id, quest._id, 'B')} type='radio' className='m-1' name={quest._id} id={quest._id} /><span className='m-1'>{quest.optionB}</span></div>
                                        <div><input onClick={() => handleAnswer(assessment.moduleId, assessment._id, quest._id, 'C')} type='radio' className='m-1' name={quest._id} id={quest._id} /><span className='m-1'>{quest.optionC}</span></div>
                                        <div><input onClick={() => handleAnswer(assessment.moduleId, assessment._id, quest._id, 'D')} type='radio' className='m-1' name={quest._id} id={quest._id} /><span className='m-1'>{quest.optionD}</span></div>
                                    </Col>
                                ))}
                        {showAssess && countDown > 1 && <button className='py-0 my-2 submitButton' onClick={() => handleSubmit()}>Submit</button>}
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