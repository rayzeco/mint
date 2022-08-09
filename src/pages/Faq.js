import * as React from "react";
import FaqComponent from "../components/FaqComponent";
import "./styles/faq.scss";
import { UserContext } from "../App";

function sliceIntoChunks(arr, chunkSize) {
  const res = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize);
    res.push(chunk);
  }
  return res;
}
const Faq = () => {
  const value = React.useContext(UserContext);

  const faqKey = Object.keys(value.collection).filter(
    (key) => key.search("faq_") > -1
  );
  const secondKey = faqKey.splice(0, Math.floor(faqKey.length / 2));

  return (
    <div className="faq-page-container" id="faq">
      <div className="faq-header-title container">
        <h1>Frequently Asked Questions</h1>
      </div>
      <div className="faq-body-container">
        <div className="faq-body">
          {sliceIntoChunks(secondKey, 2).map((data, index) => (
            <FaqComponent data={data} key={`faq-${index}`} dir="left" />
          ))}
        </div>
        <div className="faq-body">
          {sliceIntoChunks(faqKey, 2).map((data, index) => (
            <FaqComponent data={data} key={`faq-${index}`} dir="right" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faq;
