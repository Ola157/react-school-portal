import React from 'react';
import { Link, useParams } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'

const TutorPage = ({ schPortal }) => {
    let { id } = useParams()
    return (
        <Container className='d-flex border mt-3 px-3 py-3 mx-auto justify-content-around'>

            {schPortal.moduleArray ?
                schPortal.moduleArray.map((a, index) =>
                    a.moduleName == id ?
                        (<div style={{ marginTop: '2px' }} key={index}>
                            <hr></hr>
                            <Link to={`/courseDeets/${a.moduleName}`}>
                                <button style={{ border: '0px', backgroundColor: 'white', color: 'blue', textAlign: 'center' }}>
                                    {a.moduleName.toUpperCase()}
                                </button>
                            </Link>
                            <hr></hr>
                        </div>)
                        : '')
                : ''}

        </Container>
    )
}
export default TutorPage;