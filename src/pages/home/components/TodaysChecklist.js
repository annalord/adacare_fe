import { useState, useEffect } from 'react';
import './TodaysChecklist.css'
import ListGroup from 'react-bootstrap/ListGroup';
import TodaysChecklistItem from './TodaysChecklistItem';
import { getTodaysEventsApi } from '../../../api/EventsAPI';
import { getChecklistApi } from '../../../api/ChecklistAPI';


// get today's date in YYYY-MM-DD format
const getTodaysDate = () => {
  const date = new Date()
  let month = '' + (date.getMonth() + 1)
  let day = '' + date.getDate()
  const year = date.getFullYear()

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
};

// format daily task times without seconds and to AM PM
const formatTaskTime = (taskTime) => {
  const dateTime = new Date(`1970-01-01T${taskTime}`);
  let hours = dateTime.getHours();
  let minutes = dateTime.getMinutes();
  let amOrPm = 'AM';
  
  if (hours > 12) {
    hours -= 12;
    amOrPm = 'PM';
  }
  
  hours = hours.toString();
  minutes = minutes.toString().padStart(2,0);
  
  return `${hours}:${minutes} ${amOrPm}`;
};

// change event start date/time to just time
const formatEventTime = (eventDateTime) => {
  const dateTime = new Date(eventDateTime)

  let hours = dateTime.getHours();
  let minutes = dateTime.getMinutes();
  let amOrPm = 'AM';
  
  if (hours > 12) {
    hours -= 12;
    amOrPm = 'PM';
  }
  
  hours = hours.toString()
  minutes = minutes.toString().padStart(2,0); 
  
  return `${hours}:${minutes} ${amOrPm}`;
};

// format date to display on screen
const formatDisplayDate = () => {
  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var now = new Date(getTodaysDate());
  return (days[now.getDay()] + ', ' + months[now.getMonth()] + ' ' + now.getDate() + ', ' + now.getFullYear());
}



const TodaysChecklist = () => {

  const [todaysChecklistData, setTodaysChecklistData] = useState([]); 

  const getTodaysChecklistData = async () => {
    const dailyData = await getChecklistApi();
    const todaysEventData = await getTodaysEventsApi(getTodaysDate())

    // combine checklist and event data into a single array with formatted times
    let allData = [];
    for (const task of dailyData) {
      allData.push({
        task: task.task,
        time: formatTaskTime(task.time),
        completed: task.completed,
        type: 'daily',
        id: task.id
      })
    }
    for (const event of todaysEventData) {
      allData.push({
        task: event.title,
        time: formatEventTime(event.start),
        completed: event.completed,
        type: 'calendar', 
        id: event.id
      })
    }

    // function to convert times so that they can be sorted
    const conv = (time) => {
      const amPm = time.split(" ")[1].toLowerCase()
      const numTime = time.split(" ")[0].split(":");

      if (amPm === "pm") {
        numTime[0] = parseInt(numTime[0], 10) + 12; //parseInt changes string to integer base 10
      }
      return parseInt(numTime.join(''), 10);
    };

    //sort allData in place by time
    allData.sort((a, b) => conv(a.time) - conv(b.time));

    //update state
    setTodaysChecklistData(allData)
  };

  useEffect(() => {
    getTodaysChecklistData();
    }
  , []);


  const getChecklistItemArray = (data) => {

    return data.map((item, index) => (
      <ListGroup.Item key={index}>
        <TodaysChecklistItem
        task={item.task}
        time={item.time}
        completed={item.completed}
        type={item.type}
        getData={getTodaysChecklistData}
        id={item.id}
        />
      </ListGroup.Item>
    ));
  };
  
  return (
    <div>
      <p id='checklist-date'>{formatDisplayDate()}</p>
      <ListGroup>{getChecklistItemArray(todaysChecklistData)}</ListGroup>
    </div>
  );
};

export default TodaysChecklist;

