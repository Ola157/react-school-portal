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
            let response = await axios.get(`https://react-school-back-end.vercel.app/student/validateStudentAttempt/${questionId}`, {
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

    return (<Container className="school-homepage" fluid>
        <Navbar bg="dark" className='justify-content-between'>
            <MdSchool className='school-logo' />
        </Navbar>

        <Row className='p-3 my-0'>
            <Col lg={2} md={3} sm={4} xs={4} className='px-0 pe-0'>
                <Link to={`/moduleDetails/${myAssessment.moduleId}`} className='return-link' >
                    <HiBackspace /> <span>Module Data</span>
                </Link>
            </Col>
        </Row>

        <Row className='d-flex justify-content-center'>
            <Col lg={5} md={6} sm={7} xs={8} className='heading-col d-flex justify-content-center'>
                <h3 className='text-center'>My Assesment</h3>
            </Col>

            {chectStdAttempt === 'unattempted' &&
                <Col lg={10} md={10} sm={10} xs={10} className='table-responsive table-col my-3 text-start'>
                    <Table bordered>
                        <tbody>
                            <tr>
                                <td className='text-center'>Assesment Title: {myAssessment.testTitle} </td>
                                <td className='text-center'>Assesment Duration: {countDown} Secs </td>
                            </tr>
                            {!startTime &&
                                <tr>
                                    <td colSpan={2} className=' text-center'>
                                        <button className='syn-button' onClick={() => handleAssesmentBegin()}>Click To Start</button>
                                    </td>
                                </tr>}
                        </tbody>
                    </Table>

                    {myAssessment.allQuestions && startTime &&
                        myAssessment.allQuestions.map((quest, i) => (
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
                                            <input onClick={() => handleAnswer(myAssessment._id, quest._id, 'A')} type='radio' className='m-1' name={quest._id} id={quest._id} />
                                            <label htmlFor={quest._id}>{quest.optionA}</label>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <input onClick={() => handleAnswer(myAssessment._id, quest._id, 'B')} type='radio' className='m-1' name={quest._id} id={quest._id} />
                                            <label htmlFor={quest._id}>{quest.optionB}</label>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <input onClick={() => handleAnswer(myAssessment._id, quest._id, 'C')} type='radio' className='m-1' name={quest._id} id={quest._id} />
                                            <label htmlFor={quest._id}>{quest.optionC}</label>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <input onClick={() => handleAnswer(myAssessment._id, quest._id, 'D')} type='radio' className='m-1' name={quest._id} id={quest._id} />
                                            <label htmlFor={quest._id}>{quest.optionD}</label>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        ))}


                    {myAssessment.allQuestions && startTime &&
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
                {chectStdAttempt === 'attempted' &&
                    <Table bordered>
                        <tbody>
                            <tr>
                                <td colSpan={2}>Assesment Attempted</td>
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