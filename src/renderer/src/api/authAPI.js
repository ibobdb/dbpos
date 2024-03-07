import Axios from 'axios';
export default {
  login: async (data) => {
    try {
      const response = await Axios.post(`${import.meta.env.RENDERER_VITE_BASE_URL}/login`, data);
      return response.data;
    } catch (err) {
      throw (err)
    }
  },
  checkConnection: async () => {
    try {
      const response = await Axios.get(`${import.meta.env.RENDERER_VITE_BASE_URL}`);
      return response.data;
    } catch (err) {
      throw (err)
    }
  }
}