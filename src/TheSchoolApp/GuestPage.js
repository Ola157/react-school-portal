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
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'


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

    const td = []
    const displayCalendar = () => {
        for (let row = 0; row < numRows; row++) {
            const weekDays = [];

            for (let i = 0; i < 7; i++) {
                const dayIndex = row * 7 + i;
                const dayNumber = dayIndex - firstDayOfMonth + 1;

                if (dayIndex >= firstDayOfMonth && dayNumber <= daysInMonth) {
                    weekDays.push(<td key={dayIndex}>{dayNumber}</td>);
                } else {
                    weekDays.push(<td key={dayIndex}></td>);
                }
            }

            td.push(<tr className='text-white' key={row}>{weekDays}</tr>);
        }
    }
    displayCalendar()

    return (<Container className='display' fluid>
        <Navbar bg="black" className="justify-content-around">
            <div className='d-flex justify-content-center align-items-center logo my-1' ><FontAwesomeIcon icon={faSchool} size="2xl" /><span>MySch</span></div>
        </Navbar >

        <Container fluid >
            <Row className='calendar m-1'>
                <Col lg={12} md={12} sm={12} xs={12} className='d-flex justify-content-start align-items-center my-1'>
                    <Link to='/'><FontAwesomeIcon className='text-white' icon={faArrowLeft} /></Link>
                </Col>
                <hr className='my-0 text-white'></hr>
                <Col lg={12} md={12} sm={12} xs={12} className='text-center align-self-center my-2 text-white'>Calendar</Col>
                <Col lg={12} md={12} sm={12} xs={12}>
                    <Table bordered>
                        <thead>
                            <tr>
                                <th colSpan={7}>
                                    <div className='d-flex justify-content-between'>
                                        <button onClick={() => handleDate('previous')} className='border-0 bg-transparent text-white'><FontAwesomeIcon icon={faAnglesLeft} /></button>
                                        <div className='text-white'>{months[month]}, {year}</div>
                                        <button onClick={() => handleDate('next')} className='border-0 bg-transparent text-white'><FontAwesomeIcon icon={faAnglesRight} /></button>
                                    </div>
                                </th>
                            </tr>

                        </thead>
                        <tbody className='text-white'>
                            <tr >{weekdays.map((a, i) => <td key={i} className='text-white'>{a}</td>)}</tr>
                            {td}
                        </tbody>
                    </Table>


                </Col>
            </Row>

        </Container >
    </Container >)
}
export default GuestPage;