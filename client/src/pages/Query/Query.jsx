import React, { useContext, useRef, useState } from 'react';
import './Query.css';
import right_icon from '../../assets/right_icon.svg';
import down_icon from '../../assets/Vectordown.svg';
import QueryElement from '../../components/QueryElement/QueryElement';
import { capContext } from '../../store/store';


const Query = () => {
 

  const {FAQList} = useContext(capContext);
  const queryTitle = useRef("");
  const queryDesc = useRef("");


  const handleQuerySubmit = (e) => {
    e.preventDefault();
    const queryObj = {
      title: queryTitle.current.value,
      description: queryDesc.current.value,
    }
    // console.log(queryObj);
  }
  return (
    <div className='outer-query-container'>
      <div className='inner-query-container'>
      <div className='faq-list-container'>
        <h1 >Frequently Asked Questions</h1>
        <div >
          <ul className='faq-container-items'>
            {
              FAQList.map((faq, index)=>{
                return <QueryElement faq = {faq} key={index}/>
                })
              }
          </ul>
        </div>
      </div>
      <div className='main-faq-container'>
        <h1>Query</h1>
        <form className='new-faq-container' onSubmit={handleQuerySubmit}>
          <input ref={queryTitle} type="text" placeholder='Name'/>
          <textarea ref={queryDesc} name="" id="" cols="30" rows="10" placeholder='Type your query here...'></textarea>
          <div className='query-send'>
          <button>Send</button>
          <img src={right_icon} alt="" />
          </div>
        </form>
      </div>
      </div>
    </div>
  );
}

export default Query;
