import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react';
import { deleteMedApi, putMedsApi } from '../../../api/MedsAPI.js';
import { useAuthContext } from '../../../hooks/useAuthContext';
import './EditMedModal.css';

const EditMedModal = (props) => {
  const kDefaultFormState = {
    name: props.currentMedData.med_name,
    time: props.currentMedData.time,
    dosage: props.currentMedData.dosage,
    notes: props.currentMedData.notes,
    isPrescription: props.currentMedData.is_prescription,
    // refillDate: (props.currentMedData.refill_date ??= '-'), //nullish coalesce assignment
    refillDate: props.currentMedData.refill_date
  };


  const [formData, setFormData] = useState(kDefaultFormState);
  const { user } = useAuthContext();

  useEffect(() => {
    setFormData(kDefaultFormState);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.isOpen]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormData(kDefaultFormState);
    await putMedsApi(formData, props.currentMedData.id, user.id);
    if (formData.isPrescription) {
      await props.getPrescriptionMeds();
    } else {
      await props.getOtcMeds();
    }
    props.handleClose();
  };

  const handleChange = (event) => {
    const fieldValue = event.target.value;
    const fieldName = event.target.name;
    const newFormData = { ...formData, [fieldName]: fieldValue };
    setFormData(newFormData);
  };

  const handleDelete = async (event) => {
    await deleteMedApi(props.currentMedData.id);
    if (formData.isPrescription) {
      await props.getPrescriptionMeds();
    } else {
      await props.getOtcMeds();
    }
    props.handleClose();
  };

  return (
    <Modal show={props.isOpen} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit this medication</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <p id='med-name'>{formData.name}</p>

          <Form.Group className='mb-3'>
            <Form.Label>Time</Form.Label>
            <Form.Control
              placeholder={formData.time}
              size='sm'
              name='time'
              value={formData.time}
              onChange={handleChange}
              maxLength="50"
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
              maxLength="50"
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
              maxLength="200"
            />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Refill date (if applicable)</Form.Label>
            <Form.Control
              placeholder={formData.refillDate}
              size='sm'
              name='refillDate'
              value={formData.refillDate}
              onChange={handleChange}
              maxLength="25"
            />
          </Form.Group>
          <Button id='delete-med-button' onClick={handleDelete}>Delete this medication</Button>
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
