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
    <div className="full-calendar">
      <FullCalendar 
        events={events}
        eventColor= '#a6032f'
        editable
        selectable
        headerToolbar={{
          start: "today prev next",
          center: 'title',
          end: "dayGridMonth dayGridWeek dayGridDay",
        }}
        plugins={[daygridPlugin, interactionPlugin]} 
        views={["dayGridMonth", "dayGridWeek", "dayGridDay"]}
        titleFormat={ {year: 'numeric', month: 'long', day: 'numeric'} }
      />
    </div>
  )
};

export default Calendar;