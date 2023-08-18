import axios from "axios";
const apiUrl: any = process.env.REACT_APP_API_URL; //url de la api

const FetchData = async () => {
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default FetchData;
