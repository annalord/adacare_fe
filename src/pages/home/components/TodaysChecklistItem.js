import { patchCompleteTaskApi } from '../../../api/ChecklistAPI.js'
import { patchCompleteEventApi } from '../../../api/EventsAPI.js';
import './TodaysChecklistItem.css';



function formatTime(time) {
  let date = new Date("1970-01-01 " + time);
  return date.toLocaleTimeString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true});
};


const TodaysChecklistItem = (props) => {

  const handleCheckOffTask = async () => {
    if (props.type === 'daily') {
      await patchCompleteTaskApi(props.id, !props.completed)
    } else {
      await patchCompleteEventApi(props.id, !props.completed)
    }

    props.getData();
  };

  return (
    <div className='checklist-item'>
        <div className='checklist-item-topline'>
          <p className='checklist-item-time'>{formatTime(props.time)}</p>
          <button onClick={handleCheckOffTask} id='complete-button'>
          {props.completed ? '✅' : '⃝' }
          </button>
        </div>

        <p>{props.task}</p>

    </div>
  )
};

export default TodaysChecklistItem;
