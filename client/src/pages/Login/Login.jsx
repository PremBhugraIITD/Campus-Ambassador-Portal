import React, { useContext, useState } from 'react';
import { Form } from 'react-router-dom';
import './Login.css'
import { imagesContext } from '../../store/images';

const Login = () => {
  const {imageTheme} = useContext(imagesContext);
  // const [login, setLogin] = useState(true);
  const login = true
  const handleOnClick = (e) => {
      e.preventDefault();
      window.location.href = 'https://auth.rdv-iitd.org/signin?client_id=SXN8ntxQrQjyO8TyKuLxfPXmPJOPqAHe&redirect_uri=https://www.rdv-iitd.org'; 
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    if(!login){
    
  }

  }
  return (
    <div className='outer-login-container'>
      <form className='login-form' onSubmit={handleSubmit}>
        <ul className='login-header'>
          <img src={imageTheme.circle_logo} alt="" />
          <h2>{login? 'Login': 'Signup'}</h2>
          
        </ul>
        {/* <div>
            <label htmlFor="name">Username</label>
            <input type="text" id='name' />
        </div> */}
        <div>
            <label htmlFor="email">Email</label>
            <input type="email" id='email' />
        </div>
        <div>
            <label htmlFor="password">Password</label>
            <input type="password" id='password' />
        </div>
        <button type="submit">{login? 'Login': 'Signup'}</button>

        <div>
          <p>
            {login? 'New to Rendezvous? ' : 'Already a user? '} 
            <span onClick={handleOnClick}>{login? 'Signup': 'Login'}</span>
          </p>
        </div>
        
        <div>
          
        </div>
      </form>
    </div>
  );
}

export default Login;
