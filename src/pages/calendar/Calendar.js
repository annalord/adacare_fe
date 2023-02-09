import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import AddEventModal from './components/AddEventModal.js';
import { getEventsApi } from '../../api/EventsAPI.js'
import MyFullCalendar from './components/FullCalendar.js';
import HomeButton from '../../misc_components/HomeButton'
import NavBar from '../../misc_components/NavBar.js';

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
    <div>
      <Row>
        <NavBar />
      </Row>
      <Row>
        <Col className='col-9'>
          <MyFullCalendar events={eventsData}/>
        </Col>

        <Col>
        {/* change this to clicking on calendar date instead? */}
          <Button onClick={handleShow}> Add Event </Button> 
          <AddEventModal
          isOpen={isModalOpen}
          handleClose={handleClose}
          getAllEvents={getAllEvents}
          />
          <HomeButton />
        </Col>
        
      </Row>
    </div>
  )
};

export default Calendar;