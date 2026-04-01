import React, { useContext } from 'react';
import './ProfileContactElement.css'
const ProfileContactElement = ({name, por, email, insta}) => {
  return (
      <div className="outer-contact-container">
            <div className="inner-contact-container">
                <div>
                    <p>{name}</p>
                </div>
                <div>
                    <p>{por}</p>
                </div>
                <div>
                    <a target='_blank' href={`mailto:${email}`}>Send Email</a>
                </div>
                <div>
                    <a  target="_blank" href={`https://www.instagram.com/${insta}`}>Message on Insta</a>
                </div>
                
            </div>
        </div>
  );
}

export default ProfileContactElement;
