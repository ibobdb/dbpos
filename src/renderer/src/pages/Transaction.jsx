import Tabs from "../components/Tabs";
import NewTable from "../components/NewTable";
import { useState, useEffect } from "react";
import Swal from 'sweetalert2'
import transactionAPI from "../api/transactionAPI";
import ModalDetailTransaction from '../views/ModalDetailTransaction'
import ModalExport from '../views/ModalExport'
import { dateFormat, rupiah } from "../common/numberFormat";
import storeAPI from "../api/storeAPI";
export default function Transaction() {
  const [dataTable, setDataTable] = useState({});
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [keyword, setKeyword] = useState('');
  const [store, setStore] = useState({});
  const button = [
    {
      buttonText: 'Transaksi',
      target: '#nav-transaction',
      key: 'transaction'
    },

  ]
  const columns = [
    {
      name: 'Tanggal Transaksi',
      selector: row => dateFormat(row.createdAt),
      sortable: true
    },
    {
      name: 'ID Transaksi',
      selector: row => <span className="fw-bold">{row.id}</span>,
      sortable: true
    },
    {
      name: 'Diskon',
      selector: row => row.discount,
      sortable: true
    },
    {
      name: 'Total',
      selector: row => rupiah(row.total),
      sortable: true
    },
    {
      name: 'Perintah',
      cell: (row) =>
        <button className="btn-primary btn-sm btn" onClick={() => handleOpenModal(row.id)}>
          Detail
        </button>
    },
  ]
  const getStore = async () => {
    try {
      await storeAPI.getStore().then(response => {
        setStore(response)
      })
    } catch (error) {

    }
  }
  const [progress, setProgress] = useState(false);
  const getTransaction = async () => {
    setProgress(true)
    await transactionAPI.getTransaction(page, limit, keyword).then(response => {
      setDataTable(response.results)
    })
    setProgress(false);
  }
  const handleSearch = (value) => {
    setKeyword(value);
  }
  useEffect(() => {
    getTransaction()
  }, [keyword, page])
  useEffect(() => {
    document.title = 'Transaksi';
    getTransaction()
    getStore();
  }, []);
  // Modal
  // Open Modal
  const [modal, setModal] = useState(false);
  const [dataDetail, setDataDetail] = useState([]);

  const handleCloseModal = () => {
    setModal(false)
  }
  const handleOpenModal = (id) => {
    const detail = dataTable.data.find(item => {
      return item.id == id
    });
    detail.store = store;
    setDataDetail(detail);
    setModal(true);
  }
  // Export
  const handleExport = async (data) => {
    // console.log(data)
    await transactionAPI.exportTransaction(data)
  }
  const OtherFilter = () => {
    return (
      <div>Filter Lainnya</div>
    )
  }
  return (
    <div>
      <div className="page-header w-100 bg-white p-2 mt-3">
        <h4>Transaksi</h4>
      </div>
      <Tabs button={button}>
        <div className="tab-pane fade show active" id="nav-transaction" role="tabpanel" aria-labelledby="nav-home-tab">
          <NewTable
            data={dataTable.data}
            rows={dataTable.totalItems}
            columns={columns}
            limit={limit}
            onChangePage={page => setPage(page)}
            onSearch={handleSearch}
            exportFilter={true}
            exportFilterDate={handleExport}
            exportFilterOther={<OtherFilter />}
            onExport={handleExport}
            progress={progress}
          />
        </div>
        <ModalDetailTransaction
          show={modal}
          onClose={handleCloseModal}
          data={dataDetail}
        />
      </Tabs>
    </div>
  )
}