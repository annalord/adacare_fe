// import './Note.css'
import Button from 'react-bootstrap/Button';
import { deleteTaskApi } from '../../../api/ChecklistAPI.js'



function formatTime(time) {
  let date = new Date("1970-01-01 " + time);
  return date.toLocaleTimeString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true});
};

const DailyChecklistItem = (props) => {

  const handleDeleteTask = async (id) => {
    await deleteTaskApi(props.id);
    props.getData();
  };

  return (
    <div className='note'>
        <div>{props.task}</div>
        <div>{formatTime(props.time)}</div>
        <Button onClick={handleDeleteTask}>X</Button>
    </div>
  )
};

export default DailyChecklistItem;