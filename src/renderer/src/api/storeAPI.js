import Axios from 'axios'
export default {
  getStore: async () => {
    try {
      const response = await Axios.get(`${import.meta.env.RENDERER_VITE_BASE_URL}/store`);
      return response.data.results
    } catch (error) {
      throw error
    }
  }
}