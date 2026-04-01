import React, { useRef, useState } from 'react';
import './QueryElement.css'
import right_icon from '../../assets/right_icon.svg';
import down_icon from '../../assets/Vectordown.svg';

const QueryElement = ({faq}) => {

    const [openDesc, setOpenDesc] = useState(false);
    const listStyleRef = useRef(null);
    const faqTitleRef = useRef(null);

   
    const handleDescClick = () => {
        if(openDesc){
            setOpenDesc(!openDesc);
            listStyleRef.current.style.backgroundColor = "#A2848B";
            faqTitleRef.current.style.fontWeight = "normal";
        }
        else{
            setOpenDesc(!openDesc);
            listStyleRef.current.style.backgroundColor = "#76515A";
            faqTitleRef.current.style.fontWeight = "bold";
        }
       
    };
    return (
        <div className='faq-outer-container'>
            {
                <li className='faq-inner-container'>
                    <div ref={listStyleRef} className='faq-item-circle'/>
                    <p ref={faqTitleRef}>{faq.title}</p>
                    <label onClick={handleDescClick} htmlFor={`description`}>
                        {openDesc ? <img src={down_icon} alt="" /> : <img src={right_icon} alt="" />}
                    </label>
                </li>
            }
            
            <div className={openDesc ? "open-desc" : "close-desc"} id={`description`}>
                        {faq.description}
            </div> 
        </div>
    );
}

export default QueryElement;
