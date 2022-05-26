import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import PasswordItem from '../PasswordItem'
import NoPasswords from '../NoPasswords'
import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class PasswordManager extends Component {
  state = {
    website: '',
    username: '',
    password: '',
    passwordManagerList: [],
    search: '',
    checkbox: false,
  }

  onDelete = deletedId => {
    this.setState(prevState => ({
      passwordManagerList: prevState.passwordManagerList.filter(
        eachItem => eachItem.id !== deletedId,
      ),
    }))
  }

  onChangeSearch = event => {
    this.setState({search: event.target.value})
  }

  onSubmitForm = event => {
    event.preventDefault()
    const {website, username, password} = this.state
    const initialBackgroundColorClassName = `first-letter ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`

    const newPasswordList = {
      id: uuidv4(),
      websiteName: website,
      userName: username,
      passwordUser: password,
      initialClassName: initialBackgroundColorClassName,
    }
    this.setState(prevState => ({
      passwordManagerList: [...prevState.passwordManagerList, newPasswordList],
      website: '',
      username: '',
      password: '',
    }))
  }

  onClickCheckBox = () => {
    this.setState(prevState => ({
      checkbox: !prevState.checkbox,
    }))
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangeWebsite = event => {
    this.setState({website: event.target.value})
  }

  getSearchResult = () => {
    const {search, passwordManagerList} = this.state
    const searchResults = passwordManagerList.filter(eachItem =>
      eachItem.websiteName.toLowerCase().includes(search.toLowerCase()),
    )
    return searchResults
  }

  render() {
    const {
      website,
      username,
      password,
      passwordManagerList,
      search,
      checkbox,
    } = this.state

    const searchResult = this.getSearchResult()
    const countPasswords = searchResult.length
    console.log(passwordManagerList)

    return (
      <div className="bg-container">
        <div className="sub-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="password-manager-image"
          />
          <div className="top-container">
            <div className="card-container">
              <h1 className="card-heading">Add New Password</h1>
              <form className="form-container" onSubmit={this.onSubmitForm}>
                <div className="input-box-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                    alt="website"
                    className="image-input-box"
                  />
                  <input
                    type="text"
                    className="input-box"
                    placeholder="Enter Website"
                    onChange={this.onChangeWebsite}
                    value={website}
                  />
                </div>
                <div className="input-box-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png "
                    alt="username"
                    className="image-input-box"
                  />
                  <input
                    type="text"
                    className="input-box"
                    placeholder="Enter Username"
                    onChange={this.onChangeUsername}
                    value={username}
                  />
                </div>
                <div className="input-box-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                    alt="password"
                    className="image-input-box"
                  />
                  <input
                    type="password"
                    className="input-box"
                    placeholder="Enter Password"
                    onChange={this.onChangePassword}
                    value={password}
                  />
                </div>
                <div className="box-container">
                  <button type="submit" className="add-button">
                    Add
                  </button>
                </div>
              </form>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png "
              alt="password manager"
              className="top-container-image"
            />
          </div>
          <div className="bottom-container">
            <div className="bottom-top-container">
              <div className="password-count-container">
                <h1 className="your-password-text">Your Passwords</h1>
                <p className="count-text">{countPasswords}</p>
              </div>
              <div className="input-box-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                  className="image-input-box"
                />
                <input
                  type="search"
                  className="input-box"
                  placeholder="Search"
                  onChange={this.onChangeSearch}
                  value={search}
                />
              </div>
            </div>
            <hr />
            <div className="show-passwords-container">
              <input
                type="checkbox"
                className="checkbox"
                onClick={this.onClickCheckBox}
                value={checkbox}
                id="checkbox"
              />
              <label htmlFor="checkbox" className="show-password-text">
                Show Passwords
              </label>
            </div>
            <ul
              className={
                countPasswords === 0
                  ? 'No-passwords-unordered-list'
                  : 'un-ordered-list-container'
              }
            >
              {countPasswords === 0 ? (
                <NoPasswords />
              ) : (
                searchResult.map(eachItem => (
                  <PasswordItem
                    key={eachItem.id}
                    itemDetails={eachItem}
                    onDelete={this.onDelete}
                    checkBox={checkbox}
                  />
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default PasswordManager
