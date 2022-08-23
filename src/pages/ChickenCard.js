import * as React from "react";
import "./styles/chicken.scss";
import { UserContext } from "../App";

const ChickenCard = () => {
  const value = React.useContext(UserContext);

  return (
    <div className="chickencard-container">
      <div className="container">
        <div className="ring1"></div>
        <div className="ring2"></div>
        <h1>{`${value.collection.collection} Cards`}</h1>
        <div className="chicken-images">
          <div className="chicken">
            <p>{value.collection.collection}</p>
            <img
              src={`./config/${value.collection.sample_img1}`}
              alt="bulk-chicken"
            />
          </div>
          <div className="chicken">
            <p>{value.collection.collection}</p>
            <img
              src={`./config/${value.collection.sample_img2}`}
              alt="bulk-chicken"
            />
          </div>
          <div className="chicken">
            <p>{value.collection.collection}</p>
            <img
              src={`./config/${value.collection.sample_img3}`}
              alt="bulk-chicken"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChickenCard;
