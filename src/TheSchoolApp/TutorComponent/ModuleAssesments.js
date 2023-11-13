import React, { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import { HiBackspace } from 'react-icons/hi';
import { MdSchool } from 'react-icons/md';
import { Navbar } from 'react-bootstrap';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { useSelector } from 'react-redux';


const ModuleAssessments = ({
    handleGetAssessments,
    handleAssessmentChanges,
    handleDeleteAssesment,
    handleSendAssesment,
    handleNavigation
}) => {

    let [question, setQuestion] = useState('')
    let [optionA, setOptionA] = useState('')
    let [optionB, setOptionB] = useState('')
    let [optionC, setOptionC] = useState('')
    let [optionD, setOptionD] = useState('')
    let [answer, setAnswer] = useState('')
    const assessments = useSelector(state => state.assessments)

    useEffect(() => {
        handleGetAssessments()
    }, [])

    const handleAmends = (type, id) => {
        const data = { question, optionA, optionB, optionC, optionD, answer }
        handleAssessmentChanges({ type, id, data })
    }

    return (<Container className="school-homepage" fluid>
        <Navbar bg="dark" className='justify-content-start'>
            <MdSchool className='school-logo' />
        </Navbar>

        <Row className='m-0 justify-content-start'>
            <Col lg={2} md={3} sm={4} xs={4} className='return-link'>
                <button onClick={() => handleNavigation(`/tutorHomepage`)}  >
                    <HiBackspace /> <span>HomePage</span>
                </button>
            </Col>
        </Row>

        <Row className='justify-content-center m-1'>
            <Col lg={5} md={6} sm={7} xs={8} className='heading-col d-flex justify-content-center'>
                <h3 >Assessments</h3>
            </Col>
        </Row>

        <Row className='mt-1 d-flex justify-content-center align-items-center mt-5 mx-0 me-0' >
            {assessments.length > 0 ?
                <Col lg={10} md={10} sm={10} xs={10} className='table-col table-responsive text-center'>
                    {assessments.map((assessment, index) => (
                        <Table bordered key={index}>
                            <thead>
                                <tr>
                                    <th colSpan={2}>
                                        <span className='d-flex justify-content-evenly align-items-center'>
                                            <span className='mx-1'>Title</span>
                                            <span className='me-1'>{assessment.assessmentTitle}</span>
                                        </span>
                                    </th>

                                    <th colSpan={2}>
                                        <span className='d-flex justify-content-evenly align-items-center'>
                                            <span className='mx-1'>Duration</span>
                                            <span className='me-1'>{assessment.duration}</span>
                                        </span>
                                    </th>

                                    <th>
                                        <button className='syn-button py-0'
                                            onClick={!assessment.sendAssessment ?
                                                () => handleSendAssesment('send', assessment._id) :
                                                () => handleSendAssesment('cancel', assessment._id)}>
                                            {!assessment.sendAssessment ? 'Send' : 'Unsend'}</button>
                                    </th>

                                    <th>
                                        <button className='syn-button py-0'
                                            onClick={() => handleDeleteAssesment(assessment._id)}>Remove</button>
                                    </th>
                                </tr>
                                <tr>
                                    <th>Question</th>
                                    <th> A</th>
                                    <th> B</th>
                                    <th> C</th>
                                    <th> D</th>
                                    <th>Answer</th>
                                </tr>
                            </thead>
                            <tbody>
                                {assessment.allQuestions.map((quest, index) => (<tr key={index}>

                                    {!quest.edit ? <td>{quest.question}</td> : <td><input className='syn-input' placeholder='Question' onInput={(event) => setQuestion(event.target.value)} /></td>}
                                    {!quest.edit ? <td>{quest.optionA}</td> : <td><input className='syn-input' placeholder='Option A' onInput={(event) => setOptionA(event.target.value)} /></td>}
                                    {!quest.edit ? <td>{quest.optionB}</td> : <td><input className='syn-input' placeholder='Option B' onInput={(event) => setOptionB(event.target.value)} /></td>}
                                    {!quest.edit ? <td>{quest.optionC}</td> : <td><input className='syn-input' placeholder='Option C' onInput={(event) => setOptionC(event.target.value)} /></td>}
                                    {!quest.edit ? <td>{quest.optionD}</td> : <td><input className='syn-input' placeholder='Option D' onInput={(event) => setOptionD(event.target.value)} /></td>}
                                    {!quest.edit ? <td>{quest.answer}</td> :
                                        <td className='d-flex justify-content-evenly align-items-center'>
                                            <span>
                                                <label htmlFor='A'>A</label>
                                                <input id='A' type='radio' name='answer' className='syn-input' placeholder='Answer' onInput={(event) => setAnswer('A')} />
                                            </span>
                                            <span>
                                                <label htmlFor='B'>B</label>
                                                <input id='B' type='radio' name='answer' className='syn-input' placeholder='Answer' onInput={(event) => setAnswer('B')} />
                                            </span>
                                            <span>
                                                <label htmlFor='C'>C</label>
                                                <input id='C' type='radio' name='answer' className='syn-input' placeholder='Answer' onInput={(event) => setAnswer('C')} />
                                            </span>
                                            <span>
                                                <label htmlFor='D'>D</label>
                                                <input id='D' type='radio' name='answer' className='syn-input' placeholder='Answer' onInput={(event) => setAnswer('D')} />
                                            </span>
                                        </td>}
                                    {!quest.edit ?
                                        <td>
                                            <button className='syn-button py-0' onClick={() => handleAmends('edit', quest._id)}>Edit</button>
                                            <button className='syn-button py-0' onClick={() => handleAmends('delete', quest._id)}>Delete</button>
                                        </td> :
                                        <td>
                                            <button className='save-button py-0' onClick={() => handleAmends('save', quest._id)}>Save Changes</button>
                                            <button className='cancel-button py-0' onClick={() => handleAmends('cancel', quest._id)}>Cancel Changes</button>
                                        </td>}
                                </tr>))}
                            </tbody>
                        </Table>))}
                </Col>
                :
                <Col lg={6} md={6} sm={10} xs={10} className='table-col table-responsive text-center mx-0 me-0'>
                    <Table bordered>
                        <tbody>
                            <tr>
                                <td colSpan={2}>
                                    No Assessment Available
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
            }



            <Col lg={7} md={5} sm={8} xs={10} className='table-col d-flex justify-content-center text-center mx-0 me-0'>
                <Table bordered>
                    <tbody>
                        <tr>
                            <td colSpan={2}>
                                <button className='border-0 bg-transparent'
                                    style={{ color: 'yellow' }}
                                    onClick={() => handleNavigation(`/createassessment`)}>Add Assessment</button>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </Col>
        </Row >

        <div className="fixed-margin">
        </div>

        <footer className="school-footer">
            <Container fluid>
                <Row>
                    <Col lg={12} className="text-center">
                        <p>&copy; 2023 GoldenGate Academy. All Rights Reserved.</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    </Container >)
}
export default ModuleAssessments;