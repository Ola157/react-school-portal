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

const AnnouncementsPage = ({ handleSignOut, handleFetchInformations, handle_Add_Information, handleAllChanges, handleDisplay }) => {
    const { typeId } = useParams()
    let [information, setInfo] = useState('')
    let [title, setTitle] = useState('')
    let displayForStudents = false
    let showInformation = false
    let edit = false
    let allInformations = useSelector(state => state.allInformations)
    let [informationNew, setInfoNew] = useState('')
    let [titleNew, setTitleNew] = useState('')

    useEffect(() => {

        if (true) {
            handleFetchInformations(typeId)
        }
    }, [allInformations])

    const handleAddInformation = () => {
        if (information && title) {
            handle_Add_Information({ information, title, displayForStudents, showInformation, edit })
            setTitle('')
            setInfo('')
        }
    }

    const handleChanges = (type, id) => {
        let origin = 'AnnouncementPage'
        switch (type) {
            case 'edit':
                handleAllChanges({ origin, type, id })
                break;
            case 'done':
                let data = { informationNew, titleNew }
                if (informationNew, titleNew) return handleAllChanges({ origin, type, id, data })
                setTitleNew('')
                setInfoNew('')
                break;
            case 'cancel':
                handleAllChanges({ origin, type, id })
                setTitleNew('')
                setInfoNew('')
                break;
            case 'delete':
                handleAllChanges({ origin, type, id })
                break;
        }
    }

    return (<Container className="school-homepage" fluid>
        <Navbar bg="dark" className='justify-content-between'>
            <MdSchool className='school-logo' />
        </Navbar>

        <Row className='p-3 my-0'>
            <Col lg={2} md={3} sm={4} xs={4} className='px-0 pe-0'>
                <Link to={`/userhomepage/${typeId}`} className='return-link' >
                    <HiBackspace /> <span>HomePage</span>
                </Link>
            </Col>
        </Row>

        <Row className='justify-content-center m-1'>
            <Col lg={5} md={6} sm={7} xs={8} className='heading-col d-flex justify-content-center'>
                <h3 className='text-center'>{typeId === 'tutor' ? 'Announcements' : 'All Announcement'}</h3>
            </Col>
        </Row>


        {typeId === 'tutor' &&
            <>
                <Row className='justify-content-center'>
                    <Col lg={8} md={8} sm={10} xs={10} className='announcement-col'>
                        <div className='d-flex justify-content-evenly align-items-center'>
                            <label className='assesmentInput' htmlFor='titleInput'>Information Title</label>
                            <input id='titleInput' placeholder='Information title' className='anouncementtitleInput w-50 text-start' value={title} onInput={(event) => setTitle(event.target.value)} />
                        </div>

                        <input
                            placeholder="Send an Information here"
                            onInput={event => setInfo(event.target.value)}
                            value={information}
                            className='anouncementInput text-start'
                        />
                        <div className='text-center'>
                            <button className='syn-button'
                                onClick={() => handleAddInformation()}>Add Information</button>
                        </div>
                    </Col>
                </Row>

                <Row className='justify-content-center'>
                    {allInformations.length > 0 &&
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
                                    {allInformations.map((info, index) =>
                                        <tr key={index}>
                                            {!info.edit ?
                                                <td>{info.title}</td> :
                                                <td>
                                                    <input
                                                        placeholder="title"
                                                        onInput={event => setTitleNew(event.target.value)}
                                                        value={information}
                                                        className='syn-input text-start'
                                                    />
                                                </td>}

                                            {!info.edit ?
                                                <td>{info.information}</td> :
                                                <td  >
                                                    <input
                                                        placeholder="Send an Information here"
                                                        onInput={event => setInfoNew(event.target.value)}
                                                        value={information}
                                                        className='anouncementInput text-start'
                                                    />
                                                </td>}
                                            {!info.edit &&
                                                <td  >
                                                    <button className=' syn-button' onClick={!info.displayForStudents ?
                                                        () => handleDisplay('displayInfo', info._id) :
                                                        () => handleDisplay('!displayInfo', info._id)}>
                                                        {!info.displayForStudents ? <>Send Information</> : <>Unsend Information</>}
                                                    </button>
                                                </td>}

                                            {!info.edit ?
                                                <td className='d-flex justify-content-around align-items-center'>
                                                    <button className=' syn-button' onClick={() => handleChanges('edit', info._id)}>Edit</button>
                                                    <button className=' syn-button' onClick={() => handleChanges('delete', info._id)}>Delete</button>
                                                </td>
                                                : <td>
                                                    <button className='save-button' onClick={() => handleChanges('done', info._id)}>save changes</button>
                                                    <button className='cancel-button' onClick={() => handleChanges('cancel', info._id)}>cancel</button>
                                                </td>}
                                        </tr>)}
                                </tbody>
                            </Table>
                        </Col>}
                </Row>
            </>}

        <Row className='justify-content-center'>
            {typeId === 'student' &&
                allInformations.length > 0 &&
                <Col lg={10} md={10} sm={10} xs={10} className='table-responsive table-col my-3 text-center'>
                    <Table bordered>
                        <thead>
                            <tr>
                                <th>Module Name</th>
                                <th>Title</th>
                                <th>Information</th>
                            </tr>
                        </thead>
                        {allInformations.map((info, index) =>
                        (<tbody key={index} >

                            <tr><td>{info.moduleName}</td><td>{info.title}</td><td>{info.information}</td></tr>
                        </tbody>))}
                    </Table>
                </Col>
            }
        </Row >

        <Row className='justify-content-center'>
            {typeId === 'student' && !allInformations.length > 0 &&
                <Col lg={7} md={5} sm={8} xs={10} className='table-col d-flex justify-content-center text-center'>
                    <Table bordered>
                        <tbody>
                            <tr>
                                <td colSpan={2}>No Informations, Check Back</td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
            }



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
export default AnnouncementsPage;