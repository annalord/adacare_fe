import ListGroup from 'react-bootstrap/ListGroup';
import DailyChecklistItem from './DailyChecklistItem.js';
import './DailyChecklist.css'

const noChecklistItems = () => {
  return (
    <div id="no-checklist-items">
      <p>There are no daily tasks to display.</p>
      <p>Add a task to get started!</p>
    </div>
  )
};

const DailyChecklist = (props) => {

  const getTaskItemArray = (data) => {
    //sort by time
    data.sort((a, b) => new Date("1970-01-01 " + a.time) - new Date("1970-01-01 " + b.time));

    return data.map((task) => (
      <ListGroup.Item key={task.id}>
        <DailyChecklistItem
        id={task.id}
        task={task.task}
        time={task.time}
        completed={task.is_complete}
        getData={props.getAllChecklistData}
        />
      </ListGroup.Item>
    ));
  };
  
  return (
    <div id='mng-checklist-container'>
      <p id='checklist-description'>These tasks will appear each day in "Today's Checklist" on the home page. You can add a new daily task or press "X" to delete. </p>
      <div id='checklist-mng'>
        {(getTaskItemArray(props.checklistData).length === 0) && noChecklistItems()}
        <ListGroup>{getTaskItemArray(props.checklistData)}</ListGroup>
      </div>
    </div>
  );
};

export default DailyChecklist;
