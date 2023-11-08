import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import { HiBackspace } from 'react-icons/hi';
import { MdSchool } from 'react-icons/md';
import { Navbar } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const TutorInformation = ({
    handleGetInformations,
    handleAddInformation,
    handleInformationChanges,
    handleSendInformation,
    handleNavigation,
    handleOpacity }) => {

    let [information, setInfo] = useState('')
    let [title, setTitle] = useState('')
    let sendInformation = false
    let edit = false
    const informations = useSelector(state => state.informations)
    let [informationNew, setInfoNew] = useState('')
    let [titleNew, setTitleNew] = useState('')
    const opaCity = useSelector(state => state.opacity)


    useEffect(() => {
        handleGetInformations('tutor')
        handleOpacity()
    }, [])

    const addInformation = () => {
        if (information && title) {
            handleAddInformation({ information, title, sendInformation, edit })
            setTitle('')
            setInfo('')
        }
    }

    const handleChanges = (type, id) => {
        let data = { informationNew, titleNew }
        handleInformationChanges({ type, id, data })
    }

    return (<Container className="school-homepage" fluid
        style={{ opacity: opaCity ? '1' : '0', transition: '500ms ease-in-out' }}
    >
        <Navbar bg="dark" className='justify-content-between'>
            <MdSchool className='school-logo' />
        </Navbar>

        <Row className='p-3 my-0'>
            <Col lg={2} md={3} sm={4} xs={4} className='px-0 pe-0'>
                <button onClick={() => handleNavigation(`/tutorhomepage`)} className='return-link' >
                    <HiBackspace /> <span>HomePage</span>
                </button>
            </Col>
        </Row>

        <Row className='justify-content-center m-1'>
            <Col lg={5} md={6} sm={7} xs={8} className='heading-col d-flex justify-content-center'>
                <h3 className='text-center'>Informations</h3>
            </Col>
        </Row>

        <Row className='justify-content-center'>
            <Col lg={8} md={8} sm={10} xs={10} className='announcement-col'>
                <div className='d-flex justify-content-evenly align-items-center'>
                    <label className='assesmentInput' htmlFor='titleInput'>Information Title</label>
                    <input id='titleInput' placeholder='Information title' className='anouncementtitleInput w-50 text-start'
                        value={title} onInput={(event) => setTitle(event.target.value)} />
                </div>

                <input
                    placeholder="Send an Information here"
                    onInput={event => setInfo(event.target.value)}
                    value={information}
                    className='anouncementInput text-start'
                />
                <div className='text-center'>
                    <button className='syn-button'
                        onClick={() => addInformation()}>Add Information</button>
                </div>
            </Col>
        </Row>

        <Row className='justify-content-center my-3'>
            {informations.length > 0 &&
                <Col lg={10} md={10} sm={10} xs={10} className='table-responsive table-col my-3 text-center'>
                    <Table bordered>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Information</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {informations.map((info, index) =>
                                <tr key={index}>
                                    {!info.edit ?
                                        <td>{info.title}</td> :
                                        <td>
                                            <input
                                                placeholder="title"
                                                onInput={event => setTitleNew(event.target.value)}
                                                value={titleNew}
                                                className='syn-input text-start'
                                            />
                                        </td>}

                                    {!info.edit ?
                                        <td>{info.information}</td> :
                                        <td  >
                                            <input
                                                placeholder="Send an Information here"
                                                onInput={event => setInfoNew(event.target.value)}
                                                value={informationNew}
                                                className='anouncementInput text-start'
                                            />
                                        </td>}

                                    {!info.edit &&
                                        <td  >
                                            <button className=' syn-button' onClick={!info.sendInformation ?
                                                () => handleSendInformation('send', info._id) :
                                                () => handleSendInformation('cancel', info._id)}>
                                                {!info.sendInformation ? <>Send Information</> : <>Unsend Information</>}
                                            </button>
                                        </td>}

                                    {!info.edit ?
                                        <td className='d-flex justify-content-around align-items-center'>
                                            <button className=' syn-button' onClick={() => handleChanges('edit', info._id)}>Edit</button>
                                            <button className=' syn-button' onClick={() => handleChanges('delete', info._id)}>Delete</button>
                                        </td>
                                        : <td>
                                            <button className='save-button' onClick={() => handleChanges('save', info._id)}>save</button>
                                            <button className='cancel-button' onClick={() => handleChanges('cancel', info._id)}>cancel</button>
                                        </td>}
                                </tr>)}
                        </tbody>
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
    </Container >
    )
}
export default TutorInformation;