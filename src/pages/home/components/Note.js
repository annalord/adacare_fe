import './Note.css'

const Note = (props) => {
  return (
    <div className='note'>
      <div className='name-time'>
        <p>{props.dateTime}</p>
        <p>{props.author}</p>
      </div>
      <p className='message'> {props.message} </p>
    </div>
  )
};

export default Note;