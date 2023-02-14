import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import AllNotes from './components/NotesWidget'
import TodaysChecklist from './components/TodaysChecklist';
import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import './Home.css'
import LogoutButton from '../../misc_components/LogoutButton'
import AdaCareBanner from '../../misc_components/AdaCareBanner'
import { useAuthContext } from '../../hooks/useAuthContext.js';
import checklistIcon from '../../checklist.png'
import calendarIcon from '../../calendar.png'
import medsIcon from '../../meds.png'

// format today's date to display on screen
const formatDisplayDate = () => {
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const now = new Date();
  // console.log(now)
  return (
    days[now.getDay()] +
    ', ' +
    months[now.getMonth()] +
    ' ' +
    now.getDate() +
    ', ' +
    now.getFullYear()
  );
};


const Home = () => {

  const { user } = useAuthContext();

  return (
    <div> 
      <Container fluid>

        <Row className='border-bottom'>
          <AdaCareBanner/>
        </Row>

        <Row>
          <Col id='nav-container' className='col-3'>

            <p id="user_firstname"> {user.name} </p>

            <div>
                <img src={checklistIcon} alt='checklist icon' className='menu-icons'></img>
            </div>
            <Link to={`/managechecklist`}>
              <Button className='home-buttons'> Manage Daily Checklist</Button>
            </Link>

            <div>
                <img src={calendarIcon} alt='calendar icon' className='menu-icons'></img>
            </div>
            <Link to={`/calendar`}>
              <Button className='home-buttons'> View and Update Calendar</Button>
            </Link>


            <div>
                <img src={medsIcon} alt='meds icon' className='menu-icons'></img>
            </div>
            <Link to={`/managemeds`}>
              <Button className='home-buttons'> View and Manage Medications</Button>
            </Link>

            <LogoutButton/>

          </Col>

          <Col className='mt-3 mb-3' >
            <p id='todays-date' >{formatDisplayDate()}</p>
            <TodaysChecklist></TodaysChecklist>
          </Col>

          <Col className='mt-3 mb-3'>
            <AllNotes/>
          </Col>
        </Row>

      </Container>
    </div>
  )
};

export default Home;