import { useState, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Note from './Note';
import './NotesWidget.css';
import { getNotesApi, postNotesApi } from '../../../api/NotesAPI.js';
import { useAuthContext } from '../../../hooks/useAuthContext';

// helper function to reformat date and time after sorting
const formatDateTime = (dateTime) => {
  const date = new Date(dateTime);
  const dateFormatted = date.toLocaleDateString();
  const timeFormatted = date.toLocaleTimeString([], { timeStyle: 'short' });

  return `${dateFormatted} ${timeFormatted}`;
};

// for the new note form
const kDefaultFormState = {
  author: '',
  message: '',
};

const noNotes = () => {
  return (
    <div id='no-notes'>
      <p>No notes have been added yet!</p>
      <p>Use the form below to add the first note.</p>
    </div>
  );
};

const AllNotes = () => {
  const [notesData, setNotesData] = useState([]); // state for all notes data for that user
  const [formData, setFormData] = useState(kDefaultFormState); // state for new note form
  const { user } = useAuthContext();

  const getAllNoteData = async () => {
    const data = await getNotesApi();
    setNotesData(data);
  };

  useEffect(() => {
    // console.log('in useffect notes')
    getAllNoteData();
  }, []);

  const getNoteItemArray = (notes) => {
    //sort in chronological order
    notes.sort(
      (a, b) => new Date(b.date_time_created) - new Date(a.date_time_created)
    );

    return notesData.map((note) => (
      <ListGroup.Item key={note.id}>
        <Note
          message={note.message}
          author={note.author}
          dateTime={formatDateTime(note.date_time_created)}
        />
      </ListGroup.Item>
    ));
  };

  const handleChange = (event) => {
    const fieldValue = event.target.value;
    const fieldName = event.target.name;
    const newFormData = { ...formData, [fieldName]: fieldValue };

    setFormData(newFormData);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormData(kDefaultFormState);
    await postNotesApi(formData, user.id); //post note to database
    getAllNoteData(); // get data again, updates state to rerender
  };

  return (
    <div id='notes-container'>
      <h2 id='notes-title'>Notes</h2>
      {getNoteItemArray(notesData).length === 0 && noNotes()}
      <ListGroup id='notes-listgroup'>{getNoteItemArray(notesData)}</ListGroup>

      <div id='new-note-box'>
        <Form className='mt-2' id='new-note-form' onSubmit={handleSubmit}>
          <Form.Group className='mb-1 mt-1 name-field'>
            <Form.Control
              placeholder='Your name'
              size='sm'
              className='name-field'
              name='author'
              value={formData.author}
              onChange={handleChange}
              maxLength='20'
              required
            />
          </Form.Group>
          <Form.Group className='mb-1'>
            <Form.Control
              placeholder='Your note here'
              size='sm'
              as='textarea'
              className='message-field'
              name='message'
              value={formData.message}
              onChange={handleChange}
              maxLength='200'
              required
            />
          </Form.Group>
          <Button type='submit' size='sm' id='note-submit'>
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default AllNotes;
