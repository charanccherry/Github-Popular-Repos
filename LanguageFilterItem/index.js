import './index.css'

const LanguageFilterItem = props => {
  const {languageDetails, languageSelect, isActive} = props

  const onClickLanguage = () => {
    languageSelect(languageDetails.id)
  }

  const buttonClassName = isActive
    ? 'active-language-button'
    : 'language-button'

  return (
    <>
      <li>
        <button
          className={buttonClassName}
          type="button"
          onClick={onClickLanguage}
        >
          {languageDetails.language}
        </button>
      </li>
    </>
  )
}
export default LanguageFilterItem
