import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Fade from 'react-bootstrap/Fade';
import Col from 'react-bootstrap/Col';


const StudentPage = ({ schPortal }) => {
    const [open, setOpen] = useState(false);
    const { id } = useParams();



    return (
        <Container className='border mt-3 px-3 py-3 mx-auto'>
            <Col>WELCOME {id}</Col>
            <Col className='text-center py-1' lg={4}> MY MODULES</Col>

            {schPortal ? <Col className='border text-center p-2' lg={4}>

                {schPortal.moduleArray.map((mod, i) => (<div key={i}>
                    <div>{mod.moduleName}</div>
                </div>))}
                <hr></hr>
                {console.log(schPortal)}
                {schPortal.questionsArray.length > 0 || schPortal.informationsArray.length > 0 ?
                    <>
                        <Button
                            onClick={() => setOpen(!open)}
                            aria-controls="example-fade-text"
                            aria-expanded={open}
                        >
                            Anouncement
                        </Button>


                        <Fade className='mb-0' in={open}>
                            <div id="example-fade-text">

                                {schPortal.questionsArray.length ?
                                    schPortal.moduleArray.map((mod, i) => (
                                        <div key={i}>
                                            < Link to={`/test/${mod.moduleName}/${id}`}>
                                                <Button style={{ border: '0px', backgroundColor: 'white', color: 'blue' }}>
                                                    Test Available
                                                </Button>
                                            </Link>
                                        </div>))
                                    : ''}


                                {schPortal.moduleArray.map((mod, i) => mod.infos.map((a, index) => (<div key={index}>{a.post}</div>)))}

                            </div>
                        </Fade >
                    </> : ''}

            </Col> : 'Check Back Later'}

        </Container >
    )
}
export default StudentPage;