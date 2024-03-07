import LoadingSvg from '../assets/loading.svg'
export default function PageLoading({ show }) {
  return (
    <div className={`loading-wrapper ${show ? 'show' : ''}`}>
      <img src={LoadingSvg} alt="" />
    </div>
  )
}