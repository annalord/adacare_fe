import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { postMedApi } from '../../../api/MedsAPI.js';
import { useAuthContext } from '../../../hooks/useAuthContext';

const kDefaultFormState = {
  name: '',
  time: '',
  dosage: '',
  notes: '',
  isPrescription: false,
  refillDate: ''
};

const AddMedModal = (props) => {
  const [formData, setFormData] = useState(kDefaultFormState);
  const { user } = useAuthContext();

  const handleSubmit = async (event) => {
    event.preventDefault();
    props.handleClose();
    console.log(formData)
    await postMedApi(formData, user.id); //post med to database
    setFormData(kDefaultFormState);
    // get data again, update state to rerender
    if (formData.isPrescription) {
      await props.getPrescriptionMeds();
    } else {
      await props.getOtcMeds();
    }
  };

  const handleChange = (event) => {
    const fieldValue = event.target.value;
    const fieldName = event.target.name;
    // console.log(`${fieldName}: ${fieldValue}`)
    const newFormData = { ...formData, [fieldName]: fieldValue };
    setFormData(newFormData);
  };

  const handleIsPrescriptionChange = (event) => {
    const fieldValue = event.target.checked;
    const fieldName = event.target.name;
    // console.log(`${fieldName}: ${fieldValue}`)
    const newFormData = { ...formData, [fieldName]: fieldValue };
    setFormData(newFormData);
  };

  return (
    <Modal show={props.isOpen} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Medication</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>

        <Form.Group className='mb-1'>
            <Form.Check
              name='isPrescription'
              label='Check if medication is a prescription'
              id='prescription checkbox'
              onChange={handleIsPrescriptionChange}
            />
          </Form.Group>

          <Form.Group className='mb-1 mt-1'>
            <Form.Control
              placeholder='Medication name'
              size='sm'
              name='name'
              value={formData.name}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className='mb-1'>
            <Form.Control
              placeholder='Time'
              size='sm'
              name='time'
              value={formData.time}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className='mb-1'>
            <Form.Control
              placeholder='Dosage'
              size='sm'
              name='dosage'
              value={formData.dosage}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className='mb-1'>
            <Form.Control
              placeholder='Notes'
              size='sm'
              name='notes'
              as='textarea'
              value={formData.notes}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className='mb-1'>
            <Form.Control
              placeholder='Refill date (YYYY-MM-DD)'
              size='sm'
              name='refillDate'
              disabled={!formData.isPrescription}
              value={formData.refillDate}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant='secondary' onClick={props.handleClose}>
          Close
        </Button>
        <Button variant='primary' onClick={handleSubmit}>
          Add Event
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddMedModal;
