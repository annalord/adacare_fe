import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react';
import { postMedApi, putMedsApi } from '../../../api/MedsAPI.js';
import { useAuthContext } from '../../../hooks/useAuthContext';
import './EditMedModal.css'




const EditMedModal = (props) => {

  const kDefaultFormState = {
    name: props.currentMedData.med_name,
    time: props.currentMedData.time,
    dosage: props.currentMedData.dosage,
    notes: props.currentMedData.notes,
    isPrescription: props.currentMedData.is_prescription ??= '-', //nullish coalesce assignment
    refillDate: props.currentMedData.refill_date ??= '-'
  };

  // console.log(kDefaultFormState)

  const [formData, setFormData] = useState(kDefaultFormState);
  const { user } = useAuthContext();

  useEffect(() => {
    setFormData(kDefaultFormState);
  }, [props.isOpen]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormData(kDefaultFormState);
    await putMedsApi(formData, props.currentMedData.id, user.id)
    props.getPrescriptionMeds();
    props.handleClose();
  };

  const handleChange = (event) => {
    const fieldValue = event.target.value;
    const fieldName = event.target.name;
    // console.log(`${fieldName}: ${fieldValue}`)
    const newFormData = { ...formData, [fieldName]: fieldValue };
    setFormData(newFormData);
  };

  return (
    <Modal show={props.isOpen} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit this medication:</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form >
          <p id='med-name'>{formData.name}</p>

          <Form.Group className='mb-3'>
              <Form.Label>Time</Form.Label>
              <Form.Control
                placeholder={formData.time}
                size='sm'
                name='time'
                value={formData.time}
                onChange={handleChange}
              />   
          </Form.Group>

          <Form.Group className='mb-3'>
          <Form.Label>Dosage</Form.Label>
            <Form.Control
              placeholder={formData.dosage}
              size='sm'
              name='dosage'
              value={formData.dosage}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className='mb-3'>
          <Form.Label>Notes</Form.Label>
            <Form.Control
              placeholder={formData.notes}
              as='textarea'
              size='sm'
              name='notes'
              value={formData.notes}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Refill date</Form.Label>
            <Form.Control
              placeholder={formData.refillDate}
              size='sm'
              name='refillDate'
              // disabled={formData.isPrescription}
              value={formData.refillDate}
              onChange={handleChange}
            />
          </Form.Group>
          <Button id='delete-med-button'>Delete this medication</Button>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant='secondary' onClick={props.handleClose}>
          Close
        </Button>
        <Button id='submit-med-change' onClick={handleSubmit}>
          Submit changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditMedModal;
