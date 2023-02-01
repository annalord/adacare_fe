import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import AllNotes from './components/NotesWidget'

import './Home.css'



const Home = () => {
  return (
    <div> 
      <Container>
        <Row id='home-header'>
          <header>ADACARE</header>
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