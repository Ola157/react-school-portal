import React, { Fragment, useState } from 'react';
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';

const SendUpdate = ({ addInfos, schPortal, delInfo, sendInfo, deleteInfos }) => {
    let [post, setPost] = useState('')
    let { id } = useParams();
    const postBtn = () => {
        addInfos({ post, id })
        setPost('')
    }

    const infoBtn = (a) => {
        a == 'send' ? sendInfo() : deleteInfos()

    }

    return (
        <Container className='mt-3 border'>

            <Form.Control
                as="textarea"
                placeholder="Send an Information here"
                onInput={event => setPost(event.target.value)}
                style={{ height: '100px', marginBottom: '3px', marginTop: '5px' }}
                value={post}
            />
            <Button style={{ marginBottom: '3px' }} onClick={() => postBtn()}>Post</Button> <br></br>

            <Table striped bordered hover className='text-center'>
                <tbody>

                    {schPortal.moduleArray.map((mod, i) => mod.moduleName === id ?
                        mod.infos.map((a, index) => (<tr key={index}>
                            <td>{index + 1}</td>
                            <td>{a.post}</td>
                            <td><Button variant='success' onClick={() => delInfo(index, id)}>Delete Information</Button></td>
                        </tr>)
                        ) : '')}

                </tbody>
            </Table>
            <div className='my-2'><Button onClick={() => infoBtn('send')}>Send Infos</Button></div>
            <div className='my-2'><Button onClick={() => infoBtn('del')}>Delete Infos</Button></div>

        </Container >
    )
}
export default SendUpdate;