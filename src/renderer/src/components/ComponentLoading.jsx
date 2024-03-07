import LoadingSvg from '../assets/loading.svg'
export default function ComponentLoading({ show }) {

  return (
    <div className={`component-loading ${show ? 'show' : ''}`}>
      <img src={LoadingSvg} alt="" />
      <h1>Liading....</h1>
    </div>
  )
}