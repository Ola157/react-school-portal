import React, { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { HiBackspace } from 'react-icons/hi';
import { MdSchool } from 'react-icons/md';
import { Navbar } from 'react-bootstrap';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { useSelector } from 'react-redux';


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

    return (<Container className="school-homepage" fluid>
        <Navbar bg="dark" className='justify-content-start'>
            <MdSchool className='school-logo' />
        </Navbar>

        <Row className='p-3 my-0'>
            <Col lg={2} md={3} sm={4} xs={4} className='px-0 pe-0'>
                <Link to={`/questions/${type}`} className='return-link' >
                    <HiBackspace /> <span>Assessment</span>
                </Link>
            </Col>
        </Row>

        <Row className='justify-content-center'>
            <Col lg={5} md={6} sm={7} xs={8} className='heading-col d-flex justify-content-center'>
                <h3 >All Assesment Questions</h3>
            </Col>
        </Row>

        <Row className='mt-1 d-flex justify-content-center align-items-center' >
            {allQuestions.length > 0 ?
                <Col lg={12} md={10} sm={10} xs={10} className='table-col table-responsive text-center'>
                    {allQuestions.map((question, index) => (
                        <Table bordered key={index}>
                            <thead>
                                <tr>
                                    <th colSpan={2}><span className='d-flex justify-content-evenly align-items-center'><span>Title</span><span>{question.testTitle}</span></span></th>
                                    <th colSpan={2}><span className='d-flex justify-content-evenly align-items-center'><span>Duration</span><span>{question.duration}</span></span></th>
                                    <th>
                                        <button className='syn-button'
                                            onClick={!question.displayForStudents ?
                                                () => handleDisplay('displayAssessment', question._id) :
                                                () => handleDisplay('!displayAssessment', question._id)}>
                                            {!question.displayForStudents ? 'Send Assesment' : 'Unsend Assessment'}</button>
                                    </th>

                                    <th>
                                        <button className='syn-button'
                                            onClick={() => handleAmends('delete', question._id)}>Remove</button>
                                    </th>
                                </tr>
                                <tr>
                                    <th>Question</th>
                                    <th>Option A</th>
                                    <th>Option B</th>
                                    <th>Option C</th>
                                    <th>Option D</th>
                                    <th>Answer</th>
                                </tr>
                            </thead>
                            <tbody>
                                {question.allQuestions.length > 0 &&
                                    question.allQuestions.map((quest, index) => (<tr key={index}>

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
                                                <button className='syn-button' onClick={() => handleAmends('edit', quest._id)}>Edit</button>
                                            </td> :
                                            <td>
                                                <button className='save-button' onClick={() => handleAmends('done', quest._id)}>Save Changes</button>
                                                <button className='cancel-button' onClick={() => handleAmends('cancel', quest._id)}>Cancel Changes</button>
                                            </td>}
                                    </tr>))}
                            </tbody>
                        </Table>))}
                </Col>
                :
                <Col lg={7} md={5} sm={8} xs={10} className='table-col d-flex justify-content-center text-center'>
                    <Table bordered>
                        <tbody>
                            <tr>
                                <td colSpan={2}>
                                    No Questions Yet, <button className='border-0 bg-transparent' style={{ color: 'yellow', textDecoration: 'underline' }} onClick={() => navigate(`/questions/${type}`)}> Click To Add New Question</button>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
            }
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
    </Container >)
}
export default ModuleQuestions;