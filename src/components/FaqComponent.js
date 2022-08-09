import * as React from "react";
import { BsPlus } from "react-icons/bs";
import "./style.scss";
import { UserContext } from "../App";

const FaqComponent = ({ data, dir }) => {
  const value = React.useContext(UserContext);

  const [isShow, setIsShow] = React.useState(false);
  const handleShow = () => {
    setIsShow(!isShow);
  };
  return (
    <div
      className={`faq-container ${dir}`}
      style={{
        backgroundColor: isShow
          ? value.collection.background
          : value.collection.foreground,
      }}
    >
      <div className="faq-wrapper">
        <div
          className="faq-header"
          onClick={() => {
            handleShow();
          }}
        >
          <p style={{ color: isShow ? "black" : "white" }}>
            {value.collection[data[0]]}
          </p>
          <button type="button" onClick={handleShow}>
            {
              <BsPlus
                className={`open-content ${isShow ? "active" : ""}`}
                style={{ color: isShow ? "black" : "white" }}
              />
            }
          </button>
        </div>
        {isShow && (
          <div className="faq-content">
            <p>{value.collection[data[1]]}</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default FaqComponent;
