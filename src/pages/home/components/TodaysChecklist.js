import { useState, useEffect } from 'react';
import './TodaysChecklist.css';
import ListGroup from 'react-bootstrap/ListGroup';
import TodaysChecklistItem from './TodaysChecklistItem';
import { getTodaysEventsApi } from '../../../api/EventsAPI';
import {
  getChecklistApi,
  patchSetTaskIncomplete,
} from '../../../api/ChecklistAPI';

// get today's date in YYYY-MM-DD format
const getTodaysDate = () => {
  let date = new Date();
  let month = '' + (date.getMonth() + 1);
  let day = '' + date.getDate();
  const year = date.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
};

// format daily task times without seconds and to AM PM
const formatTaskTime = (taskTime) => {
  const dateTime = new Date(`1970-01-01T${taskTime}`);
  let hours = dateTime.getHours();
  let minutes = dateTime.getMinutes();
  let amOrPm = 'AM';

  if (hours === 12) {
    amOrPm = 'PM';
  }
  if (hours === 0) {
    amOrPm = 'AM';
    hours = 12;
  }
  if (hours > 12) {
    hours -= 12;
    amOrPm = 'PM';
  }

  hours = hours.toString();
  minutes = minutes.toString().padStart(2, 0);

  return `${hours}:${minutes} ${amOrPm}`;
};

// change event start date/time to just time
const formatEventTime = (eventDateTime) => {
  const dateTime = new Date(eventDateTime);

  let hours = dateTime.getUTCHours();
  let minutes = dateTime.getUTCMinutes();
  let amOrPm = 'AM';

  if (hours > 12) {
    hours -= 12;
    amOrPm = 'PM';
  }

  hours = hours.toString();
  minutes = minutes.toString().padStart(2, 0);

  return `${hours}:${minutes} ${amOrPm}`;
};

const noChecklistItems = () => {
  return (
    <div id="no-checklist-items">
      <p>There are no checklist items to display.</p>
      <p>Go to the checklist or calendar page to get started!</p>
    </div>
  )
};

const TodaysChecklist = () => {
  const [todaysChecklistData, setTodaysChecklistData] = useState([]);

  const getTodaysChecklistData = async () => {
    const dailyData = await getChecklistApi();
    const todaysEventData = await getTodaysEventsApi(getTodaysDate());

    // combine checklist and event data into a single array with formatted times
    let allData = [];
    for (const task of dailyData) {
      allData.push({
        task: task.task,
        time: formatTaskTime(task.time),
        completed: task.completed,
        type: 'daily',
        id: task.id,
      });
    }
    for (const event of todaysEventData) {
      allData.push({
        task: event.title,
        time: formatEventTime(event.start),
        completed: event.completed,
        type: 'calendar',
        id: event.id,
      });
    }

    // function to convert times so that they can be sorted
    const conv = (time) => {
      const amPm = time.split(' ')[1].toLowerCase();
      const numTime = time.split(' ')[0].split(':');

      if (amPm === 'pm' && numTime[0] !== '12') {
        numTime[0] = parseInt(numTime[0], 10) + 12; //parseInt changes string to integer base 10
      }
      if (amPm === 'am' && numTime[0] === '12') {
        numTime[0] = parseInt(numTime[0], 10) - 12; //parseInt changes string to integer base 10
      }
      return parseInt(numTime.join(''), 10);
    };

    //sort allData in place by time
    allData.sort((a, b) => conv(a.time) - conv(b.time));

    //update state
    setTodaysChecklistData(allData);
  };

  useEffect(() => {
    getTodaysChecklistData();
  }, []);

  // reset all daily tasks to completed=false at midnight each night
  useEffect(() => {
    const interval = setInterval(async () => {
      const currentTime = new Date();
      const midnight = new Date(
        currentTime.getFullYear(),
        currentTime.getMonth(),
        currentTime.getDate() + 1,
        0,
        0,
        0
      );
      const timeToMidnight = midnight.getTime() - currentTime.getTime();
      // const timeToMidnight = -3;
      if (timeToMidnight < 0) {
        const dailyData = await getChecklistApi();
        for (const item of dailyData) {
          await patchSetTaskIncomplete(item.id);
        }
        await getTodaysChecklistData();
      }
    }, 1800000); // check every 30 minutes
    return () => clearInterval(interval);
  }, []);

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
    <div id='todays-checklist-container'>
      <p id='checklist-title'>Today's Checklist</p>
      {(getChecklistItemArray(todaysChecklistData).length === 0) && noChecklistItems()}
      <ListGroup>{getChecklistItemArray(todaysChecklistData)}</ListGroup>
    </div>
  );
};

export default TodaysChecklist;
