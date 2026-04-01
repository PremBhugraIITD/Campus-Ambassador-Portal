import React, { useContext } from "react";
import "./ProfileMain.css";
import { capContext } from "../../store/store";
import { imagesContext } from "../../store/images";
import { downloadOfferLetter } from "../../store/apiHandler";

const ProfileMain = () => {
  const { userPersonal, message, setMessage } = useContext(capContext);
  const { imageTheme } = useContext(imagesContext);

  const handleDownload = () => {
    setMessage("Will be updated after the internship is over")
  }

  const handleOfferLetterDownload = () => {
    setMessage("Downloading Offer Letter...")
    downloadOfferLetter();
  }

  return (
    <div className="profilemain-container">
      <div className="second-inner-details">
        <div>
          <ul>
            <li>
              <span>CA ID:</span> <p>{userPersonal?.ca_id}</p>
            </li>
            {/* <li>
              <span>Instagram ID:</span>{" "}
              <p>
                {" "}
                <a
                  target="_blank"
                  href={`https://www.instagram.com/${userPersonal?.instagram}`}
                >
                  {userPersonal?.instagram}
                </a>
              </p>
            </li>
            <li>
              <span>Linkedin ID: </span>{" "}
              <p>
                <a
                  target="_blank"
                  href={`https://www.linkedin.com/in/${userPersonal?.linkedin}`}
                >
                  {userPersonal?.linkedin}
                </a>
              </p>
            </li> */}
            <li>
              <span>Offer Letter: </span>{" "}
              <a onClick={handleOfferLetterDownload} className="download" download={true}>
                Download PDF <img src={imageTheme.download_logo} alt="" />
              </a>
            </li>
            <li>
              <span>Completion Letter: </span>{" "}
              <a onClick={handleDownload} className="download" download={true}>
                Download PDF <img src={imageTheme.download_logo} alt="" />
              </a>
            </li>
          </ul>
        </div>
        <div>
          <ul>
            <li>
              <span>College:</span> <p>{userPersonal?.college_name}</p>
            </li>
            <li>
              <span>City/State:</span> <p>{userPersonal?.college_city}</p>
            </li>
            <li>
              <span>LoR:</span>{" "}
              <a onClick={handleDownload} className="download" download={true}>
                Download PDF <img src={imageTheme.download_logo} alt="" />{" "}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfileMain;
