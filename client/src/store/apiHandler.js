import axiosInstance from "../config/axiosInstance";
export const fecthTask = async () => {
  try {
    const res = await axiosInstance.get("api/user/tasks");
    if (res.status === 200) {
      return res.data;
    }
  } catch (err) {
    return err.message;
  }
};
export const fecthUser = async () => {
  try {
    const res = await axiosInstance.get("api/user/profile");
    if (res.status === 200) {
      return res.data;
    }
  } catch (err) {
    console.log(err);
  }
};

export const handleUserProfileChange = async (field, value) => {
  try {
    const res = await axiosInstance.put("api/user/profile", {
      [field]: value,
    });
    if (res.status === 200) {
      return res.data;
    }
  } catch (err) {
    console.log(err);
  }
};

export const uploadSubs = async (task_id, files) => {
  try {
    const formData = new FormData();
    formData.append("task_id", task_id);
    files.forEach((file) => {
      formData.append("file", file);
    });
    const res = await axiosInstance.post(
      "api/user/upload/upload-file",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (res.status === 201) {
      return { id: 201, message: "Task submitted successfully!" };
    }
  } catch (err) {
    return { id: 404, message: err.response.data.error };
  }
};
export const showLeaderboard = async () => {
  try {
    const res = await axiosInstance.get("api/user/users");
    if (res.data.statusCode === 200) {
      return res.data.data;
    }
  } catch (err) {
    console.log(err);
  }
};

export const downloadOfferLetter = async () => {
  try {
    const res = await axiosInstance.get("api/user/offer_letter", {
      responseType: "blob",
    });
    if (res.status === 200) {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Offer Letter.pdf");
      document.body.appendChild(link);
      link.click();
    }
  } catch (err) {
    console.log(err);
  }
};
