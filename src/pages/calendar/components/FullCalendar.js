import FullCalendar from '@fullcalendar/react';
import daygridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import './FullCalendar.css';
import { useState } from 'react';
import EventInfoModal from './EventInfoModal';

const MyFullCalendar = (props) => {
  const [selectedEventInfo, setSelectedEventInfo] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleShow = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  const onEventClick = (info) => {
    // console.log(info);
    handleShow();
    setSelectedEventInfo(info);
  };

  const formatEventDetails = (events) => {
    return events.map((event) => {
      return {
        ...event,
        allDay: event.all_day,
        extendedProps: { details: event.details },
      };
    });
  };

  // console.log(formatEventDetails(props.events))

  return (
    <div className='full-calendar mt-3 ml-3 mb-3'>
      <FullCalendar
        events={formatEventDetails(props.events)}
        eventColor='#a6032f'
        editable
        selectable
        droppable
        headerToolbar={{
          start: 'today prev next',
          center: 'title',
          end: 'dayGridMonth dayGridWeek dayGridDay',
        }}
        plugins={[daygridPlugin, interactionPlugin]}
        views={['dayGridMonth', 'dayGridWeek', 'dayGridDay']}
        titleFormat={{ year: 'numeric', month: 'long', day: 'numeric' }}
        timeZone='America/Denver'
        eventClick={onEventClick}
      />
      <EventInfoModal
        isOpen={isModalOpen}
        handleClose={handleClose}
        getAllEvents={props.getAllEvents}
        selectedEventInfo={selectedEventInfo}
      />
    </div>
  );
};

export default MyFullCalendar;
