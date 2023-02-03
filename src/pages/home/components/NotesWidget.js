import { useState, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Note from './Note';
import './NotesWidget.css';

import {getNotesApi, postNotesApi} from '../../../api/NotesAPI.js'

const DUMMY_NOTES = [
  {
    id: 1,
    author: 'Anna',
    message: 'merry christmas',
    date_time_created: '2022-12-25 22:20:39.511096-07',
  },
  {
    id: 2,
    author: 'Emily',
    message: 'benny had surgery',
    date_time_created: '2023-01-29 18:20:39.511096-07',
  },

  {
    id: 3,
    author: 'Walker',
    message: 'im at work',
    date_time_created: '2023-02-01 19:20:39.511096-07',
  },
  {
    id: 4,
    author: 'Julie',
    message: 'dont forget to water the plants!',
    date_time_created: '2023-04-01 18:20:39.511096-07',
  },
  {
    id: 5,
    author: 'Julie',
    message:
      'laksjdflkajsflakjsdflajsdfjfkdjfjfkdfj apple orange tomato pumpkin banana apple orange tomato pumpkin banana apple orange tomato pumpkin banana',
    date_time_created: '2023-01-23 18:20:39.511096-07',
  },
  {
    id: 6,
    author: 'Julie',
    message: 'hellloooooo',
    date_time_created: '2023-01-25 18:20:39.511096-07',
  },
  {
    id: 7,
    author: 'Julie',
    message: 'this is a note from julie',
    date_time_created: '2023-01-29 18:30:39.511096-07',
  },
  {
    id: 8,
    author: 'mini',
    message: 'this is a note from a little dog',
    date_time_created: '2022-12-29 18:20:39.511096-07',
  },
];

const formatDateTime = (dateTime) => {
  const date = new Date(dateTime);
  const dateFormatted = date.toLocaleDateString();
  const timeFormatted = date.toLocaleTimeString([], {timeStyle: 'short'});

  return `${dateFormatted} ${timeFormatted}`;
};

const kDefaultFormState = {
  author: "",
  message: "",
};


const AllNotes = () => {

  const [notesData, setNotesData] = useState({});

  useEffect(() => {
    const notes = getNotesApi();
    setNotesData(notes);
    }
  , []);


  const getNoteItemArray = () => {

    DUMMY_NOTES.sort((a, b) => new Date(b.date_time_created) - new Date(a.date_time_created));

    return DUMMY_NOTES.map((note) => (
      <ListGroup.Item key={note.id} id='notes-listgroupitem'>
        <Note
          message={note.message}
          author={note.author}
          dateTime={formatDateTime(note.date_time_created)}
        />
      </ListGroup.Item>
    ));
  };

  const [formData, setFormData] = useState(kDefaultFormState);
  
    const handleChange = (event) => {
      const fieldValue = event.target.value;
      const fieldName = event.target.name;
      const newFormData = { ...formData, [fieldName]: fieldValue };
  
      setFormData(newFormData);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      postNotesApi(formData);
      console.log(formData);
      setFormData(kDefaultFormState);
    };


  return (
    <div id='notes-container' style={{ fontSize: '.75rem' }}>

      <h2 id='notes-title'>Notes</h2>

      <ListGroup id='notes-listgroup'>{getNoteItemArray()}</ListGroup>

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
            />
          </Form.Group>
          <Button variant='light btn-outline-danger' type='submit' size='sm'>
            Submit
          </Button>
        </Form>
      </div>

    </div>
  );
};

export default AllNotes;
