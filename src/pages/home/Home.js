import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import AllNotes from './components/NotesWidget'

import './Home.css'
import LogoutButton from '../../misc_components/LogoutButton'

import bird from '../../littlebird.png'

const Home = () => {
  return (
    <div> 
      <Container>
        <Row id='home-header'>
          <img src={bird} alt="cardinal drawing" id='bird'></img>
          <h1 id="home-h1">Adacare</h1>
          <img src={bird} alt="cardinal drawing" id='bird'></img>
        </Row>

        <Row>
          <Col>
            Nav Options
          </Col>
          <Col>
            to doooo
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