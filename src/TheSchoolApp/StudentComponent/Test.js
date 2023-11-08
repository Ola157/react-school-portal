import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { HiBackspace } from 'react-icons/hi';
import { MdSchool } from 'react-icons/md';
import { Navbar, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import axios from 'axios';


const Test = ({
    handleGetAssessment,
    handlePushGrade,
    handleNavigation,
    handleOpacity
}) => {

    const { assessmentId } = useParams();
    const test = useSelector(state => state.test)
    let [startTime, handleStartTime] = useState(false)
    let [countDown, setCountDown] = useState('')
    let [grade, setGrade] = useState('')
    const opaCity = useSelector(state => state.opacity)
    let [message, setMessage] = useState('')

    useEffect(() => {
        checkStudentAttempt()
    }, [])

    useEffect(() => {
        if (test) {
            setCountDown(test.duration)
        }
    }, [test])

    useEffect(() => {
        let timeOut

        if (countDown > 0 && startTime) {
            timeOut = setTimeout(() => {
                setCountDown(prev => prev - 1)
            }, 1000)
        }

        else if (countDown < 1 && startTime) {
            handleStartTime(false)
            clearTimeout(timeOut)
            setCountDown(test.duration)
            handleSubmit()
        }
    }, [countDown, startTime])


    const checkStudentAttempt = () => {
        const myJwt = localStorage.getItem('accessToken')
        axios.get(`https://react-school-back-end.vercel.app/student/assessmentAttempt/${assessmentId}`, {
            // axios.get(`http://localhost:9090/student/assessmentAttempt/${assessmentId}`, {
            headers: {
                'Authorization': `Bearer ${myJwt}`,
            }
        }).then((response) => {
            const { message } = response.data
            if (message == 'unattempted') {
                handleOpacity()
                return handleGetAssessment(assessmentId)
            }
            setMessage(message)
            handleOpacity()
        }).catch((err) => { console.error(err) })
    }

    const handleAnswer = (assessmentId, questionId, answer) => {
        setGrade([...grade, { assessmentId, questionId, answer }])
    }

    const handleSubmit = () => {
        if (!Array.isArray(grade)) {
            let grade = []
            const { allQuestions } = test
            for (let i = 0; i < allQuestions.length; i++) {
                grade.push({ assessmentId: test._id, questionId: 0, answer: 0 })
            }
            return handlePushGrade(grade)
        } else if (Array.isArray(grade)) {
            return handlePushGrade(grade)
        }
        handleStartTime(false)
        setMessage(true)
    }

    return (<Container className="school-homepage" fluid
        style={{ opacity: opaCity ? '1' : '0', transition: '500ms ease-in-out' }}
    >
        <Navbar bg="dark" className='justify-content-between'>
            <MdSchool className='school-logo' />
        </Navbar>

        <Row className='p-3 my-0'>
            <Col lg={2} md={3} sm={4} xs={4} className='px-0 pe-0'>
                <button onClick={() => handleNavigation(`/moduleDetails/${test.moduleId}`)} className='return-link' >
                    <HiBackspace /> <span>Module Data</span>
                </button>
            </Col>
        </Row>

        <Row className='d-flex justify-content-center'>
            <Col lg={5} md={6} sm={7} xs={8} className='heading-col d-flex justify-content-center'>
                <h3 className='text-center'>My Assesment</h3>
            </Col>

            {!message &&
                <Col lg={10} md={10} sm={10} xs={10} className='table-responsive table-col my-3 text-start'>
                    <Table bordered>
                        <tbody>
                            <tr>
                                <td className='text-center'>Assessment Title: {test.assessmentTitle} </td>
                                <td className='text-center'>Assessment Duration: {countDown} Secs </td>
                            </tr>
                            {!startTime &&
                                <tr>
                                    <td colSpan={2} className=' text-center'>
                                        <button className='syn-button' onClick={() => handleStartTime(true)
                                        }>Click To Start</button>
                                    </td>
                                </tr>}
                        </tbody>
                    </Table>

                    {test.allQuestions && startTime &&
                        test.allQuestions.map((quest, i) => (
                            <Table bordered key={i}>
                                <thead>
                                    <tr>
                                        <th>Question {i + 1}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <label name={quest._id} htmlFor={quest._id}> {quest.question}</label>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <input onClick={() => handleAnswer(test._id, quest._id, 'A')} type='radio' className='m-1' name={quest._id} id={quest._id} />
                                            <label htmlFor={quest._id}>{quest.optionA}</label>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <input onClick={() => handleAnswer(test._id, quest._id, 'B')} type='radio' className='m-1' name={quest._id} id={quest._id} />
                                            <label htmlFor={quest._id}>{quest.optionB}</label>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <input onClick={() => handleAnswer(test._id, quest._id, 'C')} type='radio' className='m-1' name={quest._id} id={quest._id} />
                                            <label htmlFor={quest._id}>{quest.optionC}</label>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <input onClick={() => handleAnswer(test._id, quest._id, 'D')} type='radio' className='m-1' name={quest._id} id={quest._id} />
                                            <label htmlFor={quest._id}>{quest.optionD}</label>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        ))}


                    {test.allQuestions && startTime &&
                        <Table bordered>
                            <tbody>
                                <tr>
                                    <td className='text-center'><button className='syn-button' onClick={() => handleSubmit()}>Submit</button></td>
                                </tr>
                            </tbody>
                        </Table>}
                </Col>}
        </Row >

        <Row className='justify-content-center'>
            <Col lg={7} md={5} sm={8} xs={10} className='table-col d-flex justify-content-center text-center table-responsive'>
                {message &&
                    <Table bordered>
                        <tbody>
                            <tr>
                                <td colSpan={2}>Assessment Attempted</td>
                            </tr>
                        </tbody>
                    </Table>}
            </Col>
        </Row >

        <footer className="school-footer">
            <Container fluid>
                <Row>
                    <Col lg={12} className="text-center">
                        <p>&copy; 2023 GoldenGate Academy. All Rights Reserved.</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    </Container >

    )
}
export default Test;