import {Component} from 'react'
import Loader from 'react-loader-spinner'

import './index.css'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiUrl = 'https://apis.ccbp.in/popular-repos?language='

class GithubPopularRepos extends Component {
  state = {
    popularRepos: [],
    apiStatus: apiStatusConstants.initial,
    activeLanguageFilter: languageFiltersData[0].id,
  }

  componentDidMount() {
    this.getGitRepoData()
  }

  getGitRepoData = async () => {
    const {activeLanguageFilter} = this.state

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const response = await fetch(`${apiUrl}${activeLanguageFilter}`)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.popular_repos.map(eachItem => ({
        avatarUrl: eachItem.avatar_url,
        forksCount: eachItem.forks_count,
        id: eachItem.id,
        issuesCount: eachItem.issues_count,
        name: eachItem.name,
        starsCount: eachItem.stars_count,
      }))

      this.setState({
        popularRepos: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderFailureView = () => (
    <div className="error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="error-view-image"
      />
      <h1 className="error-message">Something Went Wrong</h1>
    </div>
  )

  renderRepositoryList = () => {
    const {popularRepos} = this.state
    return (
      <ul className="repo-display-items">
        {popularRepos.map(eachItem => (
          <RepositoryItem key={eachItem.id} repoDetails={eachItem} />
        ))}
      </ul>
    )
  }

  renderApiStatusView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRepositoryList()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  languageSelect = newFilterID => {
    this.setState({activeLanguageFilter: newFilterID}, this.getGitRepoData)
  }

  renderLanguageFilterList = () => {
    const {activeLanguageFilter} = this.state
    return (
      <div className="language-filter-tab">
        {languageFiltersData.map(eachItem => (
          <LanguageFilterItem
            key={eachItem.id}
            languageDetails={eachItem}
            isActive={eachItem.id === activeLanguageFilter}
            languageSelect={this.languageSelect}
          />
        ))}
      </div>
    )
  }

  render() {
    return (
      <div className="github-home">
        <h1 className="heading">Git Popular Repos</h1>
        {this.renderLanguageFilterList()}
        {this.renderApiStatusView()}
      </div>
    )
  }
}

export default GithubPopularRepos
