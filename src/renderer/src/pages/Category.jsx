import Tabs from "../components/Tabs";
import NewTable from "../components/NewTable";
import { useState, useEffect } from "react";
import categoryAPI from "../api/categoryAPI";
import { toast } from 'react-toastify';
import Swal from 'sweetalert2'
import ModalUpdateCategory from '../views/ModalUpdateCategory'
export default function Category() {
  const button = [
    {
      buttonText: 'Kategori',
      target: '#nav-category',
      key: 'category'
    },
    {
      buttonText: 'Tambah Kategori',
      target: '#nav-add-category',
      key: 'add-category'
    }
  ]
  const columns = [
    {
      name: 'Nama Kategori',
      selector: row => <span className="text-uppercase">{row.name}</span>,
    },
    {
      name: 'Deskripsi',
      selector: row => row.description
    },
    {
      name: 'Perintah',
      cell: (row) => <div div className='d-flex gap-2'>
        <button className="btn btn-danger btn-sm" type="button" onClick={() => onDelete(row.id)}><i className="bx bx-trash"></i></button>
        <button className="btn btn-primary btn-sm" type="button" onClick={() => onUpdate(row.id)}><i className="bx bx-pencil"></i></button>
      </div>
      ,
      allowoverflow: true,
    },
  ];
  // handle Table
  const [dataTable, setDataTable] = useState({});
  const [limit, setLimit] = useState(50);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState('');
  const [progress, setPorgress] = useState(false);
  const getCategory = async () => {
    try {
      setPorgress(true);
      await categoryAPI.getCategory(page, limit, keyword).then((response) => {
        setDataTable(response.results);
      })
      setPorgress(false);
    } catch (error) {
      setDataTable({})
      throw (error)
    }
  }

  const onDelete = async (id) => {
    Swal.fire({
      title: "Apakah data akan di hapus?",
      showCancelButton: true,
      confirmButtonText: "Save",
      icon: "question"
    }).then((result) => {
      if (result.isConfirmed) {
        categoryAPI.deleteCategory(id).then(() => {
          toast.success('Data berhasil di hapus', {
            position: "top-right",
            autoClose: 2000,
            progress: undefined,
            theme: "light",
          });
        })
        getCategory()
      }
    });
  }
  const handleSearch = (value) => {
    setKeyword(value)
  }
  //
  // handle Form
  const [categoryName, setCategoryName] = useState('');
  const [categoryDesc, setCategoryDesc] = useState('');

  ///
  const onCreateCategorySubmit = async (e) => {
    e.preventDefault();

    const data = {
      name: categoryName,
      description: categoryDesc
    }
    await categoryAPI.createCategory(data).then(() => {
      toast.success('Data berhasil disimpan', {
        position: "top-right",
        autoClose: 2000,
        theme: "light",
      });
      getCategory()
      setCategoryName('')
      setCategoryDesc('')
    }).catch(error => {

    })
  }

  // Handle Modal
  const [modal, setModal] = useState(false);
  const [dataId, setDataId] = useState('');
  const handleCloseModal = () => {
    setModal(false)
    getCategory();
  }
  const handleReloadData = () => {
    getCategory();
  }
  const onUpdate = (barcode) => {
    setModal(true);
    setDataId(barcode)
  }
  useEffect(() => {
    handleReloadData()
  }, [keyword, page])
  useEffect(() => {
    document.title = 'Kategori'
    handleReloadData()
  }, []);
  return (
    <div>
      <div className="page-header w-100 bg-white p-2 mt-3">
        <h4>Kelola Kategori</h4>
      </div>
      <Tabs button={button}>
        <div className="tab-pane fade show active" id="nav-category" role="tabpanel" aria-labelledby="nav-home-tab">
          <NewTable
            data={dataTable.data}
            rows={dataTable.totalItems}
            columns={columns}
            limit={limit}
            onChangePage={page => setPage(page)}
            onSearch={handleSearch}
            progress={progress}
            isExport={false}
          />
        </div>
        <div className="tab-pane fade" id="nav-add-category" role="tabpanel" aria-labelledby="nav-profile-tab">
          <form method='post' onSubmit={onCreateCategorySubmit}>
            <div className="row">
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="">Name</label>
                  <input type="text" className="form-control form-control-sm" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} required placeholder="Antibiotik" />
                </div>
                <div className="form-group">
                  <label htmlFor="">Description</label>
                  <input type="text" className="form-control form-control-sm" value={categoryDesc} onChange={(e) => setCategoryDesc(e.target.value)} required placeholder="-" />
                  <small className="text-muted">Berikan nilai "-" jika tidak di isi</small>
                </div>
              </div>
            </div>
            <div className="form-group d-flex gap-2 my-3">
              <button className="btn btn-primary btn-sm" type="submit">Simpan</button>
              <button className="btn btn-danger btn-sm" type="reset">Reset</button>
            </div>
          </form>
        </div>
      </Tabs>
      <ModalUpdateCategory
        show={modal}
        onClose={handleCloseModal}
        dataId={dataId}
        reloadData={handleReloadData}
      />
    </div>

  );
}
