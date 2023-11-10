import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { HiBackspace } from 'react-icons/hi';
import { MdSchool } from 'react-icons/md';
import { Navbar, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import axios from 'axios';


const ModulesPage = ({
    handleGetModules,
    handleSelectModules,
    handleStudentModules,
    handleNavigation
}) => {

    const modules = useSelector(state => state.modules)
    let [module, setSelected] = useState('')
    let [message, setMessage] = useState('')

    useEffect(() => {
        validateCourses()
    }, [])

    const validateCourses = () => {
        const myJwt = localStorage.getItem('accessToken')
        // axios.get('http://localhost:9090/student/ifRegistered',
        axios.get('https://react-school-back-end.vercel.app/student/ifRegistered',

            {
                headers: {
                    'Authorization': `Bearer ${myJwt}`
                }
            }).then((response) => {
                const { message } = response.data
                setMessage(message)
                if (message === 'courses registered') return handleStudentModules()
                if (message === 'courses unRegistered') return handleGetModules()
            })
            .catch((err) => { console.error(err) })
    }

    const handleModuleSelect = (moduleId, moduleName, moduleCode) => {
        setSelected([...module, { moduleId, moduleName, moduleCode }])
    }

    const handleSelectedModule = () => {
        handleSelectModules(module)
        setTimeout(() => {
            validateCourses()
        }, 500)
    }

    return (<Container className="school-homepage" fluid>
        <Navbar bg="dark" className='justify-content-between'>
            <MdSchool className='school-logo' />
        </Navbar>

        <Row className='m-0 justify-content-start'>
            <Col lg={2} md={3} sm={4} xs={4} className='return-link'>
                <button onClick={() => handleNavigation(`/studentHomepage`)}  >
                    <HiBackspace /> <span>HomePage</span>
                </button>
            </Col>
        </Row>

        <Row className='justify-content-center m-1'>
            <Col lg={5} md={6} sm={7} xs={10} className='heading-col d-flex justify-content-center'>
                <h3> {message === 'courses unRegistered' ? 'Select Modules' : 'Modules'}</h3>
            </Col>
        </Row>

        <Row className='justify-content-center mt-5 mx-0 me-0'>
            {message === 'courses unRegistered' &&
                <Col lg={8} md={8} sm={8} className='table-col table-responsive text-center dropdownTable' >
                    <Table>
                        <tbody>
                            {modules.map((module) => (
                                <tr lg={12} md={12} sm={12} className=' d-flex justify-content-evenly' key={module._id}>
                                    <td><label className='m-1' htmlFor={module._id}>{module.moduleName} {module.moduleCode}</label></td>
                                    <td><input className='m-1' id={module._id} type='radio'
                                        onClick={() => handleModuleSelect(module._id, module.moduleName, module.moduleCode)} /></td>
                                </tr>
                            ))}
                            <tr><td>
                                <button className='syn-button my-1' onClick={() => handleSelectedModule()}>Add Modules</button>
                            </td></tr>
                        </tbody>
                    </Table>
                </Col>}

            {message === 'courses registered' &&
                <Col lg={8} md={8} sm={8} className='table-col table-responsive text-center' >
                    <Table bordered>
                        <thead>
                            <tr>
                                <th>Module Name</th>
                                <th>Module Code </th>
                            </tr>
                        </thead>
                        {modules.length > 0 && modules.map((module, index) => (<tbody key={index}>
                            <tr>
                                <td>{module.moduleName}</td>
                                <td>{module.moduleCode}</td>
                                <td className='text-center'>
                                    <button className='module-link' onClick={() => handleNavigation(`/moduleDetails/${module.moduleId}`)}>Click For More!</button>
                                </td>
                            </tr>
                        </tbody>))}
                    </Table>
                </Col>}
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
    </Container >)
}
export default ModulesPage;