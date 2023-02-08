import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import FormCheck from 'react-bootstrap/FormCheck'
import { useState } from 'react';
import { postEventApi } from '../../../api/EventsAPI.js'


const kDefaultFormState = {
  title: "",
  details: "",
  start: "",
  end: false,
  allDay: false
};


const AddEventModal = (props) => {

  const [formData, setFormData] = useState(kDefaultFormState);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormData(kDefaultFormState);
    props.handleClose();
    await postEventApi(formData); //post note to database 
    props.getAllEvents(); // get data again, updates state to rerender
  };


  const handleChange = (event) => {
    const fieldValue = event.target.value;
    const fieldName = event.target.name;
    // console.log(`${fieldName}: ${fieldValue}`)
    const newFormData = { ...formData, [fieldName]: fieldValue };
    setFormData(newFormData)
  };

  const handleAllDayChange = (event) => {
    const fieldValue = event.target.checked;
    const fieldName = event.target.name;
    // console.log(`${fieldName}: ${fieldValue}`)
    const newFormData = { ...formData, [fieldName]: fieldValue };
    setFormData(newFormData)
  };


  return (
    <Modal show={props.isOpen} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Calendar Event</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        
        <Form>

          <Form.Group className='mb-1 mt-1'>
            <Form.Control
                  placeholder='Event title'
                  size='sm'
                  name='title'
                  value={formData.title}
                  onChange={handleChange}
                />
          </Form.Group>

          <Form.Group className='mb-1'>
            <Form.Control
                  placeholder='Event details'
                  as='textarea'
                  size='sm'
                  name='details'
                  value={formData.details}
                  onChange={handleChange}
                />
          </Form.Group>

          <Form.Group className='mb-1'>
            <Form.Check
                  name='allDay'
                  label='All day'
                  id='all day checkbox'
                  onChange={handleAllDayChange}
                />
          </Form.Group>

          <Form.Group className='mb-1'>
            <Form.Control
                  placeholder='Start time and date'
                  size='sm'
                  name='start'
                  value={formData.start}
                  onChange={handleChange}
                />
          </Form.Group>

          <Form.Group className='mb-1'>
            <Form.Control
                  placeholder='End time and date'
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
        <Button variant="secondary" onClick={props.handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}> 
          Add Event 
        </Button>
      </Modal.Footer>
  </Modal>
  )
};

export default AddEventModal;