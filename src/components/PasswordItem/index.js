import './index.css'

const PasswordItem = props => {
  const {passwordObject, isChecked, onClickButton} = props
  const {website, username, password, id} = passwordObject

  const starsUrl =
    'https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png'
  const initial = website[0].toUpperCase()

  const renderPassword = () => {
    let renderItem = null
    if (isChecked) {
      renderItem = <p className="password">{password}</p>
    } else {
      renderItem = <img className="stars" src={starsUrl} alt="stars" />
    }
    return renderItem
  }
  const onClickDelete = () => {
    onClickButton(id)
  }

  return (
    <li className="password-item">
      <div className="details-container">
        <div className="initial-card">
          <p className="initial">{initial}</p>
        </div>
        <div className="pass-details-card">
          <p className="website">{website}</p>
          <p className="username">{username}</p>
          {renderPassword()}
        </div>
      </div>
      <button
        testid="delete"
        onClick={onClickDelete}
        className="delete-button"
        type="button"
      >
        <img
          className="delete-logo"
          alt="delete"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
        />
      </button>
    </li>
  )
}
export default PasswordItem
