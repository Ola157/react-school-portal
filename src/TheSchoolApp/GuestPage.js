import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import { Navbar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSchool } from '@fortawesome/free-solid-svg-icons'
import { faAnglesLeft } from '@fortawesome/free-solid-svg-icons'
import { faAnglesRight } from '@fortawesome/free-solid-svg-icons'
import { PiArrowFatLineLeft } from 'react-icons/pi';


const GuestPage = () => {
    let today = new Date()
    let weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat']
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    let [month, setMonth] = useState(today.getMonth())
    let [year, setYear] = useState(today.getFullYear())
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const totalDays = daysInMonth + firstDayOfMonth;
    const numRows = Math.ceil(totalDays / 7);

    const handleDate = any => {
        if (any === 'previous') {
            setMonth((prev) => prev -= 1)
            if (month <= 0) {
                setMonth(11)
                setYear((prev) => prev - 1)
            }
        }
        if (any === 'next') {
            setMonth((prev) => prev += 1)
            if (month >= 11) {
                setMonth(0)
                setYear((prev) => prev + 1)
            }
        }
    }

    const tr = []
    const displayCalendar = () => {
        for (let row = 0; row < numRows; row++) {
            const weekDays = [];

            for (let i = 0; i < 7; i++) {
                const dayIndex = row * 7 + i;
                const dayNumber = dayIndex - firstDayOfMonth + 1;

                if (dayIndex >= firstDayOfMonth && dayNumber <= daysInMonth) {
                    weekDays.push(<td key={dayIndex} className='text-white text-center'>{dayNumber}</td>);
                } else {
                    weekDays.push(<td key={dayIndex}></td>);
                }
            }

            tr.push(<tr key={row}>{weekDays}</tr>);
        }
    }
    displayCalendar()

    return (<Container className='display pb-5' fluid>
        <Navbar bg="black" className="justify-content-around">
            <div className='d-flex justify-content-center align-items-center logo my-1' ><FontAwesomeIcon icon={faSchool} size="2xl" /><span>MySch</span></div>
        </Navbar >

        <Row className='p-3 my-0'>
            <Col lg={2} md={2} sm={2} xs={2} className='px-0 pe-0'>
                <Link to={'/'} className='bg-white d-flex justify-content-center align-items-center pe-0 px-0 mx-0 me-0 backLink' ><PiArrowFatLineLeft className='mx-1' style={{ fontSize: '1.3em' }} /> <span>Select Profile</span></Link>
            </Col>
        </Row>

        <Row className='d-flex justify-content-center m-1'>
            <Col lg={5} md={6} sm={7} xs={8} className='d-flex justify-content-center align-items-center h3headings my-3'>
                <h3>Calendar</h3>
            </Col>



            <Col lg={9} md={9} sm={12} xs={12} className='calendar table-responsive' >
                <div className='d-flex justify-content-evenly py-1 my-1'>
                    <div>
                        <button onClick={() => handleDate('previous')} className='border-0 bg-transparent text-white'><FontAwesomeIcon icon={faAnglesLeft} /></button>
                    </div>
                    <div className='text-white'>
                        {months[month]}, {year}
                    </div>

                    <div>
                        <button onClick={() => handleDate('next')} className='border-0 bg-transparent text-white'><FontAwesomeIcon icon={faAnglesRight} /></button>
                    </div>

                </div>

                <Table bordered striped hover>
                    <tbody>
                        <tr >{weekdays.map((a, i) => <td key={i} className='text-white text-center'>{a}</td>)}</tr>
                        {tr}
                    </tbody>
                </Table>
            </Col>
        </Row>

    </Container >)
}
export default GuestPage;