import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { React, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { getMoviesList, getMovieID } from "./Controller/MoviesController";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import CardGroup from "react-bootstrap/CardGroup";
import Spinner from "react-bootstrap/Spinner";

const App = () => {
  const [searchBox, setSearchBox] = useState("");
  const [moviesList, setMoviesList] = useState([]);
  const [movieSelect, setMovieSelect] = useState(null);
  const [spinnerList, setSpinnerList] = useState(false);
  const [spinnerMovie, setSpinnerMovie] = useState(false);

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            />
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Buscar"
                className="me-2"
                aria-label="Search"
                onChange={async (object) => {
                  const value = object.target.value;
                  setSearchBox(value);
                }}
                value={searchBox}
              />
              <Button
                variant="outline-success"
                Text
                onClick={async () => {
                  setSpinnerList(true);
                  await getMoviesList(searchBox)
                    .then((res) => {
                      setMoviesList(res);
                      setSpinnerList(false);
                    })
                    .catch((err) => {
                      console.error("Error: " + err);
                      setSpinnerList(false);
                    });
                }}
              >
                Buscar
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/**/}
      {!spinnerMovie ? (
        movieSelect ? (
          <CardGroup>
            <Card>
              <Card.Body>
                <Card.Title>FilmAffinity</Card.Title>
                <Card.Text>{movieSelect.filmAffinity}</Card.Text>
              </Card.Body>
            </Card>
            <Card>
              <Card.Body>
                <Card.Title>imDb</Card.Title>
                <Card.Text>{movieSelect.imDb}</Card.Text>
              </Card.Body>
            </Card>
            <Card>
              <Card.Body>
                <Card.Title>Metacritic</Card.Title>
                <Card.Text>{movieSelect.metacritic}</Card.Text>
              </Card.Body>
            </Card>
            <Card>
              <Card.Body>
                <Card.Title>RottenTomatoes</Card.Title>
                <Card.Text>{movieSelect.rottenTomatoes}</Card.Text>
              </Card.Body>
            </Card>
            <Card>
              <Card.Body>
                <Card.Title>theMovieDb</Card.Title>
                <Card.Text>{movieSelect.theMovieDb}</Card.Text>
              </Card.Body>
            </Card>
          </CardGroup>
        ) : null
      ) : (
        <Spinner animation="border" variant="primary" />
      )}
      {/* */}
      <br /> <br />
      <Row xs={1} md={3} className="g-4">
        {!spinnerList ? (
          moviesList.map((item) => (
            <Col>
              <Card
                id={item.id}
                onClick={async (obj) => {
                  const value = obj.target.id;
                  setSpinnerMovie(true);
                  await getMovieID(value)
                    .then((obj) => {
                      console.log(obj);
                      setMovieSelect(obj);
                      setSpinnerMovie(false);
                    })
                    .catch((err) => {
                      console.error("Error: " + err);
                      setMovieSelect(null);
                      setSpinnerMovie(false);
                    });
                }}
              >
                <Card.Img variant="top" id={item.id} src={item.image} />
                <Card.Body id={item.id}>
                  <Card.Title id={item.id}>{item.title}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Spinner animation="border" variant="primary" />
        )}
      </Row>
    </div>
  );
};

export default App;
