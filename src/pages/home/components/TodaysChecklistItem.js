import { patchCompleteTaskApi } from '../../../api/ChecklistAPI.js'
import { patchCompleteEventApi } from '../../../api/EventsAPI.js';
import './TodaysChecklistItem.css';
import unchecked from '../../../unchecked-checkbox.png'
import checked from '../../../checked-checkbox.png'


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
          <p className='checklist-item-time'>{props.time}</p>
          <button onClick={handleCheckOffTask} id='complete-button'>
          {props.completed ? 
            <img src={checked} alt='checked checkbox' className='checklist-icons'></img> :
            <img src={unchecked} alt='unchecked checkbox' className='checklist-icons'></img>}
          </button>
        </div>

        <p>{props.task}</p>

    </div>
  )
};

export default TodaysChecklistItem;
