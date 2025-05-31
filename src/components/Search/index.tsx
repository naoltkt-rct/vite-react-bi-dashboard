// hooks
import { useSearch } from '@/components/Search/hooks'

// styles
import {
  search,
  searchButton,
  searchButtonIcon,
  searchInput,
} from '@/components/Search/styles.css'

// types
type Props = {
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>
  setSearchTotal: React.Dispatch<React.SetStateAction<number | null>>
} & React.InputHTMLAttributes<HTMLInputElement>

export default function Search({
  setSearchQuery,
  setSearchTotal,
  ...props
}: Props) {
  const {
    inputValue,
    isFocus,
    setIsFocus,
    refs,
    handleOnSearch,
    handleInputChange,
    handleInputClear,
  } = useSearch(setSearchQuery, setSearchTotal)

  return (
    <div
      className={search[isFocus || inputValue.trim() ? 'typing' : 'default']}
    >
      <button
        type="button"
        onClick={(event) =>
          handleOnSearch(event, refs.current?.value || '', 'button')
        }
        disabled={!inputValue.trim()}
        className={searchButton}
      >
        <img src="/icons/search.svg" alt="" className={searchButtonIcon} />
      </button>
      <input
        type="search"
        onKeyDown={(event) => handleOnSearch(event, refs.current?.value || '')}
        onChange={handleInputChange}
        onFocus={(event) => {
          event.stopPropagation()
          setIsFocus(true)
        }}
        onBlur={(event) => {
          event.stopPropagation()
          setIsFocus(false)
        }}
        ref={refs}
        className={searchInput}
        {...props}
      />
      <button
        type="button"
        onClick={handleInputClear}
        disabled={!inputValue.trim()}
        className={searchButton}
      >
        <img src="/icons/close.svg" alt="" className={searchButtonIcon} />
      </button>
    </div>
  )
}
