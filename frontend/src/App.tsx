import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));
function App() {
  const [inputNumber, setInputNumber] = useState("2");
  const [thePrime, setThePrime] = useState("2");
  const handleChange = (e : React.ChangeEvent<HTMLTextAreaElement|HTMLInputElement>) => {
                setThePrime(" waiting, please click Find");
                setInputNumber(e.target.value)};
  const handleClick = () => fetch('http://localhost:8080?number=' + inputNumber)
                                  .then(response => response.json())
                                  .then(data => setThePrime(data.Data));
  return (
    <div className="App">
      <div className="center fullwindow">
        <div className="pr-3">
          <Card
            bg={"light"}
            key={1}
            text={"light".toLowerCase() === "light" ? "dark" : "white"}
            style={{ width: "25rem", height: "15rem" }}
            className="mb-2"
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
        <div className="d-flex flex-column">
          <div className="d-flex align-items-center justify-content-between pb-5">
            <TextField
              id="standard-basic"
              label="Enter a number"
              variant="outlined"
              onChange={(e) => handleChange(e)}
            />
            <Button variant="contained" onClick={()=> handleClick()}>Find</Button>
          </div>
          <div>
            <h6 style={{ textAlign: "center" }}>
              Your just-below-and-biggest prime number 
            </h6>
          </div>
          <div>
            <h6 style={{ textAlign: "center" }}>
              for {inputNumber} is <span style={{color: "blue"}}>{thePrime}</span>
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
