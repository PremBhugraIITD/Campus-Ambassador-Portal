import React, { useContext } from 'react';
import './Footer.css'
import { Link } from 'react-router-dom';
import rdv_main_logo from "../../assets/rdv_main_img.svg";
import insta_logo from "../../assets/dark/insta.svg";
import fb_logo from  "../../assets/dark/fb.svg";
import linkedin_logo from "../../assets/dark/LinkedIn.svg";
import youtube_logo from "../../assets/dark/youtube.svg";
import mail_logo from "../../assets/dark/mail.svg";
import rdv_logo_dark from "../../assets/dark_logo.svg";
import rdv_logo_light from "../../assets/white_logo.svg";
import { imagesContext } from '../../store/images';

const Footer = () => {
  const {imageTheme} = useContext(imagesContext);
  return (

    

    <div>
       <footer>
        <div className='footer-content'>
          <ul>
            <li>
              <Link>
              Testimonials
              </Link>
            </li>
            <li>
              <Link>
              Incentives
              </Link>
            </li>
            <li>
              <Link>
              Contact US
              </Link>
            </li>
            <li>
              <Link>
              About US
              </Link>
            </li>
            <li>
              <Link>
              Register
              </Link>
            </li>
          </ul>
        </div>

        <div className='footer-image'>
          <Link target='blank' to={'https://www.rdv-iitd.org/'} className='footer-main-logo'>
            <img src={imageTheme.rdv_main_logo} alt="" />
          </Link>
          <div className='social-icons'>
            <ul>
              <li><Link target='blank' to={"https://www.instagram.com/rendezvous.iitd/?hl=en"}><img src={imageTheme.insta_logo} alt="" /></Link></li>
              <li><Link target='blank' to={"https://www.facebook.com/rendezvous.iitd/"}><img src={imageTheme.fb_logo} alt="" /></Link></li>
              <li><Link target='blank' to={"https://in.linkedin.com/company/rendezvous-iit-del"}><img src={imageTheme.linkedin_logo} alt="" /></Link></li>
              <li><Link target='blank' to={"https://www.youtube.com/@rendezvousiitdelhi23"}><img src={imageTheme.youtube_logo} alt="" /></Link></li>
            </ul>
          </div>
          <p>
            @Rendezvous'24, IIT Delhi
          </p>
        </div>

        <div className='mobile-only-social-icons'>
            <ul>
              <li><Link target='blank' to={"https://www.instagram.com/rendezvous.iitd/?hl=en"}><img src={imageTheme.insta_logo} alt="" /></Link></li>
              <li><Link target='blank' to={"https://www.facebook.com/rendezvous.iitd/"}><img src={imageTheme.fb_logo} alt="" /></Link></li>
              <li><Link target='blank' to={"https://in.linkedin.com/company/rendezvous-iit-del"}><img src={imageTheme.linkedin_logo} alt="" /></Link></li>
              <li><Link target='blank' to={"https://www.youtube.com/@rendezvousiitdelhi23"}><img src={imageTheme.youtube_logo} alt="" /></Link></li>
            </ul>
          </div>

        <div className='footer-contact'>
          <img src={imageTheme.circle_logo} alt="" />
          <p>Contact At:</p>
          <p>
            <img src={imageTheme.mail_logo} alt="" />
            <a  target="_blank" href="mailto:admin@rdv-iitd.org">admin@rdv-iitd.org</a></p>
          </div>
      </footer>
    </div>
  );
}

export default Footer;
