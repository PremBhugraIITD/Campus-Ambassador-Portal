import { createContext, useEffect, useState } from "react";

// import right_icon from '../assets/right_icon.svg';
// import down_icon from '../assets/Vectordown.svg';
// // import image_icon from '../assets/Vector_image_icon.svg';
// import cap_home_logo from '../assets/Vector_cap_home.png';
// import skullLogo from "../../public/skull.png"
// import rdv_main_logo from "../assets/rdv_main_img.svg";
// import user_img from '../assets/user_image.png';
// import edit_icon from '../assets/Vector_edit_icon.svg';


//DARK IMAGES
import hamburger_menu_dark from "../assets/dark/Group_hamburger_menu.svg"
import login_person_icon_dark from "../assets/dark/login_person_icon.svg";
import rdv_main_logo_dark from "../assets/dark/rdv_main_img.svg";
import circle_logo_dark from "../assets/dark_logo.svg";
import upload_icon_dark from '../assets/dark/Vectorupload.svg';
import edit_icon_dark from '../assets/dark/Vector_edit_icon.svg';
import image_icon_dark from '../assets/dark/Vector_image_icon.svg';
import share_icon_dark from '../assets/dark/Vectorshare.svg';
import trophy_dark from '../assets/dark/Trophy.svg';
import top_medal_dark from '../assets/dark/top_medal.svg';
import medal_dark from '../assets/dark/medal.svg';
import up_logo_dark from '../assets/dark/Vectorup.svg';
import upblcak_logo_dark from '../assets/dark/Vectorup.svg';
import rdv_logo_dark from '../assets/light/Group_rdv_logo.svg';
import profile_dark from "../assets/dark/akar-icons_person.svg"
import insta_logo_dark from "../assets/dark/insta.svg";
import fb_logo_dark from  "../assets/dark/fb.svg";
import linkedin_logo_dark from "../assets/dark/LinkedIn.svg";
import youtube_logo_dark from "../assets/dark/youtube.svg";
import mail_logo_dark from "../assets/dark/mail.svg";
import call_logo_dark from "../assets/dark/call.svg";
import download_logo_dark from "../assets/dark/Vector_download.svg"


//LIGHT IMAGES
import hamburger_menu_light from "../assets/light/Group_hamburger_menu.svg"
import login_person_icon_light from "../assets/light/login_person_icon.svg";
import rdv_main_logo_light from "../assets/light/rdv_main_img.svg";
import circle_logo_light from "../assets/white_logo.svg";
import upload_icon_light from '../assets/light/Vectorupload.svg';
import edit_icon_light from '../assets/light/Vector_edit_icon.svg';
import image_icon_light from '../assets/light/Vector_image_icon.svg';
import share_icon_light from '../assets/light/Vectorshare.svg';
import trophy_light from '../assets/light/Trophy.svg';
import top_medal_light from '../assets/light/top_medal.svg';
import medal_light from '../assets/light/medal.svg';
import up_logo_light from '../assets/light/Vectorup.svg';
import upblcak_logo_light from '../assets/light/Vectorup.svg';
import rdv_logo_light from '../assets/dark/Group_rdv_logo.svg';
import profile_light from "../assets/light/akar-icons_person.svg"
import insta_logo_light from "../assets/light/insta.svg";
import fb_logo_light from  "../assets/light/fb.svg";
import linkedin_logo_light from "../assets/light/LinkedIn.svg";
import youtube_logo_light from "../assets/light/youtube.svg";
import mail_logo_light from "../assets/light/mail.svg";
import call_logo_light from "../assets/light/call.svg";
import download_logo_light from "../assets/light/Vector_download.svg"

// import user_image_light from '../assets/user_image.png';

const imagesContext =  createContext();

const ImagesContextStore = ({children}) =>{

    const [isDarkMode, setIsDarkMode] = useState(false);

    const images = {
        light: {
            hamburger_menu: hamburger_menu_light,
            login_person_icon: login_person_icon_light,
            rdv_main_logo: rdv_main_logo_light,
            circle_logo: circle_logo_light,
            upload_icon: upload_icon_light,
            edit_icon: edit_icon_light,
            image_icon: image_icon_light,
            share_icon: share_icon_light,
            trophy: trophy_light,
            top_medal: top_medal_light,
            medal: medal_light,
            up_logo: up_logo_light,
            upblcak_logo: upblcak_logo_light,
            rdv_logo: rdv_logo_light,
            profile: profile_light,
            insta_logo: insta_logo_light,
            fb_logo: fb_logo_light,
            linkedin_logo: linkedin_logo_light,
            youtube_logo: youtube_logo_light,
            mail_logo: mail_logo_light,
            call_logo: call_logo_light,
            download_logo : download_logo_light

        },
        dark: {
            hamburger_menu: hamburger_menu_dark,
            login_person_icon: login_person_icon_dark,
            rdv_main_logo: rdv_main_logo_dark,
            circle_logo: circle_logo_dark,
            upload_icon: upload_icon_dark,
            edit_icon: edit_icon_dark,
            image_icon: image_icon_dark,
            share_icon: share_icon_dark,
            trophy: trophy_dark,
            top_medal: top_medal_dark,
            medal: medal_dark,
            up_logo: up_logo_dark,
            upblcak_logo: upblcak_logo_dark,
            rdv_logo: rdv_logo_dark,
            profile: profile_dark,
            insta_logo: insta_logo_dark,
            fb_logo: fb_logo_dark,
            linkedin_logo: linkedin_logo_dark,
            youtube_logo: youtube_logo_dark,
            mail_logo: mail_logo_dark,
            call_logo: call_logo_dark,
            download_logo : download_logo_dark

        }
    };



    const onButtonClick = () =>{
      setIsDarkMode(!isDarkMode);
    }

    // const imageTheme = isDarkMode ? images.light : images.dark;

    const [imageTheme, setimageTheme] = useState(images.light);

    useEffect(() => {
        const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setimageTheme(userPrefersDark ? images.light : images.dark);
        setIsDarkMode(userPrefersDark ? true: false);
        console.log(userPrefersDark);

    }, []);

   
    return(
        <imagesContext.Provider
         value={{
            isDarkMode,
            onButtonClick,
            imageTheme
         }}>
            {children}
        </imagesContext.Provider>
    )
}

export {imagesContext, ImagesContextStore};
