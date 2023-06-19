import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Container } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';



const Test = ({ schPortal, studentAnswer, addScore }) => {
    const { id, id1 } = useParams();
    let [finalScore, setScore] = useState('')
    let [value, setValue] = useState('')
    let [boo, setBoo] = useState(true)
    let [time, setTime] = useState(schPortal.time)

    useEffect(() => {
        let dInterval = boo && schPortal.time ? setInterval(() => {
            setTime((prev) => prev - 1)
        }, 1000) : time

        return () => clearInterval(dInterval);

    }, [])


    useEffect(() => {
        const funcPage = () => {
            if (time === 0) {
                mySubmit()
                setTime((prev) => prev = 0)
                setBoo(true)
            }

        }
        funcPage()
    }, [time])

    const funcAnsa = (e, ind) => {
        setValue(e)
        studentAnswer(e, ind, id)
    }

    const mySubmit = () => {
        let newMod = { ...schPortal }
        newMod = newMod.moduleArray.find((a) => a.moduleName === id)
        setScore(newMod.allQuest.filter((mod) => mod.tutorAnswer === mod.studentAnswer).length)
        finalScore = newMod.allQuest.filter((mod) => mod.tutorAnswer === mod.studentAnswer).length
        addScore(id1, finalScore, id)
        setBoo(true)

    }

    const myBtn = () => {
        setBoo(false)
    }

    return (
        <Container className='border'>
            {boo ? <> <>Test Duration: {schPortal.time} secs</>

                <Button onClick={myBtn}>Click To Start Now</Button>
            </>
                : ''}
            {boo == false ?
                <Col className='border m-2 p-2'>
                    <div>{boo ? <>Score: {finalScore ? finalScore : 0}</> : ''}</div>
                    <div>{time} Secs Left</div>
                    {schPortal.questionsArray ?
                        schPortal.questionsArray.map((mod, ind) => id == mod.id ? (<div key={ind}>
                            {ind + 1} {mod.question}<br></br>
                            (A) {mod.optionA}<br></br>
                            (B) {mod.optionB}<br></br>
                            (C) {mod.optionC}<br></br>
                            (D) {mod.optionD}<br></br>
                            {boo == false ? <input onInput={event => funcAnsa(event.target.value, ind)} style={{ width: '20px' }} /> : ''}<br></br>
                            {finalScore > 0 ? <>Answer:{mod.tutorAnswer} </> : ''}

                        </div>)
                            : schPortal.questionsArray)

                        : ''}
                    <div> {value ? <button onClick={() => mySubmit()}>{boo ? <Link to='/student'>Back</Link> : "Submit"}</button> : ''} </div>
                </Col>
                : ''}
        </Container >

    )
}
export default Test;