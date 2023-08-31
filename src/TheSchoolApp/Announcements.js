import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form';
import { faSchool } from '@fortawesome/free-solid-svg-icons'
import { PiArrowFatLineLeft } from 'react-icons/pi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Navbar, Tab } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const AnnouncementsPage = ({ handleFetchInformations, handle_Add_Information, handleShowInformation, handleAllChanges, handleDisplay }) => {
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

    return (<Container fluid className='display pb-5'>
        <Navbar bg="black" className="justify-content-around">

            <div className='d-flex justify-content-center align-items-center logo my-1' ><FontAwesomeIcon icon={faSchool} size="2xl" /><span>MySch</span></div>
        </Navbar >
        <Row className='p-3 my-0'>
            <Col lg={2} md={2} sm={2} xs={2} className='px-0 pe-0'>
                <Link to={`/userhomepage/${typeId}`} className='bg-white d-flex justify-content-center align-items-center pe-0 px-0 mx-0 me-0 backLink' ><PiArrowFatLineLeft className='mx-1' style={{ fontSize: '1.3em' }} /> <span>HomePage</span></Link>
            </Col>
        </Row>

        <Row className='d-flex justify-content-center'>

            <Col lg={6} md={6} sm={7} xs={8} className='d-flex justify-content-center align-items-center h3headings my-3'>
                <h3 >{typeId === 'tutor' ? 'Announcements' : 'All Announcement'}</h3>
            </Col>
            {typeId === 'tutor' &&
                <Col lg={10} md={10} sm={10} xs={10} className='bg-light py-5'>
                    <div className='d-flex justify-content-evenly'><span className='assesmentInput'>Information Title</span><input className='informationInput w-50' value={title} onInput={(event) => setTitle(event.target.value)} /></div>
                    <Form.Control
                        as="textarea"
                        placeholder="Send an Information here"
                        onInput={event => setInfo(event.target.value)}
                        style={{ height: '5em' }}
                        value={information}
                        className='my-1 informationInput my-1'
                    />
                    <div className='text-center'><button className='addQuestion my-1 py-0' onClick={() => handleAddInformation()}>Add Information</button> </div>

                    {allInformations.map((info, index) =>
                        <Col key={index}>
                            {!info.edit ? <button className='amends my-1 mx-3 me-3' onClick={() => handleShowInformation(info._id)}> {info.title.toUpperCase()} Click for More!</button> :
                                <div><span className='assesmentInput me-3'>Title</span><span><input value={titleNew} className='informationInput w-30' onInput={event => setTitleNew(event.target.value)} /></span></div>}
                            <button className='m-1 amends' onClick={!info.displayForStudents ?
                                () => handleDisplay('displayInfo', info._id) :
                                () => handleDisplay('!displayInfo', info._id)}>
                                {!info.displayForStudents ? <>Send Information</> : <>Unsend Information</>}
                            </button>
                            {info.showInformation && <div className='information my-1 p-3 py-1'><span className='assesmentInput me-3'>Information </span><span>{!info.edit ? info.information :
                                <Form.Control
                                    as="textarea"
                                    placeholder="Send an Information here"
                                    onInput={event => setInfoNew(event.target.value)}
                                    style={{ height: '5em', width: '40%' }}
                                    value={informationNew}
                                    className='my-1 informationInput'
                                />}</span></div>}
                            {info.showInformation && <div><button className='amends m-1 my-1 mx-3 me-3' onClick={!info.edit ? () => handleChanges('edit', info._id) : () => handleChanges('done', info._id)}>{!info.edit ? 'Edit' : 'Save Changes'}</button>{info.edit && <button className='amends m-1' onClick={() => handleChanges('cancel', info._id)}>Cancel Changes</button>}<button className='amends m-1' onClick={() => handleChanges('delete', info._id)}>delete</button></div>}

                        </Col>
                    )}
                </Col>}

            {typeId === 'student' &&
                allInformations.length &&
                <Col lg={8} md={7} sm={7} xs={10} className='bg-light py-2 text-center'>
                    <Table className='table-responsive' striped hover bordered>
                        <thead>
                            <tr>
                                <th className='text-center'>Title</th>
                                <th className='text-center'>Information</th>
                            </tr>
                        </thead>
                        {allInformations.map((info, index) =>
                        (<tbody key={index} >
                            <tr><td className='text-center'>{info.title}</td><td className='text-center'>{info.information}</td></tr>
                        </tbody>))}
                    </Table>
                </Col>}

            {typeId === 'student' && !allInformations.length &&
                <Col lg={7} md={5} sm={8} xs={10} className='d-flex justify-content-center my-2'>
                    <h3 className='px-1 pe-1 py-2 w-50 text-center results'>No Informations, Check Back</h3>
                </Col>
            }



        </Row>
    </Container >
    )
}
export default AnnouncementsPage;