// Produk API
import Axios from 'axios'
export default {
  getDiscount: async (page, limit, search = '') => {
    try {
      const response = await Axios.get(`${import.meta.env.RENDERER_VITE_BASE_URL}/discount?limit=${limit}&page=${page}&search=${search}`);
      return response.data;
    } catch (err) {
      throw (err)
    }
  },
  change_status: async (id) => {
    try {
      const response = await Axios.put(`${import.meta.env.RENDERER_VITE_BASE_URL}/discount/change_status/${id}`);
      return response.data;
    } catch (err) {
      throw (err)
    }
  },
  create_discount: async (data) => {
    try {
      const response = await Axios.post(`${import.meta.env.RENDERER_VITE_BASE_URL}/discount`, data);
      return response.data;
    } catch (err) {
      throw (err)
    }
  }

}