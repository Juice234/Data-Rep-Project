import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Content } from './components/content';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import {Read} from './components/read';
import { Checkout } from './components/checkout';
import { Create } from './components/create';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
import backgroundImage from "./Screenshot_42.png";


class App extends React.Component {
  render() {
    return (
      <Router>
      <div className="App">
        <Navbar bg="dark" variant="dark">
          <Container>
          <Navbar.Brand href="/"> <img src={backgroundImage} height="40px" width='110px'/> </Navbar.Brand>        
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/read">Auction</Nav.Link>
              <Nav.Link href="/create">Sell</Nav.Link>
              <Nav.Link href="/checkout">
    <FontAwesomeIcon icon={faShoppingBasket} size="lg" />
  </Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      <Routes>
        <Route path='/' element={<Content></Content>}></Route>
        <Route path='/read' element={<Read></Read>}></Route>
        <Route path='/create' element={<Create></Create>}></Route>
        <Route path='/checkout' element={<Checkout></Checkout>}></Route>
      </Routes>
      </div>
      </Router>
    );
  }
}

export default App;
