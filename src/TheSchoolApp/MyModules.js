import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { HiBackspace } from 'react-icons/hi';
import { MdSchool } from 'react-icons/md';
import { Navbar, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';


const MyModules = ({ handleFetchMyModules, handleSelectMyModules }) => {
    let allModules = useSelector(state => state.allModules)
    let allMyModules = useSelector(state => state.allMyModules)
    let [selectedMod, setSelected] = useState('')

    useEffect(() => {
        handleFetchMyModules()
    }, [allMyModules, allModules])

    const handleModuleSelect = (moduleId, moduleName, moduleCode) => {
        setSelected([...selectedMod, { moduleId, moduleName, moduleCode }])
    }
    const handleSelectedModule = () => {
        handleSelectMyModules(selectedMod)
    }

    return (<Container className="school-homepage" fluid>
        <Navbar bg="dark" className='justify-content-between'>
            <MdSchool className='school-logo' />
        </Navbar>

        <Row className='p-3 my-0'>
            <Col lg={2} md={3} sm={4} xs={4} className='px-0 pe-0'>
                <Link to={`/userhomepage/${'student'}`} className='return-link' >
                    <HiBackspace /> <span>HomePage</span>
                </Link>
            </Col>
        </Row>

        <Row className='justify-content-center m-1'>
            <Col lg={5} md={6} sm={7} xs={8} className='heading-col d-flex justify-content-center'>
                <h3> {allMyModules.length < 1 ? 'Select From The List Of Modules' : 'My Modules'}</h3>
            </Col>
        </Row>

        <Row className='justify-content-center'>
            {allMyModules.length < 1 &&
                <Col lg={8} md={8} sm={8} className='table-col table-responsive text-center' >
                    <Table>
                        <tbody>
                            {allModules.map((module) => (
                                <tr lg={12} md={12} sm={12} className=' d-flex justify-content-evenly' key={module._id}>
                                    <td><label className='m-1' htmlFor={module._id}>{module.moduleName} {module.moduleCode}</label></td>
                                    <td><input className='m-1' id={module._id} type='radio' onChange={() => handleModuleSelect(module.moduleId, module.moduleName, module.moduleCode)} /></td>
                                </tr>
                            ))}
                            <button className='syn-button my-1' onClick={() => handleSelectedModule()}>Add Modules</button>
                        </tbody>
                    </Table>
                </Col>}

            {allMyModules.length > 0 &&
                <Col lg={8} md={8} sm={8} className='table-col table-responsive text-center' >
                    <Table bordered>
                        <thead>
                            <tr>
                                <th>Module Name</th>
                                <th>Module Code </th>
                            </tr>
                        </thead>
                        {allMyModules.length && allMyModules.map((module, index) => (<tbody key={index}>
                            <tr><td>{module.moduleName}</td><td>{module.moduleCode}</td><td className='text-center'><Link className='module-link' to={`/moduleDetails/${module.moduleId}`}>Click For More!</Link></td></tr>
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
export default MyModules;