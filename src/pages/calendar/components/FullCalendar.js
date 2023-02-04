import { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import daygridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import './FullCalendar.css';
import { getEventsApi } from '../../../api/EventsAPI.js';
;
const Calendar = () => {
  
  const [events, setEvents] = useState([])

  const getAllEvents = async () => {
    const eventData = await getEventsApi();
    setEvents(eventData);
  };

  useEffect( () => {
    console.log('in useffect for calendar')
    getAllEvents();
  }, []);

  return (
    <div id="full-calendar">
      <FullCalendar 
        editable
        selectable
        events={events}
        headerToolbar={{
          start: "today prev next",
          end: "dayGridMonth dayGridWeek dayGridDay",
        }}
        plugins={[daygridPlugin, interactionPlugin]} 
        views={["dayGridMonth", "dayGridWeek", "dayGridDay"]}
      />
    </div>
  )
};

export default Calendar;