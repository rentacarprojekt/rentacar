import React, { Component } from "react";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";

const CarFilter = (props) => {
  const formStyle = {
    justifyContent: "center",
  };
  return (
    <Form inline style={formStyle}>
      <Form.Label htmlFor="model" srOnly>
        Model
      </Form.Label>
      <Form.Control className="mb-2 mr-sm-2" id="model" placeholder="Golf 3" />
      <Form.Label htmlFor="manufacturer" srOnly>
        Username
      </Form.Label>
      <InputGroup className="mb-2 mr-sm-2">
        <FormControl id="manufacturer" placeholder="VW" />
      </InputGroup>
      <InputGroup className="mb-2 mr-sm-2">
        <Form.Control
          as="select"
          className="my-1 mr-sm-2"
          id="inlineFormCustomSelectPref"
          custom
        >
          <option value="0">Type</option>
          <option value="1">Coupe</option>
          <option value="2">Exotic</option>
          <option value="3">Caravan</option>
        </Form.Control>
      </InputGroup>
      <Button type="submit" className="mb-2">
        Filter
      </Button>
    </Form>
  );
};

export default CarFilter;
