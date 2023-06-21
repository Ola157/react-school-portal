import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { faSchool } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Navbar } from 'react-bootstrap'; import useBoo from './custom hooks/useBoo';

const Test = ({ schPortal, handleAnswer, addScore }) => {
    const { moduleId, studentId } = useParams();
    let [boo, handleBoo] = useBoo(true)
    let [time, setTime] = useState('')
    let [validate, setVal] = useState('')
    let counter = 1
    let display = ''

    useEffect(() => {
        let a = schPortal.duration ? schPortal.duration.find(a => a.moduleId === moduleId) : ''
        let b = schPortal.resultArray ? schPortal.resultArray.find(a => a.studentId === studentId) : ''
        setVal(b)
        setTime(a.time)
    }, [boo])

    useEffect(() => {
        let interval
        if (time > 0) {
            interval = setInterval(() => {
                setTime((prev) => prev - 1)
            }, 1000)

        }

        return () => clearInterval(interval);

    }, [boo])

    useEffect(() => {
        if (time < 0) {
            mySubmit()
        }
    }, [time])

    const mySubmit = () => {
        let validate = { ...schPortal }
        validate = validate.questionArray ? validate.questionArray.filter((a) => a.moduleId === moduleId && a.answer === a.studentAnswer) : ''
        addScore(moduleId, studentId, validate.length, display)
        handleBoo(true)
    }

    return (
        <Container fluid className='display pb-5'>
            <Navbar bg="black" className="justify-content-around">

                <div className='d-flex justify-content-center align-items-center logo my-1' ><FontAwesomeIcon icon={faSchool} size="2xl" /><span>MySch</span></div>
            </Navbar >

            <Container fluid>
                <Row className='bg-light mt-2'>

                    {!validate ? <>
                        {boo ?
                            <Col className='text-center'>
                                <>Test Duration: {time} secs</>

                                <button className='btn py-0 border rounded' onClick={() => handleBoo(false)}>Click To Start</button>
                            </Col>
                            :

                            <Col >
                                {time > 0 ? <div className='text-center'>{time} Secs Left</div> : ''}
                                {schPortal.questionArray ?
                                    schPortal.questionArray.filter(a => a.moduleId === moduleId).map((a, index) =>
                                    (<div key={index}>
                                        {counter++} {a.question}<br></br>
                                        <div> {time <= 0 ? 'A' : <input onClick={() => handleAnswer('A', index, moduleId)} type='radio' id={a.optionA} value={a.optionA} name={a.question} />}  <label htmlFor={a.optionA}>{a.optionA}</label></div>
                                        <div> {time <= 0 ? 'B' : <input onClick={() => handleAnswer('B', index, moduleId)} type='radio' id={a.optionB} value={a.optionB} name={a.question} />} <label htmlFor={a.optionB}>{a.optionB}</label></div>
                                        <div> {time <= 0 ? 'C' : <input onClick={() => handleAnswer('C', index, moduleId)} type='radio' id={a.optionC} value={a.optionC} name={a.question} />}   <label htmlFor={a.optionC}>{a.optionC}</label></div>
                                        <div> {time <= 0 ? 'D' : <input onClick={() => handleAnswer('D', index, moduleId)} type='radio' id={a.optionD} value={a.optionD} name={a.question} />}   <label htmlFor={a.optionD}>{a.optionD}</label></div>
                                    </div>))
                                    : ''}
                                <button className='btn border rounded py-0' onClick={() => mySubmit()}> Submit</button>
                            </Col>
                        }
                    </>
                        : <Col className='text-center'>Test Attempted <Link to={`/grades/${studentId}`}>Check Grade</Link></Col>}
                </Row >
            </Container >
        </Container >

    )
}
export default Test;