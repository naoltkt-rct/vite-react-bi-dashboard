// packages
import { useCallback, useEffect, useRef, useState } from 'react'

// types
import type { Option } from '@/types/styles'

export function useSelect(options: Option[]) {
  // useState
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [selected, setSelected] = useState<string>('')

  // useRef
  const refs = useRef<HTMLDivElement>(null)
  const initialOptions = useRef<Option[] | null>(null)
  const initialValues = useRef<string | null>(null)

  // useCallback
  const handleOnClose = useCallback((event: MouseEvent) => {
    if (refs.current && !refs.current.contains(event.target as Node))
      setIsOpen(false)
  }, [])

  // useEffect
  // Select外のクリックを検知して閉じる
  useEffect(() => {
    if (isOpen) document.addEventListener('click', handleOnClose)
    return () => {
      document.removeEventListener('click', handleOnClose)
    }
  }, [isOpen])

  // 初回の options を保存
  useEffect(() => {
    if (!initialOptions.current) initialOptions.current = options
  }, [options])

  // options の変更を検知
  useEffect(() => {
    if (
      initialOptions.current &&
      JSON.stringify(initialOptions.current) !== JSON.stringify(options)
    ) {
      // 初期値が存在し、現在のオプションに含まれていない場合
      if (
        initialValues.current &&
        !options.some(
          (option: Option) => option.value === initialValues.current,
        ) &&
        selected === ''
      )
        handleSelectRegeneration()
    }
    // options が更新され、 selected の値を含まない場合
    if (options.some((option: Option) => option.value !== selected))
      setSelected(options[0].value)
  }, [options, selected])

  // 初期値が存在しない場合、または初期値が現在のオプションに含まれていない場合、最初のオプションを選択する
  function handleSelectRegeneration() {
    // 最初のオプションを選択する
    refs.current?.getElementsByTagName('button')[1].click()
  }

  return {
    isOpen,
    setIsOpen,
    selected,
    setSelected,
    refs,
    initialValues,
  }
}
