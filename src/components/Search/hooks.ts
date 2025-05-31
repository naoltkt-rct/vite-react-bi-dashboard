// packages
import { useRef, useState } from 'react'

export function useSearch(
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>,
  setSearchTotal: React.Dispatch<React.SetStateAction<number | null>>,
) {
  // useState
  const [inputValue, setInputValue] = useState<string>('')
  const [isFocus, setIsFocus] = useState<boolean>(false)

  // useRef
  const refs = useRef<HTMLInputElement>(null)

  // 検索キーワードを更新
  function handleOnSearch(
    event:
      | React.KeyboardEvent<HTMLInputElement>
      | React.MouseEvent<HTMLButtonElement>,
    query: string,
    type: 'enter' | 'button' = 'enter',
  ) {
    // 空文字の場合は無視
    if (query.trim() === '') return

    if (type === 'enter') {
      // 文字変換中の Enter は無視
      if (
        (event as React.KeyboardEvent<HTMLInputElement>).key === 'Enter' &&
        (event as React.KeyboardEvent<HTMLInputElement>).nativeEvent.isComposing
      )
        return
      // Enter で検索
      if ((event as React.KeyboardEvent<HTMLInputElement>).key === 'Enter') {
        setSearchQuery(query)
        setSearchTotal(null)
      }
    } else {
      event.stopPropagation()
      // ボタン押下で検索
      setSearchQuery(query)
      setSearchTotal(null)
    }
  }

  // 入力値の変更を監視
  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value
    setInputValue(value)
  }

  // 入力値をクリア
  function handleInputClear(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation()
    setInputValue('')
    setIsFocus(false)
    setSearchQuery('')
    setSearchTotal(null)
    if (refs.current) refs.current.value = ''
  }

  return {
    inputValue,
    isFocus,
    setIsFocus,
    refs,
    handleOnSearch,
    handleInputChange,
    handleInputClear,
  }
}
