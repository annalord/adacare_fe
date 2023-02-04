import FullCalendar from './components/FullCalendar'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const Calendar = () => {
  return (
    <div>
      <Row>
        <Col className='col-9'>
          <FullCalendar/>
        </Col>

        <Col>

        </Col>
      </Row>
    </div>
  )
};

export default Calendar;