import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import CourseItem from '../CouresItem'
import './index.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

const apiStatusCheck = {
  initial: 'INITIAL',
  inProgress: 'IN PRoGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    courseList: [],
    apiStatus: apiStatusCheck.initial,
  }

  componentDidMount() {
    this.getCourseList()
  }

  getCourseList = async () => {
    this.setState({apiStatus: apiStatusCheck.inProgress})
    const url = 'https://apis.ccbp.in/te/courses'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      const newCourse = data.courses

      const updateCourse = newCourse.map(each => ({
        id: each.id,
        name: each.name,
        logoUrl: each.logo_url,
      }))
      this.setState({
        courseList: updateCourse,
        apiStatus: apiStatusCheck.success,
      })
    } else {
      this.setState({apiStatus: apiStatusCheck.failure})
    }
  }

  renderCourseList = () => {
    const {courseList} = this.state
    console.log(courseList)
    return (
      <>
        <h1 className="title">Courses</h1>
        <ul className="list">
          {courseList.map(each => (
            <CourseItem courseDetails={each} key={each.id} />
          ))}
        </ul>
      </>
    )
  }

  renderLoader = () => (
    <div data-testid="loader" className="app-container">
      <Loader type="ThreeDots" color="#000dff" height={80} width={80} />
    </div>
  )

  onClickButton = () => {
    this.getCourseList()
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
        return this.renderCourseList()
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
        <div className="app-container">{this.renderApiStatus()}</div>
      </>
    )
  }
}

export default Home
