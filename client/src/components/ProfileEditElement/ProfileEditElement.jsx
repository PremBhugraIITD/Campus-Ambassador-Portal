import React, { useState } from "react";
import "./ProfileEditElement.css";
import { handleUserProfileChange } from "../../store/apiHandler";
const ProfileEditElement = () => {
  const [formData, setFormData] = useState({
    edit: "",
    previous: "",
    change: "",
  });
  const handleSubmit = ()=>{
    handleUserProfileChange(formData.edit,formData.change);
    setFormData({
      edit: "",
      previous: "",
      change: "",
    })
  }
  return (
    <div className="profileEditElement">
      <div className="edit-options">
        <select
          name="edit"
          id="edit"
          required
          value={formData.edit}
          onChange={(e) => {
            setFormData({ ...formData, edit: e.target.value });
          }}
        >
          <option value="">Select</option>
          <option value="name">Name</option>
          <option value="email">Mail Id</option>
          <option value="mobile_number">Phone Number</option>
          <option value="college_name">College Name</option>
          <option value="college_city">College City</option>
          {/* <option value="instagram">Instagram Id</option>
          <option value="linkedin">Linkedin Id</option> */}
        </select>
        <div>
          <label htmlFor="previous">Previous</label>
          <input
            name="previous"
            type="text"
            id="previous"
            required
            value={formData.previous}
            onChange={(e) => {
              setFormData({ ...formData, previous: e.target.value });
            }}
          />
        </div>
        <div>
          <label htmlFor="change">Change to</label>
          <input
            name="change"
            type="text"
            id="change"
            required
            value={formData.change}
            onChange={(e) => {
              setFormData({ ...formData, change: e.target.value });
            }}
          />
        </div>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default ProfileEditElement;
