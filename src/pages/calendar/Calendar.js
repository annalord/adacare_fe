import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import AddEventModal from './components/AddEventModal.js';
import { getEventsApi } from '../../api/EventsAPI.js';
import MyFullCalendar from './components/FullCalendar.js';
import NavBar from '../../misc_components/NavBar.js';
import './Calendar.css';

const Calendar = () => {
  const [eventsData, setEventsData] = useState([]);

  const getAllEvents = async () => {
    const data = await getEventsApi();
    setEventsData(data);
  };

  useEffect(() => {
    getAllEvents();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleShow = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  return (
    <div id='calendar-page'>
      <Row>
        <NavBar />
      </Row>

      <Row className='ml-3' id='info-row'>
        <div id='cal-blurb'>
          <p className='cal-blurb-p'>
            Events on the calendar will be shown in "Today's Checklist" on the
            home page on the day of the event.{' '}
          </p>
          <p className='cal-blurb-p'>Click on an event for more information.</p>
        </div>
        <Button
          onClick={handleShow}
          id='add-event-button'
          className='mt-3 mr-3'
        >
          Add a new calendar event
        </Button>
        <AddEventModal
          isOpen={isModalOpen}
          handleClose={handleClose}
          getAllEvents={getAllEvents}
        />
      </Row>

      <Row>
        <Col id='cal-col'>
          <MyFullCalendar events={eventsData} getAllEvents={getAllEvents} />
        </Col>
      </Row>
    </div>
  );
};

export default Calendar;
