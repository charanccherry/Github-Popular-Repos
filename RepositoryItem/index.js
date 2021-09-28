import './index.css'
import {FcRating} from 'react-icons/fc'
import {ImStatsDots} from 'react-icons/im'
import {GoIssueOpened} from 'react-icons/go'

const RepositoryItem = props => {
  const {repoDetails} = props

  return (
    <>
      <li className="repo-item">
        <img
          src={repoDetails.avatarUrl}
          className="avatar-url"
          alt={repoDetails.name}
        />
        <div className="repo-info">
          <h1 className="head-text">{repoDetails.name}</h1>
        </div>
        <div className="repo-info">
          <FcRating className="icon1" />
          <p className="text">{repoDetails.starsCount}</p>
        </div>
        <div className="repo-info">
          <ImStatsDots className="icon1" />
          <p className="text">{repoDetails.forksCount}</p>
        </div>
        <div className="repo-info">
          <GoIssueOpened className="icon" />
          <p className="text">{repoDetails.issuesCount}</p>
        </div>
      </li>
    </>
  )
}
export default RepositoryItem
