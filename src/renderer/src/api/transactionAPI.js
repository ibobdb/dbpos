import Axios from 'axios'
export default {
  getTransaction: async (page, limit, search) => {
    const params = `${limit || page || search ? `?limit=${limit}&page=${page}&search=${search}` : ''}`;
    try {
      const response = await Axios.get(`${import.meta.env.RENDERER_VITE_BASE_URL}/transaction${params}`);
      return response.data;
    } catch (err) {
      throw (err)
    }
  },
  createTransaction: async (data) => {
    try {
      const response = await Axios.post(`${import.meta.env.RENDERER_VITE_BASE_URL}/transaction`, data);
      return response.data;
    } catch (error) {
      throw error
    }
  },
  exportTransaction: async (data) => {
    // return console.log(data);
    try {
      const response = await Axios.get(`${import.meta.env.RENDERER_VITE_BASE_URL}/transaction/export/excel?start=${data.startDate}&end=${data.endDate}`, {
        responseType: 'blob'
      });
      // Create a blob from the response data
      const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      // Create Judul
      const urlParams = new URLSearchParams(data);
      const tahun = urlParams.get('tahun');
      const bulan = urlParams.get('bulan');
      const hari = urlParams.get('tanggal');
      // Create a link element and trigger a download
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = `Transaksi ${data.startDate}-${data.endDate}.xlsx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return response.data;
    } catch (error) {
      throw error
    }
  }
}