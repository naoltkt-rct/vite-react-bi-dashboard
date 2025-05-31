/**
 * 文言変換
 */
// 職種
export const formatJobJA = (value: string) => {
  switch (value) {
    case 'director':
      return 'ディレクター'
    case 'designer':
      return 'デザイナー'
    case 'frontend':
      return 'フロントエンドエンジニア'
    case 'backend':
      return 'バックエンドエンジニア'
    default:
      return value
  }
}

// 優先度
export const formatPriorityJA = (value: string) => {
  switch (value) {
    case 'high':
      return '高'
    case 'middle':
      return '中'
    case 'low':
      return '低'
    default:
      return value
  }
}

// 状態
export const formatStatusJA = (value: string) => {
  switch (value) {
    case 'waiting':
      return '未対応'
    case 'processing':
      return '対応中'
    case 'completed':
      return '対応済み'
    case 'done':
      return '完了'
    default:
      return value
  }
}

// 並び替え
export const formatSortJA = (value: string) => {
  switch (value) {
    case 'priority':
      return '優先度'
    case 'status':
      return '状態'
    case 'startDate':
      return '開始日'
    case 'endDate':
      return '期限日'
    default:
      return value
  }
}

// 並び替え
export const formatGenderJA = (value: string) => {
  switch (value) {
    case 'MALE':
      return '男性'
    case 'FEMALE':
      return '女性'
    case 'OTHER':
      return 'その他'
    default:
      return value
  }
}

/**
 * ファイル変換
 */
// Base64変換用
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })
}

// URL変換用
export const urlToFile = (url: string, fileName: string): Promise<File> => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const file = new File([blob], fileName, { type: blob.type })
        resolve(file)
      })
      .catch((error) => reject(error))
  })
}
