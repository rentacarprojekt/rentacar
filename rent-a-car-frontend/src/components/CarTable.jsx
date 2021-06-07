import React, { Component } from "react";
import { Image, Table } from "react-bootstrap";

const CarTable = (params) => {
  const imageStyle = {
    width: "25%",
  };
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Image</th>
          <th>Model</th>
          <th>Manufacturer</th>
          <th>Type</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {params.items?.map((item) => (
          <tr key={item.model}>
            <td style={imageStyle}>
              <Image src={process.env.PUBLIC_URL + "/car-default.png"} fluid />
            </td>
            <td>{item.model}</td>
            <td>{item.manufacturer}</td>
            <td>{item.type}</td>
            <td>{item.price}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default CarTable;
