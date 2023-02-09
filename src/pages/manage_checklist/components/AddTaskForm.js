import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './AddTaskForm.css';
import { postTaskApi } from '../../../api/ChecklistAPI.js'


const kDefaultFormState = {
  task: '',
  time: ''
};

const AddTaskForm = (props) => {
  const [formData, setFormData] = useState(kDefaultFormState);

  const handleChange = (event) => {
    const fieldValue = event.target.value;
    const fieldName = event.target.name;
    const newFormData = { ...formData, [fieldName]: fieldValue };

    setFormData(newFormData);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await postTaskApi(formData);
    setFormData(kDefaultFormState);
    props.getAllChecklistData();
    }
  
  return (
    <div>
      <Form onSubmit={handleSubmit} id='login-form'>
        <Form.Group className='mb-3' controlId='formUsername'>
          <Form.Label className='label'>Task</Form.Label>
          <Form.Control
            type='text'
            name='task'
            value={formData.task}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formPassword'>
          <Form.Label className='label'>Time</Form.Label>
          <Form.Control
            type='time'
            name='time'
            value={formData.time}
            onChange={handleChange}
          />
        </Form.Group>

        <div className='text-center'>
          <Button type='submit' id='login-button'>Add checklist item!</Button>
        </div>
      </Form>
    </div>
  );
};

export default AddTaskForm;
