// components
import Button from '@/components/Button'
import Modal from '@/components/Modal'

import { modalButtons } from '@/components/Modal/styles.css'
// styles
import { title } from '@/components/Title/styles.css'

// types
type Props = {
  isOpen: boolean
  onClose: () => void
  isVisible: boolean
  setIsVisible: (isVisible: boolean) => void
  onSubmit: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export default function TasksDeleteModal({
  isOpen,
  onClose,
  isVisible,
  setIsVisible,
  onSubmit,
}: Props) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isVisible={isVisible}
      setIsVisible={setIsVisible}
    >
      <h2 className={title({ type: 'default' })}>削除確認</h2>
      <p>選択した項目を削除してしまってよろしいですか?</p>
      <div className={modalButtons}>
        <Button type="submit" onClick={(event) => onSubmit(event)}>
          OK
        </Button>
        <Button type="button" onClick={() => setIsVisible(false)}>
          キャンセル
        </Button>
      </div>
    </Modal>
  )
}
