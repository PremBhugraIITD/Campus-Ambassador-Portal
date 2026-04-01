import React, { useContext, useState } from "react";
import "./ProfileEdit.css";
import ProfileEditElement from "../ProfileEditElement/ProfileEditElement";
import { capContext } from "../../store/store";
const ProfileEdit = () => {
  const [clicks, setClicks] = useState(0);
  const [formData, setFormData] = useState([
    {
      edit: "",
      previous: "",
      change: "",
    },
  ]);
  const handleFormDataChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };
  const { message, setMessage } = useContext(capContext);
  const handleNewChange = () => {
    if (clicks > 1) {
      setMessage("Only 3 changes allowed at a time");
    } else {
      setClicks(clicks + 1);
      setFormData([
        ...formData,
        {
          edit: "",
          previous: "",
          change: "",
        },
      ]);
      console.log(formData);
    }
  };

  return (
    <div className="profileEdit-container">
      <p>Request Changes In: </p>
      <div className="edit-request">
        <ProfileEditElement
          formData={formData}
          onFormDataChange={handleFormDataChange}
        />
        {Array.from({ length: clicks }).map((_, index) => (
          <ProfileEditElement
            key={index}
            formData={formData}
            onFormDataChange={handleFormDataChange}
          />
        ))}
      </div>
      <div className="add-button">
        <p onClick={handleNewChange}>+</p>
      </div>
    </div>
  );
};

export default ProfileEdit;
