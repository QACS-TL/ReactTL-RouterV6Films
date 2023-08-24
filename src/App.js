import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom'
import { Nav, Navbar,  NavDropdown, Form, Button } from "react-bootstrap";

import { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";

// pages
import Home from './pages/Home'
import About from './pages/About'
import Films from './pages/Films'
import FilmDetails from './pages/FilmDetails'


const App = () => {
  //const [cartIsEmpty] = useState(false);
  const [cartIsEmpty, setCartIsEmpty] = useState(true)
  
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="/home" >
              <h1>The Wonkymotion Film Company</h1>
          </Navbar.Brand  >
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav" >
              <Nav className="mr-auto">
                <Nav.Link to="/" as={Link}>Home</Nav.Link>
              </Nav>
              <Nav className="mr-auto">
                <NavDropdown title="Films" id="collasible-nav-dropdown">
                  <NavDropdown.Item to="/films" as={Link}>Films</NavDropdown.Item>
                  <NavDropdown.Item to="/most_popular" as={Link}>
                    Best Seller
                  </NavDropdown.Item>
                  <NavDropdown.Item to="/about/promotions" as={Link}>Promotions</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <Form.Check 
                    type={'checkbox'}
                    id='default-checkbox'
                    defaultChecked={true}
                    label='Cart is Empty'
                    onClick={(e) => {console.log(e.target.checked); setCartIsEmpty(!e.target.checked);  }}
                  />
                  <NavDropdown.Item to="/checkout" as={Link}>
                    Check out
                </NavDropdown.Item>
              </NavDropdown>
              </Nav>
              <Nav className="mr-auto">
                <Nav.Link to="/about" as={Link}>About</Nav.Link>
              </Nav>
            </Navbar.Collapse>
        </Navbar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about/*" element={<About />} />
          <Route path="/films" element={<Films />} />
          <Route path="/films/id/:id/*" element={<FilmDetails />} />
          <Route path="/most_popular" element={(
            <div className="content">
              <h2>
                UK's Most Popular Film
              </h2>
              <h3>Thunderbirds Are Go!</h3>
              <img src={("/Thunderbirds.jpg")} alt={"Thunderbirds Are Go"} width="400"  />
                <Link to={"https://www.youtube.com/watch?v=4q6z1FMS_mM"}>
                  <p>Thunderbirds</p>
                </Link>
            </div>
          )} />
          <Route path="/redirect" element={<Navigate to="/about" />} />
          <Route 
            path="/checkout" 
            element={cartIsEmpty ? <Navigate to="/films" />: <div className="content"><p>CheckOut</p></div>} 
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App