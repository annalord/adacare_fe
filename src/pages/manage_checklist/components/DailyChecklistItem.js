import Button from 'react-bootstrap/Button';
import { deleteTaskApi } from '../../../api/ChecklistAPI.js'
import './DailyChecklistItem.css';


function formatTime(time) {
  let date = new Date("1970-01-01 " + time);
  return date.toLocaleTimeString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true});
};


const DailyChecklistItem = (props) => {

  const handleDeleteTask = async () => {
    await deleteTaskApi(props.id);
    props.getData();
  };

  return (
    <div>
      <div className='checklist-item-mng-topline'>
        <p className='checklist-time'>{formatTime(props.time)}</p>
        <Button onClick={handleDeleteTask} id='delete-button'>X</Button>
      </div>
      <div>{props.task}</div>

    </div>
  )
};

export default DailyChecklistItem;