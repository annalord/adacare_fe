import FullCalendar from '@fullcalendar/react';
import daygridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import './FullCalendar.css';
;
const MyFullCalendar = (props) => {

  const onEventClick = (info) => {
    alert (`${info.event.title} : ${info.event.extendedProps.details}`)
  }

  const formatEventDetails = (events) => { 
    return events.map((event) => {
    return {...event, extendedProps: {details: event.details}}
    })};

    // console.log(formatEventDetails(props.events))

  return (
    <div className="full-calendar mt-3 ml-3 mb-3">
      <FullCalendar 
        events={formatEventDetails(props.events)}
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
        timeZone='UTC'
        eventClick={onEventClick}
      />
    </div>
  )
};

export default MyFullCalendar;