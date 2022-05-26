import './index.css'

const PasswordItem = props => {
  const {itemDetails, onDelete, checkBox} = props
  const {
    id,
    websiteName,
    userName,
    passwordUser,
    initialClassName,
  } = itemDetails
  console.log(websiteName)
  console.log(userName)
  console.log(passwordUser)

  const passwordText = checkBox ? (
    passwordUser
  ) : (
    <img
      src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
      alt="stars"
      className="stars-image"
    />
  )

  const onDeleteItem = () => {
    onDelete(id)
  }

  return (
    <li className="list-container">
      <div className={initialClassName}>
        <p className="letter-style">{websiteName[0].toUpperCase()}</p>
      </div>
      <div className="password-description">
        <p className="site-name-text">{websiteName}</p>
        <p className="user-name-text">{userName}</p>
        <p className="password-text">{passwordText}</p>
      </div>
      <div>
        <button
          type="button"
          className="delete-button"
          testid="delete"
          onClick={onDeleteItem}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
            alt="delete"
            className="delete-button-img"
          />
        </button>
      </div>
    </li>
  )
}

export default PasswordItem
