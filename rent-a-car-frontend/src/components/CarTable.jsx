import React, { Component } from "react";
import { Image, Table } from "react-bootstrap";
import { I18nProvider, LOCALES } from "../i18n";
import { FormattedMessage, IntlProvider } from "react-intl";

const CarTable = (params) => {
  const imageStyle = {
    width: "25%",
  };
  return (
    <I18nProvider locale={localStorage.getItem("language")}>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              <FormattedMessage id="image" />
            </th>
            <th>
              <FormattedMessage id="model" />
            </th>
            <th>Manufacturer</th>
            <th>Type</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {params.items?.map((item) => (
            <tr key={item.model}>
              <td style={imageStyle}>
                <Image
                  src={process.env.PUBLIC_URL + "/car-default.png"}
                  fluid
                />
              </td>
              <td>{item.model}</td>
              <td>{item.manufacturer}</td>
              <td>{item.type}</td>
              <td>{item.price}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </I18nProvider>
  );
};

export default CarTable;
