import NewTable from "../../components/NewTable"
import Loading from "../../components/Loading"
import { Suspense, useState, useEffect } from "react"
import axios from "axios";
export default function WarningStock() {
  const [dataTable, setDataTable] = useState({});
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState('');
  const columns = [
    {
      name: 'Barcode',
      selector: row => <span className='fw-bold'>{row.barcode}</span>,
      reorder: true,
      grow: 3000,

    },
    {
      name: 'Nama Produk',
      selector: row => <span className='text-uppercase'>{row.product_name}</span>,
      grow: 5000,
      wrap: true
    },
    {
      name: 'Stok',
      selector: row => row.stock || '0',

    },
  ]
  const rowStyle = [
    {
      when: row => row.stock <= 3,
      style: {
        color: 'rgba(255, 193, 7,0.9)',
        '&:hover': {
          color: 'rgba(255, 193, 7,0.8)',
        },
      },
    },
    {
      when: row => row.stock <= 0,
      style: {
        color: 'rgba(220, 53, 69,0.8)',
        '&:hover': {
          color: 'rgba(220, 53, 69,0.8)',
        },
      },
    },
  ]
  const handleSearch = (value) => {
    setKeyword(value)
  }
  const getData = async () => {
    try {
      await axios.get(`${import.meta.env.RENDERER_VITE_BASE_URL}/product/stock/info?limit=${limit}&page=${page}&search=${keyword}`).then(response => {
        setDataTable(response.data.results);
      })
    } catch (error) {
      throw error
    }
  }
  useEffect(() => {
    getData()
  }, [keyword, page, limit])
  useEffect(() => {
    getData()
  }, [])
  return (
    <Suspense fallback={<Loading />}>
      <NewTable
        data={dataTable.data}
        rows={dataTable.totalItems}
        columns={columns}
        limit={limit}
        onChangePage={page => setPage(page)}
        onSearch={handleSearch}
        rowStyle={rowStyle}
        isExport={false}
      />
    </Suspense>
  )

}