import api from "./api";

const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const { data } = await api.post("/api/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (!data) {
      throw new Error("Failed to upload file");
    }
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

const getFileList = async () => {
  try {
    const { data } = await api.get("/api/files");
    return data;
  } catch (error) {
    console.error("Error fetching file list:", error);
    throw error;
  }
};

export default { uploadFile, getFileList };
