import Axios from 'axios'
export default {
  getUser: async (page, limit, search) => {
    const params = `${limit || page || search ? `?limit=${limit}&page=${page}&search=${search}` : ''}`;
    try {
      const response = await Axios.get(`${import.meta.env.RENDERER_VITE_BASE_URL}/users${params}`);
      return response.data;
    } catch (err) {
      throw (err)
    }
  },
  getUserById: async (id) => {
    try {
      const response = await Axios.get(`${import.meta.env.RENDERER_VITE_BASE_URL}/users/${id}`)
      return response.data
    } catch (error) {
      throw (error)
    }
  },
  createUser: async (data) => {
    try {
      const response = await Axios.post(`${import.meta.env.RENDERER_VITE_BASE_URL}/users`, data);
      return response.data;
    } catch (err) {
      throw (err)
    }
  },
  deleteUser: async (id) => {
    try {
      const response = await Axios.delete(`${import.meta.env.RENDERER_VITE_BASE_URL}/users/${id}/delete`);
      return response.data;
    } catch (err) {
      throw (err)
    }
  },
  updateUser: async (data) => {
    try {
      const response = await Axios.put(`${import.meta.env.RENDERER_VITE_BASE_URL}/users/${id}/update`, data);
      return response.data;
    } catch (err) {
      throw (err)
    }
  },
}