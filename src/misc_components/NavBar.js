import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import bird from '../littlebird-nobg.png';
import './NavBar.css';
import { useLocation } from "react-router-dom";

function NavBar() {

  const locationPath = useLocation().pathname;

  return (
    <Navbar bg='light' expand='lg' relative='top' className='border-bottom'>
      <Container>
        <Navbar.Brand href='#home'>
          <img src={bird} alt='cardinal drawing' id='navbird'></img>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link href='/home'>Home</Nav.Link>
            {locationPath !== "/calendar" && <Nav.Link href='/calendar'>Calendar</Nav.Link>}
            {locationPath !== "/managemeds" && <Nav.Link href='/managemeds'>Medications</Nav.Link>}
            {locationPath !== "/managechecklist" && <Nav.Link href='/managechecklist'>Daily Checklist</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
