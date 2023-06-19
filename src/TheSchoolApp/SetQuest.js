import React, { Fragment, useState } from 'react';
import { Formik, Form, Field } from 'formik'
import { useParams } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';



const SetQuest = ({ addQuest, deleteBtn, schPortal, sendQuestions, deleteQuests, addTime }) => {
    const { id } = useParams();
    let [studentAnswer, setIt] = useState('')
    let [time, setTime] = useState('')

    const mySubmit = (values) => {
        let { question, optionA, optionB, optionC, optionD, tutorAnswer } = values
        if (question !== '' && optionA !== '' && optionB !== '' && optionC !== '' && optionD !== '' && tutorAnswer !== '') {
            addQuest({ id, question, optionA, optionB, optionC, optionD, tutorAnswer, studentAnswer })
        }
        values.question = '';
        values.optionA = '';
        values.optionB = '';
        values.optionC = '';
        values.optionD = '';
        values.tutorAnswer = '';
    }

    const sendQuests = () => {
        sendQuestions(id);
        setTime('')

    }

    const delQuests = () => {
        deleteQuests(id);
        console.log(schPortal)
    }

    const seTime = e => {
        addTime(e)
    }
    return (
        <Container className='border'>
            <Col className='my-2'>
                <Formik initialValues={{
                    question: '',
                    optionA: '',
                    optionB: '',
                    optionC: '',
                    optionD: '',
                    tutorAnswer: ''
                }}
                    onSubmit={mySubmit}
                >
                    {(props) => (
                        <Form>
                            Question: <Field type='text' placeholder='Question' name='question' /> <br></br>
                            <hr></hr>
                            A <Field type='text' placeholder='option A' name='optionA' /><br></br>
                            <hr></hr>
                            B <Field type='text' placeholder='option B' name='optionB' /><br></br>
                            <hr></hr>
                            C <Field type='text' placeholder='option C' name='optionC' /><br></br>
                            <hr></hr>
                            D <Field type='text' placeholder='option D' name='optionD' /><br></br>
                            <hr></hr>
                            Answer: <Field type='text' placeholder='answer' name='tutorAnswer' />

                            <Button type='submit'>ADD QUESTIONS</Button>
                        </Form>
                    )}
                </Formik >
            </Col>

            {schPortal.moduleArray.length !== 0 ?
                <>
                    < Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>QUESTION</th>
                                <th>OPTION A</th>
                                <th>OPTION B</th>
                                <th>OPTION C</th>
                                <th>OPTION D</th>
                                <th>ANSWER</th>
                            </tr>
                        </thead>
                        <tbody>
                            {schPortal.moduleArray.map((a, i) => (
                                a.allQuest ?
                                    <Fragment key={i}>
                                        {a.allQuest.map((b, index) => (
                                            b.id === id && b.question !== '' ?
                                                < tr key={index} >
                                                    <td>{b.question}</td>
                                                    <td>{b.optionA}</td>
                                                    <td>{b.optionB}</td>
                                                    <td>{b.optionC}</td>
                                                    <td> {b.optionD}</td>
                                                    <td>{b.tutorAnswer}</td>
                                                    <td><Button onClick={() => deleteBtn(id, index)}>Delete</Button></td>
                                                </tr>
                                                : ''
                                        ))}
                                    </Fragment>
                                    : ''
                            ))}
                        </tbody>
                    </Table>
                    <div className='my-2'><input defaultValue={time} onInput={event => seTime(event.target.value)} /><Button>Set Time</Button></div>
                    {schPortal.time !== "" ? <>
                        < div className='my-2'><Button onClick={sendQuests}>Send Questions</Button></div>
                        <div className='my-2'><Button onClick={delQuests}>Delete Test Questions</Button></div>
                    </>
                        : ''}
                </>
                : ''}
        </Container >
    )
}
export default SetQuest;
