import React from "react";
import "./SingleBanner.scss";
import { Link } from "react-router-dom";

const SingleBanner = ({ name }) => {
  return (
    <section className="single-banner">
      <div className="container">
        <h2>{name}</h2>
        <div className="breadcrumb">
          <span>
            <Link to="/">Home</Link>
          </span>
          <span> >> </span>
          <span>{name}</span>
        </div>
      </div>
    </section>
  );
};

export default SingleBanner;
