import React, { Component } from "react";

const NotFound = (params) => {
  const heroStyle = {
    backgroundImage: "url(" + process.env.PUBLIC_URL + "/error-404.png" + ")",
    backgroundSize: "contain",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "60vh",
  };
  return <div className="not-found" style={heroStyle}></div>;
};

export default NotFound;
