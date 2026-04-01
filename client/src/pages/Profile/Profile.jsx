import React, { useContext, useState } from "react";
import "./Profile.css";
import user_img from "../../assets/user_image.png";
// import edit_icon from '../../assets/Vector_edit_icon.svg';
import mail_logo from "../../assets/dark/mail.svg";
import call_logo from "../../assets/dark/call.svg";
import { capContext } from "../../store/store";
import { imagesContext } from "../../store/images";
import ProfileMain from "../../components/ProfileMain/ProfileMain";
import ProfileEdit from "../../components/ProfileEdit/ProfileEdit";
import ProfileContact from "../../components/ProfileContact/ProfileContact";
const Profile = () => {
  const [profileView, setProfileView] = useState("profileMain");
  const { imageTheme } = useContext(imagesContext);
  const { userPersonal } = useContext(capContext);

  const handleProfilePicChange = (e) => {
    console.log("Are upload hogya bt handle ni hua..");
  };

  const handleProfile = (e) => {
    if (e.target.textContent === "PROFILE") {
      setProfileView("profileMain");
    }
    // else if(e.target.textContent === "EDIT PROFILE"){
    //   setProfileView("profileEdit");
    // }
    else {
      setProfileView("profileContact");
    }
  };

  return (
    <div className="outer-profile-container">
      <div className="first-profile-container">
        <div className="inner-profile-container">
          <div className="profile-image">
            <img src={user_img} alt="" />
          </div>
          <div className="profile-edit">
            <label htmlFor="edit-image">
              <img src={imageTheme.edit_icon} alt="" />
            </label>
            <input
              onChange={handleProfilePicChange}
              style={{ display: "none" }}
              id="edit-image"
              type="file"
              accept=".jpg,.png"
            />
          </div>
        </div>

        <div className="profile-options">
          <p
            onClick={handleProfile}
            className={`${profileView === "profileMain" ? "active" : null}`}
          >
            PROFILE
          </p>
          {/* <p onClick={handleProfile} className={`${profileView === "profileEdit"? "active": null}`}>EDIT PROFILE</p> */}
          <p
            onClick={handleProfile}
            className={`${profileView === "profileContact" ? "active" : null}`}
          >
            CONTACT US
          </p>
        </div>

        <div className="first-display">
          <h1>{userPersonal?.name}</h1>
          <div>
            <p>
              <span style={{ fontWeight: "bold" }}>POINTS EARNED: </span>
              {userPersonal?.points === undefined ? "0" : userPersonal?.points}
            </p>
            <p>
              <img className="profile-mail" src={imageTheme.mail_logo} alt="" />
              <a href={`mailto:${userPersonal?.email}`}>
                {userPersonal?.email}
              </a>
            </p>

            <p>
              <img
                className="profile-phone"
                src={imageTheme.call_logo}
                alt=""
              />
              {userPersonal?.mobile_number}
            </p>
          </div>
        </div>
      </div>

      <div className="second-profile-container">
        <div className="second-display">
          <p
            onClick={handleProfile}
            className={`${profileView === "profileMain" ? "active" : null}`}
          >
            PROFILE
          </p>
          {/* <p onClick={handleProfile} className={`${profileView === "profileEdit"? "active": null}`}>EDIT PROFILE</p> */}
          <p
            onClick={handleProfile}
            className={`${profileView === "profileContact" ? "active" : null}`}
          >
            CONTACT US
          </p>
        </div>

        <div className="second-inner-profile">
          <h1>{userPersonal?.name}</h1>
          <div>
            <p>
              <img
                width={"20px"}
                height={"20px"}
                src={imageTheme.mail_logo}
                alt=""
              />
              <a href={`mailto:${userPersonal?.email}`}>
                {userPersonal?.email}
              </a>
            </p>
            <p>
              <img
                width={"15px"}
                height={"15px"}
                src={imageTheme.call_logo}
                alt=""
              />
              {userPersonal?.mobile_number}
            </p>
            <p>
              <span style={{ fontWeight: "bold" }}>POINTS EARNED: </span>
              {userPersonal?.points === undefined ? "0" : userPersonal?.points}
            </p>
          </div>
        </div>

        <div>
          {profileView === "profileMain" ? <ProfileMain /> : <></>}
          {/* {
            profileView === "profileEdit" ? <ProfileEdit/>:<></>
          } */}
          {profileView === "profileContact" ? <ProfileContact /> : <></>}
        </div>
      </div>
    </div>
  );
};

export default Profile;
