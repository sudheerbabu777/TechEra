import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

const apiStatusCheck = {
  initial: 'INITIAL',
  inProgress: 'IN PRoGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class CourseItemDetails extends Component {
  state = {
    courseDetails: {},

    apiStatus: apiStatusCheck.initial,
  }

  componentDidMount() {
    this.getCourseItemDetails()
  }

  getCourseItemDetails = async () => {
    this.setState({apiStatus: apiStatusCheck.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/te/courses/${id}`
    const option = {
      method: 'GET',
    }

    const response = await fetch(url, option)
    const data = await response.json()
    if (response.ok === true) {
      const newCourse = data.course_details
      const updateCourse = {
        id: newCourse.id,
        name: newCourse.name,
        imageUrl: newCourse.image_url,
        description: newCourse.description,
      }
      this.setState({
        courseDetails: updateCourse,
        apiStatus: apiStatusCheck.success,
      })
    } else {
      this.setState({apiStatus: apiStatusCheck.failure})
    }
  }

  renderCourseDetails = () => {
    const {courseDetails} = this.state
    console.log(courseDetails)
    const {imageUrl, description, name} = courseDetails

    return (
      <div className="details-container">
        <img src={imageUrl} alt={name} className="image-url" />
        <div className="name-container">
          <h1 className="name">{name}</h1>
          <p className="msg">{description}</p>
        </div>
      </div>
    )
  }

  renderLoader = () => (
    <div data-testid="loader" className="app-container">
      <Loader type="ThreeDots" color="#000dff" height={80} width={80} />
    </div>
  )

  onClickButton = () => {
    this.getCourseItemDetails()
  }

  renderFailure = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-title">Oops! Something Went Wrong</h1>
      <p className="failure-mag">
        We cannot seem to find the page you are looking for
      </p>
      <button type="button" className="button" onClick={this.onClickButton}>
        Retry
      </button>
    </div>
  )

  renderApiStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusCheck.inProgress:
        return this.renderLoader()
      case apiStatusCheck.success:
        return this.renderCourseDetails()
      case apiStatusCheck.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="course-details-container">{this.renderApiStatus()}</div>
      </>
    )
  }
}

export default CourseItemDetails
