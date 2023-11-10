import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { HiBackspace } from 'react-icons/hi';
import { MdSchool } from 'react-icons/md';
import { Navbar, Table } from 'react-bootstrap';

const CreateAssessment = ({ handleAddAssessment,
    handleNavigation }) => {

    let [question, setQuestion] = useState('')
    let [optionA, setOptionA] = useState('')
    let [optionB, setOptionB] = useState('')
    let [optionC, setOptionC] = useState('')
    let [optionD, setOptionD] = useState('')
    let [answer, setAnswer] = useState('')
    let [assessmentTitle, setTitle] = useState('')
    let [duration, setDuration] = useState('')
    let edit = false
    let sendAssessment = false
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
                handleAddAssessment({ assessmentTitle, duration, allQuestions, sendAssessment });
                setTitle('')
                setAllQuestion('')
                setDuration('')
                break;
        }
    }

    const handleChanges = (type, i) => {
        let amendQuestions = [...allQuestions]
        switch (type) {
            case 'edit':
                amendQuestions[i].edit = true
                break;
            case 'save':
                if (questionNew && optionANew && optionBNew && optionCNew && optionDNew && answerNew) {
                    amendQuestions[i].question = questionNew
                    amendQuestions[i].optionA = optionANew
                    amendQuestions[i].optionB = optionBNew
                    amendQuestions[i].optionC = optionCNew
                    amendQuestions[i].optionD = optionDNew
                    amendQuestions[i].answer = answerNew
                    amendQuestions[i].edit = false
                }
                break;
            case 'delete':
                amendQuestions = amendQuestions.filter((_, index) => index != i)
                break;
            case 'cancel':
                amendQuestions[i].edit = false
                break;
        }
        setAllQuestion(amendQuestions)
    }

    return (<Container className="school-homepage pb-5" fluid    >
        <Navbar bg="dark" className='justify-content-between'>
            <MdSchool className='school-logo' />
        </Navbar>

        <Row className='m-0 justify-content-start'>
            <Col lg={2} md={3} sm={4} xs={4} className='return-link'>
                <button onClick={() => handleNavigation(`/assessments`)}  >
                    <HiBackspace /> <span>Assessments</span>
                </button>
            </Col>
        </Row>


        <Row className='justify-content-center m-1'>
            <Col lg={6} md={6} sm={7} xs={8} className='heading-col d-flex justify-content-center'>
                <h3 >Add Assessment</h3>
            </Col>
        </Row>

        <Row className='justify-content-center mt-5 mx-0 me-0'>
            <Col lg={10} md={10} sm={10} xs={10} className='table-col text-center table-responsive'>
                <Table bordered>
                    <tbody>
                        <tr>
                            <td><label htmlFor='title'>Title</label></td>
                            <td><input className='syn-input w-50' id='title' value={assessmentTitle}
                                onInput={(event) => setTitle(event.target.value)} /></td>
                        </tr>
                    </tbody>
                </Table>
            </Col >
        </Row>

        <Row className='justify-content-center mx-0 me-0'>
            <Col lg={10} md={10} sm={10} xs={10} className='table-col text-center table-responsive'>
                <Table>
                    <tbody>
                        <tr>
                            <td><label htmlFor='title'>Question</label></td>
                            <td><input className='syn-input w-50' id='title' value={question}
                                onInput={(event) => setQuestion(event.target.value)} /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor='a'>A</label></td>
                            <td><input className='syn-input w-50' id='a' value={optionA}
                                onInput={(event) => setOptionA(event.target.value)} /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor='b'>B</label></td>
                            <td><input className='syn-input w-50' id='b' value={optionB}
                                onInput={(event) => setOptionB(event.target.value)} /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor='c'>C</label></td>
                            <td><input className='syn-input w-50' id='c' value={optionC}
                                onInput={(event) => setOptionC(event.target.value)} /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor='d'>D</label></td>
                            <td><input className='syn-input w-50' id='d' value={optionD}
                                onInput={(event) => setOptionD(event.target.value)} /></td>
                        </tr>
                        <tr>
                            <td className='pt-1'>
                                Answer
                            </td>

                            <td className='d-flex justify-content-center py-0'>
                                <span className='d-flex align-items-center'>
                                    <label className='mx-1 me-1' htmlFor='A'>A</label>
                                    <input className='syn-input' value={answer} type='radio' name='answer' id='A' onClick={() => setAnswer('A')} />
                                </span>

                                <span className='d-flex align-items-center'>
                                    <label className='mx-1 me-1' htmlFor='B'>B</label>
                                    <input className='syn-input' value={answer} type='radio' name='answer' id='B' onClick={() => setAnswer('B')} />
                                </span>

                                <span className='d-flex align-items-center'>
                                    <label className='mx-1 me-1' htmlFor='C'>C</label>
                                    <input className='syn-input' value={answer} type='radio' name='answer' id='C' onClick={() => setAnswer('C')} />
                                </span>

                                <span className='d-flex align-items-center'>
                                    <label className='mx-1 me-1' htmlFor='D'>D</label>
                                    <input className='syn-input' value={answer} type='radio' name='answer' id='D' onClick={() => setAnswer('D')} />
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <button className='syn-button'
                                    onClick={() => handleAddQuestion('add')}>Add Question
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </Col >
        </Row>

        <Row className='justify-content-center mx-0 me-0'>
            {allQuestions.length > 0 &&
                <Col lg={10} md={10} sm={10} xs={10} className='table-col text-center table-responsive' >
                    <Table bordered >
                        <thead>
                            <tr className='text-center'><th colSpan={2}>Questions</th></tr>
                        </thead>
                        {allQuestions.map((question, i) => (<tbody key={i}>
                            <tr>
                                <td>Question {i + 1}</td>
                                <td>{
                                    !question.edit ?
                                        question.question
                                        : <input className='syn-input' value={question.questionNew}
                                            onInput={(event) => setQuestionNew(event.target.value)} />}
                                </td>
                            </tr>
                            <tr>
                                <td>A</td>
                                <td>{!question.edit ?
                                    question.optionA :
                                    <input className='syn-input'
                                        value={question.optionANew}
                                        onInput={(event) => setOptionANew(event.target.value)} />}
                                </td>
                            </tr>
                            <tr>
                                <td>B</td>
                                <td>{!question.edit ? question.optionB :
                                    <input className='syn-input'
                                        value={question.optionBNew}
                                        onInput={(event) => setOptionBNew(event.target.value)} />}
                                </td>
                            </tr>
                            <tr>
                                <td>C</td>
                                <td>{!question.edit ? question.optionC
                                    : <input className='syn-input'
                                        value={question.optionCNew}
                                        onInput={(event) => setOptionCNew(event.target.value)} />}
                                </td>
                            </tr>
                            <tr>
                                <td>D</td>
                                <td> {!question.edit ?
                                    question.optionD :
                                    <input className='syn-input'
                                        value={question.optionDNew}
                                        onInput={(event) => setOptionDNew(event.target.value)} />}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Answer
                                </td>

                                {!question.edit ? <td>{question.answer}</td> :
                                    <td className='d-flex justify-content-evenly py-0'>
                                        <span>
                                            <label className='mx-1' htmlFor='A'>A</label>
                                            <input type='radio' name='newanswer' id='A' onClick={() => setAnswerNew('A')} />
                                        </span>
                                        <span>
                                            <label className='m-1' htmlFor='B'>B</label>
                                            <input type='radio' name='newanswer' id='B' onClick={() => setAnswerNew('B')} />
                                        </span>
                                        <span>
                                            <label className='m-1' htmlFor='C'>C</label>
                                            <input type='radio' name='newanswer' id='C' onClick={() => setAnswerNew('C')} />
                                        </span>
                                        <span>
                                            <label className='m-1' htmlFor='D'>D</label>
                                            <input type='radio' name='newanswer' id='D' onClick={() => setAnswerNew('D')} />
                                        </span>
                                    </td>}
                            </tr>
                            <tr>
                                {!question.edit ?
                                    <td colSpan={2}>
                                        <span className='d-flex justify-content-evenly'>
                                            <button className='syn-button'
                                                onClick={() => handleChanges('edit', i)}>
                                                Edit
                                            </button>
                                            <button className='syn-button'
                                                onClick={() => handleChanges('delete', i)}>
                                                delete
                                            </button>
                                        </span>
                                    </td>
                                    :
                                    <td colSpan={2}>
                                        <span className='d-flex justify-content-evenly'>
                                            <button className='save-button'
                                                onClick={() => handleChanges('save', i)}>
                                                Save changes
                                            </button>
                                            <button className='cancel-button'
                                                onClick={() => handleChanges('cancel', i)}>
                                                Cancel
                                            </button>
                                        </span>
                                    </td>}
                            </tr>
                        </tbody>))}
                    </Table>
                </Col>}
        </Row>

        {allQuestions.length > 0 &&
            <Row className='justify-content-center mb-5 mx-0 me-0'>
                <Col lg={10} md={10} sm={8} xs={10} className='table-col text-center table-responsive' >
                    <Table bordered>
                        <tbody>
                            <tr>
                                <td className='pt-2'>
                                    <label htmlFor='duration'>Time</label>
                                </td>
                                <td className='py-0'>
                                    <input className='syn-input text-center w-50' id='duration' name='duration'
                                        value={duration}
                                        onInput={(event) => setDuration(event.target.value)} />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    <button className='syn-button text-center'
                                        onClick={() => handleAddQuestion('pushAllQuestion')}>Push Assessment</button>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row >}

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
export default CreateAssessment;
