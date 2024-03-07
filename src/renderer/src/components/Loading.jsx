import loadingsvg from '../assets/loading-color.svg'
export default function Loading({ show, text }) {
  return (
    <div className={`loading-component ${show ? 'show' : ''} w-100 h-100 position-absolute top-0 start-0 d-flex justify-content-center align-items-center`}>
      <img src={loadingsvg} alt="loading" height={50}
        width={50} />
      <small className='text-muted d-block'>{text ? text : 'Prosess...'}</small>
    </div>
  )
}