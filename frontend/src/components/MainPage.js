import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBRipple
} from 'mdb-react-ui-kit';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../App.css';

export default function MainPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [photos, setPhotos] = useState([]);
  const [cookie, setCookie] = useState('');

  const filteredPhotos = photos.filter(photo =>
    photo.photographerName?.toLowerCase().includes(search.toLowerCase()) ||
    photo.title?.toLowerCase().includes(search.toLowerCase()) ||
    String(photo.mobile)?.includes(search) ||
    photo.description?.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/photography/${id}`);
      setPhotos(photos.filter(photo => photo._id !== id));
    } catch (error) {
      console.error('Error deleting photograph:', error);
    }
  };

  useEffect(() => {
    const name = Cookies.get('name');
    if (name) {
      setCookie(name);
      axios.get('http://localhost:8000/api/photography/photos')
        .then(response => setPhotos(response.data))
        .catch(error => console.error(error));
    } else {
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    Cookies.remove('name');
    navigate('/');
  };

  return (
    <div className="Container">
      <Navbar expand="lg" className="bg-dark">
        <Container fluid>
          <img className='m-2' src="/UG_logo.png" alt="logo" style={{height: "45px", width: "45px", margin: "0"}}/>
          <Navbar.Brand href="/main" className="fs-4 text-uppercase m-3 fw-normal text-white">PHOTOGRAPHY PORTFOLIO</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" style={{border: "2px solid white", background: "white"}} />
          <Navbar.Collapse id="navbarScroll" className= "text-center" >
            <Nav className="me-auto my-2 my-lg-0" navbarScroll>
              <Nav.Link href="/main" className="hoverClass text-white">Home</Nav.Link>
              <Nav.Link href="/upload" className="hoverClass text-white">Create post</Nav.Link>
            </Nav>
            {cookie && (
              <Nav className="ms-auto my-2 my-lg-0 d-flex align-items-center">
                <Button variant="primary" className="m-1 w-100" style={{color: "white", border: "grey", backgroundColor: "grey"}} disabled>
                  {cookie}
                </Button>
                <Button variant="danger" className="m-1 w-50" onClick={handleLogout}>
                  Logout
                </Button>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="background-wrapper d-flex justify-content-center">
        {cookie ? (
          <>
            <Container className="background-content m-5">
              <Form className="mb-4">
                <p>Total Photos: {filteredPhotos.length}</p>
                <Form.Group controlId="search">
                  <Form.Control
                    type="text"
                    placeholder="Search photos..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </Form.Group>
              </Form>
              <Row>
                {filteredPhotos.length > 0 ? (
                  filteredPhotos.map(photo => (
                    <Col xs={12} sm={12} md={12} lg={6} key={photo._id} className="mb-4">
                      <MDBCard className="card-equal-height" id="cards">
                        <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
                          <MDBCardImage src={`http://localhost:8000/uploads/${photo.image}`} fluid alt={photo.photographerName} className="card-image" />
                        </MDBRipple>
                        <MDBCardBody>
                          <MDBCardTitle><b>Title:</b> {photo.title}</MDBCardTitle>
                          <MDBCardText>
                            <b>Description:</b> {photo.description}
                          </MDBCardText>
                          <MDBCardText><b>Photographer:</b> {photo.photographerName}</MDBCardText>
                          <MDBCardText><b>Posted On:</b> {photo.date}</MDBCardText>
                          <MDBCardText><b>Mobile:</b> {photo.mobile}</MDBCardText>
                          <Button variant="danger" onClick={() => handleDelete(photo._id)}>
                            Delete
                          </Button>
                        </MDBCardBody>
                      </MDBCard>
                    </Col>
                  ))
                ) : (
                  <Col xs={12}>
                    <MDBCard className="Container">
                      <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
                        <MDBCardImage src='/homePage.jpg' fluid alt="photo" className="mt-3 rounded" />
                      </MDBRipple>
                      <MDBCardBody>
                        <MDBCardTitle>Hello, Photographers</MDBCardTitle>
                        <MDBCardText>
                          <b>The key to photography is photos</b>
                        </MDBCardText>
                        <MDBCardText>
                          Photography is more than just a means of capturing images; it’s a way to see and understand the world in a unique light. Every photograph is a window into the soul of the photographer, capturing moments that transcend time and place. It’s about finding beauty in the ordinary, and crafting a visual narrative that resonates with others. Each click of the shutter is a chance to freeze a fleeting moment, transforming it into a lasting piece of art that speaks to the heart and soul.
                        </MDBCardText>
                      </MDBCardBody>
                    </MDBCard>
                  </Col>
                )}
              </Row>
            </Container>
          </>
        ) : null}
      </div>
    </div>
  )
}
