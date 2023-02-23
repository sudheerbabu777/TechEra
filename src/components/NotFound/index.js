import Header from '../Header'
import './index.css'

const NotFound = () => (
  <>
    <Header />
    <div className="container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/not-found-img.png"
        alt="not found"
        className="not-image"
      />
      <h1 className="failure-title">Page Not Found</h1>
      <p className="failure-mag">
        We are sorry, the page you requested could not be found
      </p>
    </div>
  </>
)

export default NotFound
