import React from 'react';
import { useNavigate } from 'react-router-dom'
import { MdArrowForwardIos } from 'react-icons/md';
import { BsFillPersonFill } from 'react-icons/bs';
import { MdSchool } from 'react-icons/md';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Navbar } from 'react-bootstrap';

const HomePage = () => {
    const navigate = useNavigate();
    return (<Container className="school-homepage" fluid>
        <Navbar bg="dark">
            <div >
                <MdSchool className='school-logo' />
            </div>
        </Navbar>

        <Row className="justify-content-center">
            <Col lg={6} md={6} sm={8} xs={10} className="homepage-card">
                <div className="text-center homepage-intro">
                    Welcome to GoldenGate Academy
                </div>
                <hr className="my-1 text-white" />
                <div className="d-flex justify-content-center my-2">
                    <MdSchool className='school-logo' />
                </div>
                <div className="text-center homepage-intro">
                    Your Gateway to Excellence - The Ultimate Student Portal
                </div>
                <hr className="my-1 text-white" />
                <button
                    className="homepage-button"
                    onClick={() => navigate(`/admin/student`)}
                >
                    <BsFillPersonFill /> Student
                    <MdArrowForwardIos />
                </button>
                <button
                    className="homepage-button"
                    onClick={() => navigate(`/admin/tutor`)}
                >
                    <BsFillPersonFill /> Staff
                    <MdArrowForwardIos />
                </button>
                <button
                    className="homepage-button"
                    onClick={() => navigate("/guest")}
                >
                    <BsFillPersonFill /> Guest
                    <MdArrowForwardIos />
                </button>
            </Col>
        </Row>

        <footer className="school-footer">
            <Container fluid>
                <Row>
                    <Col lg={12} className="text-center">
                        <p>&copy; 2023 GoldenGate Academy. All Rights Reserved.</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    </Container>
    );
}

export default HomePage;