import axios from "axios";

export const uploadfile = async (data) => {
  try {
    
    
    const resp = await axios.post("http://localhost:3000/upload", data);
    return resp.data;
  } catch (error) {
    console.error("Error while calling the API:", error.response ? error.response.data : error.message);
    return null; // Return null or an appropriate value to indicate failure
  }
};
