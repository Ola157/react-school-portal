import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { faSchool } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Navbar, Table } from 'react-bootstrap';
import { PiArrowFatLineLeft } from 'react-icons/pi';
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

    return (<Container fluid className='display pb-5'>
        <Navbar bg="black" className="justify-content-around">

            <div className='d-flex justify-content-center align-items-center logo my-1' ><FontAwesomeIcon icon={faSchool} size="2xl" /><span>MySch</span></div>
        </Navbar >

        <Row className='p-3 my-0'>
            <Col lg={2} md={2} sm={2} xs={2} className='px-0 pe-0'>
                <Link to={`/userhomepage/${'student'}`} className='bg-white d-flex justify-content-center align-items-center pe-0 px-0 mx-0 me-0 backLink' ><PiArrowFatLineLeft className='mx-1' style={{ fontSize: '1.3em' }} /> <span>HomePage</span></Link>
            </Col>
        </Row>

        <Row className='d-flex justify-content-center'>
            <Col lg={5} md={6} sm={7} xs={8} className='d-flex justify-content-center align-items-center h3headings my-3'>
                <h3> {allMyModules.length < 1 ? 'Select From The List Of Modules' : 'My Modules'}</h3>
            </Col>

            {allMyModules.length < 1 && <Col lg={8} md={8} sm={8} className='bg-light text-center py-2'>
                {allModules.map((module) => (
                    <Col lg={12} md={12} sm={12} className=' d-flex justify-content-evenly' key={module._id}>
                        <label className='m-1' htmlFor={module._id}>{module.moduleName} {module.moduleCode}</label>
                        <input className='m-1' id={module._id} type='radio' onChange={() => handleModuleSelect(module.moduleId, module.moduleName, module.moduleCode)} />
                    </Col>
                ))}
                <button className='w-20 my-1 border-0 border rounded' onClick={() => handleSelectedModule()}>Add Modules</button>
            </Col>}

            {allMyModules.length > 0 &&
                <Col lg={8} md={8} sm={8} className='d-flex justify-content-evenly table-responsive m-3' >
                    <Table striped hover bordered className='personalInfo'>
                        <thead>
                            <tr>
                                <th>Module Name</th>
                                <th>Module Code </th>
                            </tr>
                        </thead>
                        {allMyModules.length && allMyModules.map((module, index) => (<tbody key={index}>
                            <tr><td>{module.moduleName}</td><td>{module.moduleCode}</td><td className='text-center'><Link className='modulelink' to={`/moduleDetails/${module.moduleId}`}>Click For More!</Link></td></tr>
                        </tbody>))}
                    </Table>
                </Col>}
        </Row>
    </Container >)
}
export default MyModules;