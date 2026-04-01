import React, { useState, useRef, useContext } from "react";
import "./TaskElement.css";
import right_icon from "../../assets/right_icon.svg";
import upload_icon from "../../assets/dark/Vectorupload.svg";
import share_icon from "../../assets/dark/Vectorshare.svg";
import down_icon from "../../assets/Vectordown.svg";
import { imagesContext } from "../../store/images";
import { capContext } from "../../store/store";
import { uploadSubs } from "../../store/apiHandler";
import DescriptionWithLink from "../DescriptionWithLink/DescriptionWithLink";
import { compareDateTimeWithNow } from "../../config/dateTimeHandler";

const TaskElement = ({
  id,
  tsk_pnt,
  tsk_desc,
  tsk_dead,
  tsk_link,
  ca_id,
  tsk_type,
}) => {
  const { imageTheme } = useContext(imagesContext);

  const { message, setMessage } = useContext(capContext);
  const [openDesc, setOpenDesc] = useState(false);
  const [fileStatus, setFileStatus] = useState(imageTheme.upload_icon);
  const [uploadStatus, setUploadStatus] = useState("UPLOAD");
  const [uploadedFileCount, setUploadedFileCount] = useState(0);

  const fileInputRef = useRef(null);
  const iconRef = useRef(null);
  const buttonRef = useRef(null);

  const handleDescClick = () => {
    setOpenDesc(!openDesc);
  };

  const handleFileUpload = () => {
    const uploadedFiles = Array.from(fileInputRef.current.files);
    const maxFileSize = 1024 * 1024; // 1MB per file
    const maxTotalSize = 5 * 1024 * 1024; // 5MB total size

    const invalidFiles = uploadedFiles.filter(
      (file) => file.size > maxFileSize
    );

    const totalFileSize = uploadedFiles.reduce(
      (total, file) => total + file.size,
      0
    );

    if (invalidFiles.length > 0) {
      setMessage("Each file must be less than 1MB.");
      fileInputRef.current.value = "";
      setFileStatus(imageTheme.upload_icon);
      setUploadStatus("UPLOAD");
    } else if (totalFileSize > maxTotalSize) {
      setMessage("The total size of all files must be less than 5MB.");
      fileInputRef.current.value = "";
      setFileStatus(imageTheme.upload_icon);
      setUploadStatus("UPLOAD");
    } else {
      setFileStatus(imageTheme.image_icon);
      setUploadStatus("IMAGE");
      setUploadedFileCount((prevCount) => prevCount + uploadedFiles.length);

      buttonRef.current.style.color = "var(--secondary-color)";

      fileInputRef.current.click();
    }
  };

  const handleFileSubmit = async () => {
    const uploadedFiles = Array.from(fileInputRef.current.files);
    if (!uploadedFiles) {
      setMessage("Please select a file");
    } else if (buttonRef.current.textContent === "SUBMITTED") {
      setMessage("Task already completed");
    } else {
      if (uploadedFiles.length === 0) {
        setMessage("Please select a file");
        return;
      }
      const uploadToServer = await uploadSubs(id, uploadedFiles);
      if (uploadToServer.id === 201) {
        setMessage(uploadToServer.message);
        setUploadStatus("COMPLETED");
        buttonRef.current.textContent = "SUBMITTED";
        iconRef.current.style.display = "none";
      }
      if (uploadToServer.id === 404) {
        setMessage(uploadToServer.message);
      }

      // setTimeout(() => {
      //   setUploadStatus("UPLOAD");
      //   setFileStatus(imageTheme.upload_icon);
      //   buttonRef.current.textContent = "SUBMIT";
      //   buttonRef.current.style.color = "var(--submit-color)";
      //   iconRef.current.style.display = "block";
      // }, 1000);
    }
    // console.log(uploadedFileCount)
  };

  const handleShare = async () => {
    const link = tsk_link;
    try {
      await navigator.clipboard.writeText(`${link}?CA_ID=${ca_id}`);
      setMessage(`Copied to clipboard: ${link}?CA_ID=${ca_id}`);
    } catch (error) {
      setMessage(`Failed to copy: ${error}`);
    }
  };

  return (
    <div className="outer-task-container">
      <div className="inner-task-container">
        <div>
          {tsk_pnt} <span>POINTS</span>
        </div>
        <div className="task-description">
          <p>DESCRIPTION</p>
          <p>DESC.</p>
          <label onClick={handleDescClick} htmlFor="description">
            {openDesc ? (
              <img src={down_icon} alt="" />
            ) : (
              <img src={right_icon} alt="" />
            )}
          </label>
        </div>

        <div className="task-deadline">{tsk_dead.split('T')[0]}</div>

        <div className="task-files">
          {uploadedFileCount > 0 ? (
            <p
              style={{
                backgroundColor: "var(--secondary-color)",
                borderRadius: "100%",
                padding: "4px 6px",
                color: "var(--primary-color)",
                fontSize: "10px",
              }}
            >
              {uploadedFileCount}
            </p>
          ) : (
            <></>
          )}
          
          {tsk_type === "sharing" ? (
            <p> {(compareDateTimeWithNow(tsk_dead)) ? "Ongoing" : "Completed"}</p>
          ) : (
            <p>{uploadStatus}</p>
          )}
          {tsk_type != "sharing" ? (
            <>
              <input
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileUpload}
                id={`file-upload-${id}`}
                type="file"
                accept=".jpg,.png"
                multiple
              />
              <label htmlFor={`file-upload-${id}`}>
                <img ref={iconRef} src={fileStatus} alt="" />
              </label>
            </>
          ) : null}
        </div>

        {tsk_type != "sharing" ? (
          <div className="task-submit">
            <button
              ref={buttonRef}
              onClick={handleFileSubmit}
              className="task-submit-button"
            >
              SUBMIT
            </button>
          </div>
        ) : (
          <div>NA</div>
        )}
        {tsk_type === "sharing" ? (
          <div onClick={handleShare} className="task-share">
            <img src={imageTheme.share_icon} alt="" />
          </div>
        ) : (
          <div>NA</div>
        )}
      </div>
      <div className={openDesc ? "open-desc" : "close-desc"} id="description">
        <DescriptionWithLink text={tsk_desc} />
      </div>
    </div>
  );
};

export default TaskElement;
