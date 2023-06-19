import React from 'react';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const CourseDeets = () => {
    const { id } = useParams();

    return (
        <Container className='d-flex border mt-3 px-3 py-3 mx-auto justify-content-around'>
            <Col className='border text-center' lg={6}>
                <div className='my-2'>{id.toUpperCase()}</div>

                <div className='d-flex justify-content-around mt-0 mb-0'> <hr style={{ width: '50%' }}></hr></div>

                <div><Link to={`/questions/${id} `}><Button className='my-2'>Set Questions</Button></Link> </div>
                <div><Link to={`/update/${id}`}><Button className='mb-2'>Send An Update</Button></Link></div>
                <div><Link to={`/results/${id}`}><Button className='mb-2'>Results</Button></Link></div>
            </Col>
        </Container >
    )
}
export default CourseDeets;