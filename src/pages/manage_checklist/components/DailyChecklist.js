import ListGroup from 'react-bootstrap/ListGroup';
import DailyChecklistItem from './DailyChecklistItem.js';


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
    <div>
      <ListGroup>{getTaskItemArray(props.checklistData)}</ListGroup>
    </div>
  );
};

export default DailyChecklist;
