import { useState, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { getChecklistApi, deleteTaskApi } from '../../../api/ChecklistAPI.js'
import DailyChecklistItem from './DailyChecklistItem.js';




const DailyChecklist = () => {

  const [checklistData, setChecklistData] = useState([]); 

    const getAllChecklistData = async () => {
    const data = await getChecklistApi();
    setChecklistData(data)
  };

  useEffect(() => {
    getAllChecklistData();
    }
  , []);



  const getNoteItemArray = (data) => {
    //sort in chronological order 
    // notes.sort((a, b) => new Date(b.date_time_created) - new Date(a.date_time_created));

    return data.map((task) => (
      <ListGroup.Item key={task.id}>
        <DailyChecklistItem
        id={task.id}
        task={task.task}
        time={task.time}
        completed={task.is_complete}
        getData={getAllChecklistData}
        />
      </ListGroup.Item>
    ));
  };
  

  return (
    <div>
      <ListGroup>{getNoteItemArray(checklistData)}</ListGroup>
    </div>
  );
};

export default DailyChecklist;
