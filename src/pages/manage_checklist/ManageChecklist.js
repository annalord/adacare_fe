import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { useState, useEffect } from 'react';
import { getChecklistApi } from '../../api/ChecklistAPI.js'
import './ManageChecklist.css';
import NavBar from '../../misc_components/NavBar';
import DailyChecklist from './components/DailyChecklist';
import AddTaskForm from './components/AddTaskForm';


const ManageToDos = () => {
  const [checklistData, setChecklistData] = useState([]); 

  const getAllChecklistData = async () => {
    const data = await getChecklistApi();
    setChecklistData(data)
  };

  useEffect(() => {
    getAllChecklistData();
    }
  , []);


  return (
    <div id='mng-checklist-page'>
      <Container fluid>
        <Row >
          <NavBar />
        </Row>

        <Row className='mt-3 mb-2'>
          <Col className='col-2'></Col>

          <Col className='ml-2'>
            <DailyChecklist
              checklistData={checklistData}
              getAllChecklistData={getAllChecklistData}
            />
          </Col>
          <Col id='add-task-col'>
            <AddTaskForm
              getAllChecklistData={getAllChecklistData} />
          </Col>
          <Col className='col-1'></Col>
        </Row>
      </Container>
    </div>
  );
};

export default ManageToDos;
