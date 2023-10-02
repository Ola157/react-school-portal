import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import { Navbar } from 'react-bootstrap';
import { AiFillBackward } from 'react-icons/ai';
import { AiFillForward } from 'react-icons/ai';
import { HiBackspace } from 'react-icons/hi';
import { MdSchool } from 'react-icons/md';


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
                    weekDays.push(<td key={dayIndex}>{dayNumber}</td>);
                } else {
                    weekDays.push(<td key={dayIndex}></td>);
                }
            }

            tr.push(<tr key={row}>{weekDays}</tr>);
        }
    }
    displayCalendar()

    return (<Container className="school-homepage" fluid>
        <Navbar bg="dark">
            <div >
                <MdSchool className='school-logo' />
            </div>
        </Navbar>

        <Row className='p-3 my-0'>
            <Col lg={2} md={3} sm={4} xs={4} className='px-0 pe-0'>
                <Link to={'/'} className='return-link' >
                    <HiBackspace /> <span>Select Profile</span>
                </Link>
            </Col>
        </Row>

        <Row className='justify-content-center m-1'>
            <Col lg={5} md={6} sm={7} xs={8} className='heading-col d-flex justify-content-center'>
                <h3>Calendar</h3>
            </Col>
        </Row>

        <Row className='justify-content-center m-1'>

            <Col lg={9} md={9} sm={12} xs={12} className='table-col table-responsive text-center' >
                <Table bordered>
                    <thead>
                        <tr>
                            <th colSpan={7}>
                                <span className='d-flex justify-content-evenly'>
                                    <button onClick={() => handleDate('previous')} className='border-0 bg-transparent'><AiFillBackward style={{ color: 'yellow' }} /></button>
                                    <span>{months[month]}, {year}</span>
                                    <button onClick={() => handleDate('next')} className='border-0 bg-transparent'><AiFillForward style={{ color: 'yellow' }} /></button>
                                </span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr >{weekdays.map((a, i) => <td key={i}>{a}</td>)}</tr>
                        {tr}
                    </tbody>
                </Table>
            </Col>
        </Row>

    </Container >)
}
export default GuestPage;