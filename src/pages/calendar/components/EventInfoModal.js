import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteEventApi } from '../../../api/EventsAPI.js';
import './EventInfoModal.css'


const EventInfoModal = (props) => {
  
  const handleDelete = async () => {
    await deleteEventApi(props.selectedEventInfo?.event?.id);
    props.getAllEvents();
    props.handleClose();
  };

  // console.log((props.selectedEventInfo?.event?.start))

  return (
    <Modal show={props.isOpen} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Event Information</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>
            <span className='event-info-labels'>Title: </span>
            {props.selectedEventInfo?.event?.title}
        </p>
        <p>
          <span className='event-info-labels'>Details: </span>
          {props.selectedEventInfo?.event?.extendedProps?.details}
        </p>
        <p>
          <span className='event-info-labels'>Start: </span>
          {new Date(props.selectedEventInfo?.event?.start).toLocaleString('en-US', {timeZone: 'UTC'})}
        </p>
        <p>
          <span className='event-info-labels'>End: </span>
          {(new Date(props.selectedEventInfo?.event?.end).toLocaleString('en-US', {timeZone: 'UTC'}) === '1/1/1970, 12:00:00 AM') ? ' ' : (new Date(props.selectedEventInfo?.event?.end).toLocaleString('en-US', {timeZone: 'UTC'}))} 
        </p>
        <p>
          <span className='event-info-labels'>All day: </span>
          {props.selectedEventInfo?.event?.extendedProps?.all_day ? 'Yes': 'No'} 
        </p>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={handleDelete} id='delete-event'>Delete event</Button>
        <Button variant='secondary' onClick={props.handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EventInfoModal;

