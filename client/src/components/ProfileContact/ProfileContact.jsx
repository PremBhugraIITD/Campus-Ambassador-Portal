import React, { useContext } from 'react';
import './ProfileContact.css'
import { capContext } from '../../store/store';
import ProfileContactElement from '../ProfileContactElement/ProfileContactElement';

const ProfileContact = () => {

  const {contacts} = useContext(capContext);
  return (
    <div>
      <div className='profileContact-container'>
          <ul>
            <li>NAME</li>
            <li>PoR</li>
            <li>MAIL ID</li>
            <li>INSTA ID</li>
          </ul>
          <hr />
        </div>
        <div>
          {
            contacts.map((contact, index) => {
              return(
                <ProfileContactElement 
                key = {index} 
                name = {contact.name} 
                por = {contact.PoR} 
                email = {contact.mailID} 
                insta ={contact.instaID}/>
              )
            })
          }
        </div>
    </div>
  );
}

export default ProfileContact;
