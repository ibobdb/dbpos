import Axios from 'axios'
export default {
  get_batch: async (page, limit, search) => {
    const params = `${limit || page || search ? `?limit=${limit}&page=${page}&search=${search}` : ''}`;
    try {
      const response = await Axios.get(`${import.meta.env.RENDERER_VITE_BASE_URL}/batch${params}`);
      return response.data;
    } catch (err) {
      throw (err)
    }
  },
  adjust_stock: async (batch_id, new_stock, user_id, barocde) => {
    try {
      const response = await Axios.put(`${import.meta.env.RENDERER_VITE_BASE_URL}/batch/${batch_id}/${barocde}`, {
        new_stock: new_stock,
        user_id: user_id
      });
      return response.data;
    } catch (err) {
      throw (err)
    }
  },
  create_batch: async (data) => {
    try {
      const response = await Axios.post(`${import.meta.env.RENDERER_VITE_BASE_URL}/batch`, data);
      return response.data;
    } catch (err) {
      throw (err)
    }
  },
  delete_batch: async (batch_id, barcode) => {
    try {
      const response = await Axios.delete(`${import.meta.env.RENDERER_VITE_BASE_URL}/batch/${batch_id}/${barcode}`);
      return response.data;
    } catch (err) {
      throw (err)
    }
  },
  exportBatch: async () => {
    try {
      const response = await Axios.get(`${import.meta.env.RENDERER_VITE_BASE_URL}/batch/export/excel`, {
        responseType: 'blob'
      });
      // Create a blob from the response data
      const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      // Create a link element and trigger a download
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = `Batch ${new Date().toLocaleDateString('id-ID')}.xlsx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return response.data;
    } catch (error) {
      throw error
    }
  }

}