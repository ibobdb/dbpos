export default function SearchDropDown({ list, onClick, show, columns }) {
  return (
    <div className={`search-dropdown shadow ${show ? 'd-block' : 'd-none'}`}>
      <small className="text-muted">Hasil Pencarian</small><br />
      <ul className="list-group list-group-flush">
        {list && list.map((item, i) => {
          return (
            <li className={`list-group-item d-flex justify-content-between align-items-start ${columns.condition && columns.condition.background(item)}`}
              key={i}
              onClick={() => onClick(item)}
            >
              <div className="me-auto">
                {item[columns.title]}
              </div>
              {item[columns.subTitle]}
            </li>
          )
        })}
      </ul>
    </div>
  )
}