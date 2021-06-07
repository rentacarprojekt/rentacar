import React, { Component } from "react";
import { Jumbotron, Button, Container } from "react-bootstrap";

const Hero = (params) => {
  const heroStyle = {
    backgroundImage: "url(" + process.env.PUBLIC_URL + "/cars-hero.png" + ")",
    backgroundSize: "cover",
    backgroundPosition: "bottom",
    backgroundRepeat: "no-repeat",
    height: "60vh",
  };
  return (
    <Jumbotron style={heroStyle} className="text-center">
      <Container className="align-middle">
        <h1>Sample Text</h1>
        <p>
          <Button variant="primary">Learn more</Button>
        </p>
      </Container>
    </Jumbotron>
  );
};

export default Hero;
