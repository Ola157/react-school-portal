import React from 'react';
import { useParams } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';

const Results = ({ schPortal }) => {
    const { id } = useParams();

    return (<Container className='border mt-2'>
        <Table striped bordered hover className='text-center my-2'>
            <thead>
                <tr>
                    <th>S/N</th>
                    <th>Student Number</th>
                    <th>Student Score</th>
                </tr>
            </thead>
            <tbody>
                {schPortal.moduleArray.map((mod) => id === mod.moduleName && mod.results.length > 0 ?
                    mod.results.map((a, index) =>
                    (<tr key={index}>
                        <td>{index + 1}</td>
                        <td>{a.id1}</td>
                        <td>{a.finalScore}</td>
                    </tr>))
                    :
                    <div>No Results Yet</div>)
                }
            </tbody>
        </Table>
    </Container>)
}
export default Results;