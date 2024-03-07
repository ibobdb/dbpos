import Axios from 'axios'
export default {
  getCategory: async (page, limit, search = '') => {
    const params = `${limit || page || search ? `?limit=${limit}&page=${page}&search=${search}` : ''}`;
    try {
      const response = await Axios.get(`${import.meta.env.RENDERER_VITE_BASE_URL}/category${params}`);
      return response.data;
    } catch (err) {
      throw (err)
    }
  },
  createCategory: async (data) => {
    try {
      const response = await Axios.post(`${import.meta.env.RENDERER_VITE_BASE_URL}/category`, data);
      return response.data;
    } catch (err) {
      throw (err)
    }
  },
  deleteCategory: async (id) => {
    try {
      const response = await Axios.delete(`${import.meta.env.RENDERER_VITE_BASE_URL}/category/${id}`)
      return response.data
    } catch (error) {
      throw (error)
    }
  },
  getCategoryById: async (id) => {
    try {
      const response = await Axios.get(`${import.meta.env.RENDERER_VITE_BASE_URL}/category/${id}`)
      return response.data
    } catch (error) {
      throw (error)
    }
  },
  updateCategory: async (id, data) => {
    try {
      const response = await Axios.put(`${import.meta.env.RENDERER_VITE_BASE_URL}/category/${id}`, data);
      return response.data;
    } catch (err) {
      throw (err)
    }
  },
}