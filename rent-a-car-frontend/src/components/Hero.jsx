import React, { Component } from "react";
import { Jumbotron, Button, Container } from "react-bootstrap";
import { I18nProvider, LOCALES } from "../i18n";
import { FormattedMessage, IntlProvider } from "react-intl";

class Hero extends Component {
  state = {
    heroStyle: {
      backgroundImage: "url(" + process.env.PUBLIC_URL + "/cars-hero.png" + ")",
      backgroundSize: "cover",
      backgroundPosition: "bottom",
      backgroundRepeat: "no-repeat",
      height: "60vh",
    },
  };
  render() {
    return (
      <Jumbotron style={this.state.heroStyle} className="text-center">
        <I18nProvider locale={localStorage.getItem("language")}>
          <Container className="align-middle">
            <h1>
              <FormattedMessage id="app_name" />
            </h1>
          </Container>
        </I18nProvider>
      </Jumbotron>
    );
  }
}

export default Hero;
