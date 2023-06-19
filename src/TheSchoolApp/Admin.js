import React, { useState, useReducer } from 'react';
import { useParams } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

const Admin = ({ addStudent, schPortal, addMod, boo }) => {
    let allQuest = []
    let infos = []
    let results = []

    const mySubmit = (value) => {
        let { moduleName, moduleCode } = value;
        addMod({ moduleName, moduleCode, allQuest, infos, results })
        value.moduleName = '';
        value.moduleCode = '';
    }

    const mySecSubmit = (value) => {
        let { studentCode, studentPass } = value;
        addStudent({ studentCode, studentPass })

        value.studentCode = '';
        value.studentPass = '';

    }

    return (
        <Container className='mt-3'>

            {boo ?
                <>
                    <Formik initialValues={{
                        studentCode: '',
                        studentPass: ''
                    }}
                        onSubmit={mySecSubmit}
                    >
                        {(props) => (
                            <Form >
                                <Field className='text-center' style={{ marginBottom: '2px' }} placeholder='Student Code' type='text' name='studentCode' /><br></br>
                                <Field className='text-center' style={{ marginBottom: '2px' }} placeholder='student Password' type='text' name='studentPass' /><br></br>
                                <Button type='submit'>Sign Up</Button>
                            </Form>
                        )}
                    </Formik>
                </>
                :
                <>
                    <Formik initialValues={{
                        moduleName: '',
                        moduleCode: ''
                    }}
                        onSubmit={mySubmit}
                    >
                        {(props) => (
                            <Form >
                                <Field className='text-center' style={{ marginBottom: '2px' }} placeholder='Module Name' type='text' name='moduleName' /><br></br>
                                <Field className='text-center' style={{ marginBottom: '2px' }} placeholder='Module Code' type='text' name='moduleCode' /><br></br>
                                <Button type='submit'>Sign Up</Button>
                            </Form>
                        )}
                    </Formik>

                    {schPortal.moduleArray ?
                        < Table striped bordered hover className='text-center my-2'>

                            <thead>
                                <tr>
                                    <th>MODULE</th>
                                    <th>CODE</th>
                                </tr>
                            </thead>
                            <tbody>
                                {schPortal.moduleArray.map((a, index) =>
                                (<tr key={index}>
                                    <td>{a.moduleName}</td>
                                    <td>{a.moduleCode}</td>
                                </tr>))}
                            </tbody>
                        </Table >

                        : ''}
                </>}
        </Container >
    )
}
export default Admin;