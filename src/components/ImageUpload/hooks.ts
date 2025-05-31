// packages
import { ChangeEvent, DragEvent, useState } from 'react'

export function useImageUpload(onFileUpload: (file: File) => void) {
  // useState
  const [isDragActive, setIsDragActive] = useState<boolean>(false)

  // ドロップ時
  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
    setIsDragActive(false)

    if (
      event.dataTransfer.files.length > 0 &&
      event.dataTransfer.files[0].type.startsWith('image/')
    )
      onFileUpload(event.dataTransfer.files[0])
  }
  // ファイル選択時
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (
      event.target.files &&
      event.target.files.length > 0 &&
      event.target.files[0].type.startsWith('image/')
    )
      onFileUpload(event.target.files[0])
  }
  return {
    isDragActive,
    setIsDragActive,
    handleDrop,
    handleFileChange,
  }
}
