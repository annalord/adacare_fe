import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { postMedApi } from '../../../api/MedsAPI.js';
import { useAuthContext } from '../../../hooks/useAuthContext';
import './AddMedModal.css';

const kDefaultFormState = {
  name: '',
  time: '',
  dosage: '',
  notes: '',
  isPrescription: false,
  refillDate: '',
};

const AddMedModal = (props) => {
  const [formData, setFormData] = useState(kDefaultFormState);
  const { user } = useAuthContext();

  const handleSubmit = async (event) => {
    event.preventDefault();
    props.handleClose();
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
    const newFormData = { ...formData, [fieldName]: fieldValue };
    setFormData(newFormData);
  };

  const handleIsPrescriptionChange = (event) => {
    const fieldValue = event.target.checked;
    const fieldName = event.target.name;
    const newFormData = { ...formData, [fieldName]: fieldValue };
    setFormData(newFormData);
  };

  return (
    <Modal show={props.isOpen} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add a new medication</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className='mb-1'>
            <Form.Label>Medication name</Form.Label>
            <Form.Control
              size='sm'
              name='name'
              value={formData.name}
              onChange={handleChange}
              maxLength='25'
              required
            />
          </Form.Group>

          <Form.Group className='mb-1'>
            <Form.Label className='mt-2'>Time of day</Form.Label>
            <Form.Control
              size='sm'
              name='time'
              value={formData.time}
              onChange={handleChange}
              maxLength='50'
            />
          </Form.Group>

          <Form.Group className='mb-1'>
            <Form.Label className='mt-2'>Dosage</Form.Label>
            <Form.Control
              size='sm'
              name='dosage'
              value={formData.dosage}
              onChange={handleChange}
              maxLength='50'
            />
          </Form.Group>

          <Form.Group className='mb-1'>
            <Form.Label className='mt-2'>Notes</Form.Label>
            <Form.Control
              size='sm'
              name='notes'
              as='textarea'
              value={formData.notes}
              onChange={handleChange}
              maxLength='200'
            />
          </Form.Group>
          <Form.Group className='mb-1'>
            <Form.Label className='mt-2'>
              Refill date (if applicable)
            </Form.Label>
            <Form.Control
              size='sm'
              name='refillDate'
              value={formData.refillDate}
              onChange={handleChange}
              maxLength='25'
            />
          </Form.Group>

          <Form.Group className='mb-1 mt-4'>
            <Form.Check
              name='isPrescription'
              label='Check here if medication is a prescription'
              id='prescription checkbox'
              onChange={handleIsPrescriptionChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant='secondary' onClick={props.handleClose}>
          Close
        </Button>
        <Button id='submit-med' onClick={handleSubmit}>
          Add Medication
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddMedModal;
