import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import AddEventModal from './components/AddEventModal.js';
import { getEventsApi } from '../../api/EventsAPI.js'
import MyFullCalendar from './components/FullCalendar.js';
import NavBar from '../../misc_components/NavBar.js';
import './Calendar.css'

const Calendar = () => {

  const [eventsData, setEventsData] = useState([]);

  const getAllEvents = async () => {
    const data = await getEventsApi();
    setEventsData(data);
  };

  useEffect( () => {
    // console.log('in useffect for calendar')
    getAllEvents();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleShow = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  return (
    <div id="calendar-page">
      <Row>
        <NavBar />
      </Row>
      <Row>
        <Col className='col-9'>
          <MyFullCalendar events={eventsData}/>
        </Col>

        <Col >
          <Button onClick={handleShow} id='add-event-button' className='mt-3 mr-3'> Click here to add a new calendar event </Button> 
          <AddEventModal
          isOpen={isModalOpen}
          handleClose={handleClose}
          getAllEvents={getAllEvents}
          />
        </Col>
        
      </Row>
    </div>
  )
};

export default Calendar;