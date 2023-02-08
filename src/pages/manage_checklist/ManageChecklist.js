import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import './ManageChecklist.css';
import NavBar from '../../misc_components/NavBar';
import DailyChecklist from './components/DailyChecklist';

const ManageToDos = () => {
  return (
    <div>
      <Container fluid>
        <Row >
          <NavBar />
        </Row>

        <Row className='mt-1'>
          <DailyChecklist></DailyChecklist>
          
        </Row>

        <Row></Row>
      </Container>
    </div>
  );
};

export default ManageToDos;
