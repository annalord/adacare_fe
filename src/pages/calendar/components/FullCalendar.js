// import { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import daygridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

const Calendar = () => {

  // const [events, setEvents] = useState([])

  return (
    <div id="full-calendar">
      <FullCalendar 
        editable
        selectable
        // events={events}
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