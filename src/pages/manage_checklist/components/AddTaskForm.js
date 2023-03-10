import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './AddTaskForm.css';
import { postTaskApi } from '../../../api/ChecklistAPI.js';
import { useAuthContext } from '../../../hooks/useAuthContext';

const kDefaultFormState = {
  task: '',
  time: '',
};

const AddTaskForm = (props) => {
  const [formData, setFormData] = useState(kDefaultFormState);
  const { user } = useAuthContext();

  const handleChange = (event) => {
    const fieldValue = event.target.value;
    const fieldName = event.target.name;
    const newFormData = { ...formData, [fieldName]: fieldValue };

    setFormData(newFormData);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await postTaskApi(formData, user.id);
    setFormData(kDefaultFormState);
    props.getAllChecklistData();
  };

  return (
    <div id='addtask-form'>
      <Form onSubmit={handleSubmit}>
        <Form.Group className='mb-3' controlId='formTask'>
          <Form.Label className='label'>Task</Form.Label>
          <Form.Control
            type='text'
            name='task'
            value={formData.task}
            onChange={handleChange}
            maxLength='50'
            required
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formTime'>
          <Form.Label className='label'>Time</Form.Label>
          <Form.Control
            type='time'
            name='time'
            value={formData.time}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <div className='text-center'>
          <Button type='submit' id='addtask-button'>
            Add checklist item!
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddTaskForm;
