import React, { useContext } from "react";
import "./FAQ.css";
import QueryElement from "../QueryElement/QueryElement";
import { capContext } from "../../store/store";

function FAQ() {
  const { FAQList } = useContext(capContext);
  return (
    <div className="faq-container">
      <div className="title">
        <h2>FAQs</h2>
      </div>
      <div className="dropdown">
        <ul className="faq-container-items">
          {FAQList.map((faq, index) => {
            return <QueryElement faq={faq} key={index} />;
          })}
        </ul>
      </div>
    </div>
  );
}

export default FAQ;
