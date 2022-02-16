import {Component} from 'react'
import './index.css'
import {v4} from 'uuid'
import PasswordItem from '../PasswordItem'

let initializeList = []

class PasswordManager extends Component {
  state = {
    website: '',
    username: '',
    password: '',
    passwordList: initializeList,
    isChecked: false,
    searchInput: '',
  }

  onUpdateWebsite = event => {
    this.setState({website: event.target.value})
  }

  onUpdateUsername = event => {
    this.setState({username: event.target.value})
  }

  onUpdatePassword = event => {
    this.setState({password: event.target.value})
  }

  addPassword = event => {
    event.preventDefault()
    const {website, username, password} = this.state
    const newPassword = {
      id: v4(),
      website,
      username,
      password,
    }
    initializeList.push(newPassword)

    this.setState({
      passwordList: initializeList,
      website: '',
      username: '',
      password: '',
    })
  }

  onChecked = event => {
    this.setState({isChecked: event.target.checked})
  }

  onClickButton = id => {
    const newList = initializeList.filter(eachItem => eachItem.id !== id)
    initializeList = newList
    this.setState({
      passwordList: newList,
    })
  }

  onSearchInput = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  renderPasswords = () => {
    const {passwordList, isChecked, searchInput} = this.state
    const newList = passwordList.filter(eachItem =>
      eachItem.website.toLowerCase().includes(searchInput.toLowerCase()),
    )
    let renderItem = null
    if (newList.length === 0) {
      renderItem = (
        <div className="no-password-card">
          <img
            className="no-password-image"
            src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
            alt="no passwords"
          />
          <p className="no-password">No Passwords</p>
        </div>
      )
    } else {
      renderItem = (
        <ul className="passwords-list">
          {newList.map(eachItem => (
            <PasswordItem
              passwordObject={eachItem}
              key={eachItem.id}
              isChecked={isChecked}
              onClickButton={this.onClickButton}
            />
          ))}
        </ul>
      )
    }
    return renderItem
  }

  render() {
    const {passwordList, website, username, password, searchInput} = this.state
    const newList = passwordList.filter(eachItem =>
      eachItem.website.toLowerCase().includes(searchInput.toLowerCase()),
    )
    return (
      <div className="app-container">
        <div className="password-manager">
          <img
            alt="app logo"
            className="app-logo"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          />
          <div className="input-container">
            <div className="small-image-container">
              <img
                className="small-img"
                alt="password manager"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
              />
            </div>
            <form className="form" onSubmit={this.addPassword}>
              <h1 className="form-heading">Add New Password</h1>
              <div className="input-card">
                <div className="input-logo-card">
                  <img
                    className="input-logo"
                    alt="website"
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  />
                </div>
                <input
                  type="text"
                  className="input"
                  placeholder="Enter Website"
                  value={website}
                  onChange={this.onUpdateWebsite}
                />
              </div>
              <div className="input-card">
                <div className="input-logo-card">
                  <img
                    className="input-logo"
                    alt="username"
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  />
                </div>
                <input
                  type="text"
                  className="input"
                  placeholder="Enter Username"
                  value={username}
                  onChange={this.onUpdateUsername}
                />
              </div>
              <div className="input-card">
                <div className="input-logo-card">
                  <img
                    className="input-logo"
                    alt="password"
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  />
                </div>
                <input
                  type="password"
                  className="input"
                  placeholder="Enter Password"
                  value={password}
                  onChange={this.onUpdatePassword}
                />
              </div>
              <button type="submit" className="button">
                Add
              </button>
            </form>
            <div className="large-image-container">
              <img
                className="large-img"
                alt="password manager"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              />
            </div>
          </div>
          <div className="passwords-container">
            <div className="passwords-header">
              <div className="count-container">
                <h1 className="passwords-heading">Your Passwords</h1>
                <div className="count-card">
                  <p className="count">{newList.length}</p>
                </div>
              </div>
              <div className="search-input-card">
                <div className="search-logo-card">
                  <img
                    className="search-logo"
                    alt="search"
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  />
                </div>
                <input
                  type="search"
                  className="search-input"
                  placeholder="Search"
                  onChange={this.onSearchInput}
                />
              </div>
            </div>
            <hr className="line" />
            <div className="checkbox-card">
              <input
                onChange={this.onChecked}
                className="checkbox"
                type="checkbox"
                id="showPasswords"
              />
              <label className="check-label" htmlFor="showPasswords">
                Show Passwords
              </label>
            </div>
            <div className="password-card">{this.renderPasswords()}</div>
          </div>
        </div>
      </div>
    )
  }
}
export default PasswordManager
