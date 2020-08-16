import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";

function App() {
  const [inputNumber, setInputNumber] = useState("2");
  const [thePrime, setThePrime] = useState("1");
  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setThePrime(" waiting, please click Find");
    setInputNumber(e.target.value);
  };
  // Todo: Put backend url into env vars
  const handleClick = () => {
    if (parseInt(inputNumber) <= 1) {
      alert("Only number which is greater than 1 is accepted");
      return;
    }
    fetch(process.env.REACT_APP_API + "?number=" + inputNumber)
      .then((response) => response.json())
      .then((data) => setThePrime(data.Data));
  };
  return (
    <div className="App fullwindow">
      <div className="title">
        <h1 style={{color: "blue"}}>PRIME</h1>
      </div>
      <div className="content">
        <div className="center">
          <div className="card">
            <Card
              bg={"light"}
              key={1}
              text={"light".toLowerCase() === "light" ? "dark" : "white"}
              style={{ width: "25rem", height: "15rem" }}
            >
              <Card.Header>Go get biggest prime ever</Card.Header>
              <Card.Body className="dflex column align-center justify-center">
                <Card.Title> Wow, Awesome </Card.Title>
                <Card.Text>
                  Input a number and get the biggest prime number that just be
                  beneath it
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
          <div className="d-flex flex-column form">
            <div className="d-flex align-items-center justify-content-between pb-5">
              <TextField
                id="standard-basic"
                label="Enter a number"
                variant="outlined"
                type="number"
                onChange={(e) => handleChange(e)}
              />
              <Button variant="contained" onClick={() => handleClick()}>
                Find
              </Button>
            </div>
            <div>
              <h6 style={{ textAlign: "center" }}>
                Your just-below-and-biggest prime number
              </h6>
            </div>
            <div>
              <h6 style={{ textAlign: "center" }}>for {inputNumber}</h6>
            </div>
            <div>
              <h6 style={{ textAlign: "center" }}>
                is <span style={{ color: "blue" }}>{thePrime}</span>
              </h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
