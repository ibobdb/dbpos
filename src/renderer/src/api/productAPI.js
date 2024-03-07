// Produk API
import Axios from 'axios'
export default {
  getProduct: async (page, limit, search = '') => {
    try {
      const response = await Axios.get(`${import.meta.env.RENDERER_VITE_BASE_URL}/product?limit=${limit}&page=${page}&search=${search}`);
      return response.data;
    } catch (err) {
      throw (err)
    }
  },
  deleteProduct: async (barcode) => {
    try {
      const response = await Axios.delete(`${import.meta.env.RENDERER_VITE_BASE_URL}/product/${barcode}`)
      return response.data
    } catch (error) {
      throw (error)
    }
  },
  addProduct: async (data) => {
    const config = {
      headers: {
        'Content-Type': 'application/json', // Contoh header Content-Type
      },
    };
    try {
      const response = await Axios.post(`${import.meta.env.RENDERER_VITE_BASE_URL}/product`, data, config)
      return response.data
    } catch (error) {
      throw (error)
    }
  },
  getProductById: async (barcode) => {
    try {
      const response = await Axios.get(`${import.meta.env.RENDERER_VITE_BASE_URL}/product/${barcode}`)
      return response.data
    } catch (error) {
      throw (error)
    }
  },
  updateProduct: async (barcode, data) => {
    try {
      const response = await Axios.put(`${import.meta.env.RENDERER_VITE_BASE_URL}/product/${barcode}`, data)
      return response.data
    } catch (error) {
      throw (error)
    }
  },
  exportProduct: async () => {
    try {
      const response = await Axios.get(`${import.meta.env.RENDERER_VITE_BASE_URL}/product/export/excel`, {
        responseType: 'blob'
      });
      // Create a blob from the response data
      const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      // Create a link element and trigger a download
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = `Semua Produk ${new Date().toLocaleDateString('id-ID')}.xlsx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return response.data;
    } catch (error) {
      throw error
    }
  }
}