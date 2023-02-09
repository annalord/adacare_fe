import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import bird from '../littlebird-nobg.png';
import './NavBar.css';

function NavBar() {
  return (
    <Navbar bg='light' expand='lg' relative='top'>
      <Container>
        <Navbar.Brand href='#home'>
          <img src={bird} alt='cardinal drawing' id='navbird'></img>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link href='/home'>Home</Nav.Link>
            <Nav.Link href='/calendar'>Calendar</Nav.Link>
            <Nav.Link href='/managemeds'>Medications</Nav.Link>
            <Nav.Link href='/managechecklist'>Daily Checklist</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;