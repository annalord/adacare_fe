import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { postEventApi } from '../../../api/EventsAPI.js';
import { useAuthContext } from '../../../hooks/useAuthContext';
import './AddEventModal.css';

const kDefaultFormState = {
  title: '',
  details: '',
  start: '',
  end: '',
  allDay: false,
};

const prepEventForSubmit = (eventData) => {
  if (eventData.end === '') {
    eventData.end = '1970-01-01 00:01';
  }
  if (eventData.details === '') {
    eventData.details = 'no details';
  }

  return eventData;
};

const AddEventModal = (props) => {
  const [formData, setFormData] = useState(kDefaultFormState);
  const { user } = useAuthContext();

  const handleSubmit = async (event) => {
    event.preventDefault();
    props.handleClose();
    await postEventApi(prepEventForSubmit(formData), user.id); //post note to database
    setFormData(kDefaultFormState);
    props.getAllEvents(); // get data again, updates state to rerender
  };

  const handleChange = (event) => {
    const fieldValue = event.target.value;
    const fieldName = event.target.name;
    // console.log(`${fieldName}: ${fieldValue}`)
    const newFormData = { ...formData, [fieldName]: fieldValue };
    setFormData(newFormData);
  };

  const handleAllDayChange = (event) => {
    const fieldValue = event.target.checked;
    const fieldName = event.target.name;
    // console.log(`${fieldName}: ${fieldValue}`)
    const newFormData = { ...formData, [fieldName]: fieldValue };
    setFormData(newFormData);
  };

  return (
    <Modal show={props.isOpen} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Calendar Event</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className='mb-1 mt-1'>
            <Form.Label>Event title</Form.Label>
            <Form.Control
              size='sm'
              name='title'
              value={formData.title}
              onChange={handleChange}
              maxLength='50'
              required
            />
          </Form.Group>

          <Form.Group className='mb-1'>
            <Form.Label>Event details</Form.Label>
            <Form.Control
              as='textarea'
              size='sm'
              name='details'
              value={formData.details}
              onChange={handleChange}
              maxLength='300'
            />
          </Form.Group>

          <Form.Group className='mb-3 mt-3'>
            <Form.Check
              name='allDay'
              label='Check if this is an all-day event'
              id='all day checkbox'
              onChange={handleAllDayChange}
            />
          </Form.Group>

          <Form.Group className='mb-1'>
            <Form.Label>Start date and time</Form.Label>
            <Form.Control
              type='datetime-local'
              size='sm'
              name='start'
              value={formData.start}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className='mb-1'>
            <Form.Label>End date and time</Form.Label>
            <Form.Control
              type='datetime-local'
              size='sm'
              name='end'
              disabled={formData.allDay}
              value={formData.end}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant='secondary' onClick={props.handleClose}>
          Close
        </Button>
        <Button id='submit-event' onClick={handleSubmit}>
          Add Event
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddEventModal;
