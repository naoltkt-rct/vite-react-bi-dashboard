// packages
import { DragEvent, forwardRef } from 'react'

// components
import Button from '@/components/Button'

// hooks
import { useImageUpload } from '@/components/ImageUpload/hooks'

// styles
import {
  fileImage,
  fileNames,
  filePreview,
  filePreviewContent,
  filePreviewFigure,
  fileUpload,
  hiddenInput,
} from '@/components/ImageUpload/styles.css'
import LabelWrapper from '@/components/Label'

// types
import type { Label } from '@/types/styles'
type Props = {
  onFileUpload: (file: File) => void
  labels?: Label
  files?: File | null
  setFiles: React.Dispatch<React.SetStateAction<File | null>>
} & React.InputHTMLAttributes<HTMLInputElement>

const ImageUpload = forwardRef<HTMLInputElement, Props>(function InputInner(
  { onFileUpload, labels, files, setFiles, id, ...props }: Props,
  ref,
) {
  const { isDragActive, setIsDragActive, handleDrop, handleFileChange } =
    useImageUpload(onFileUpload)
  // 表示用
  function renderImageUploadController() {
    return files ? renderPreview() : renderImageUpload()
  }
  // 制御用
  function hiddenImageUploadController() {
    return (
      <input
        type="file"
        accept="image/*"
        id={id}
        ref={ref}
        className={hiddenInput}
        {...props}
        onChange={handleFileChange}
      />
    )
  }

  // dnd
  function renderImageUpload() {
    return (
      <div
        onDragEnter={(event: DragEvent<HTMLDivElement>) => {
          event.preventDefault()
          event.stopPropagation()
          setIsDragActive(true)
        }}
        onDragOver={(event: DragEvent<HTMLDivElement>) => {
          event.preventDefault()
          event.stopPropagation()
          setIsDragActive(true)
        }}
        onDragLeave={(event: DragEvent<HTMLDivElement>) => {
          event.preventDefault()
          event.stopPropagation()
          setIsDragActive(false)
        }}
        onDrop={handleDrop}
        className={fileUpload[isDragActive ? 'active' : 'inactive']}
      >
        {hiddenImageUploadController()}
        <p>画像をドラッグ&ドロップするか、クリックしてファイルを選択</p>
      </div>
    )
  }

  // preview
  function renderPreview() {
    return (
      <div className={filePreview}>
        <figure className={filePreviewFigure}>
          <img
            src={URL.createObjectURL(files as File)}
            alt="プロフィール画像"
            className={fileImage}
          />
        </figure>
        <div className={filePreviewContent}>
          <p className={fileNames}>ファイル名：{files?.name}</p>
          <Button
            onClick={(event) => {
              event.stopPropagation()
              setFiles(null)
            }}
          >
            削除
          </Button>
        </div>
      </div>
    )
  }

  return labels ? (
    <LabelWrapper id={id as string} labels={labels} required={props.required}>
      {renderImageUploadController()}
    </LabelWrapper>
  ) : (
    renderImageUploadController()
  )
})

export default ImageUpload
