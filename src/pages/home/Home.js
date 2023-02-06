import { useContext, useEffect } from 'react';
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import AllNotes from './components/NotesWidget'
import ToDos from './components/ToDos'
import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import './Home.css'
import LogoutButton from '../../misc_components/LogoutButton'
import AdaCareBanner from '../../misc_components/AdaCareBanner'
import { UserContext } from '../../index.js'


const Home = () => {

  const [userState] = useContext(UserContext);

  return (
    <div> 
      <Container>

        <Row>
          <AdaCareBanner/>
        </Row>

        <Row>
          <Col id='nav-container'>

            <p> {userState.name} </p>

            <Link to={`/managetodos`}>
              <Button> Manage Daily To-Do Items </Button>
            </Link>

            <Link to={`/calendar`}>
              <Button> View and Update Calendar </Button>
            </Link>

            <Link to={`/managemeds`}>
              <Button> View and Manage Medications </Button>
            </Link>

            <LogoutButton/>

          </Col>

          <Col>
            <ToDos></ToDos>
          </Col>

          <Col>
            <AllNotes/>
          </Col>
        </Row>

      </Container>
    </div>
  )
};

export default Home;