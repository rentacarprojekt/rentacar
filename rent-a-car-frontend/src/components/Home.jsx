import React, { Component } from "react";
import { Container } from "react-bootstrap";
import CarFilter from "./CarFilter";
import CarTable from "./CarTable";
import Pagination from "./common/Pagination";
import Hero from "./Hero";
import getCars from "../fakeRepository/cars";

class Home extends Component {
  state = {
    currentPage: 1,
    pageSize: 4,
    cars: getCars(),
  };
  render() {
    const { cars, currentPage, pageSize } = this.state;
    const carsToDisplay = [...cars].splice(
      (currentPage - 1) * pageSize,
      pageSize
    );
    return (
      <React.Fragment>
        <Hero />
        <Container>
          <CarFilter />
          <CarTable items={carsToDisplay} />
          <Pagination
            itemsCount={cars.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </Container>
      </React.Fragment>
    );
  }
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
}

export default Home;
