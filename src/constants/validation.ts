//
export const VALIDATION = {
  REQUIRED: {
    value: true,
    message: '入力が必須の項目です。',
  },
  REQUIRED_SELECT: {
    value: true,
    message: '選択肢を選択してください',
  },
  MIN_LENGTH: (length: number) => `最小${length}文字です。`,
  MAX_LENGTH: (length: number) => `最大${length}文字です。`,
  HALF_WIDTH_ALPHANUMERIC: {
    value: /^[a-zA-Z0-9!-/:-@¥[-`{-~]+$/,
    message: '半角英数記号のみ（空文字NG）',
  },
  PASSWORD: {
    value: /^(?=.*[a-zA-Z])(?=.*\d).{8,32}$/,
    message:
      '8文字以上、32文字以下の少なくとも1つ以上の半角英字と数字をもつパスワードを入力してください。',
  },
  EMAIL: {
    value:
      /^(?=.{1,64}@)(?:(?:([A-Za-z0-9]+((?!.*\.\.)[A-Za-z0-9+_.-]*[A-Za-z0-9]))|[A-Za-z0-9]+))@(?:(?:[A-Za-z0-9](?:((?!.*\.\.)[A-Za-z0-9-.]*[A-Za-z0-9-.]))?\.)+[A-Za-z0-9](?:((?!.*\.\.)[A-Za-z0-9-.]*[A-Za-z0-9]))?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[A-Za-z0-9-]*[A-Za-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/,
    message: 'メールアドレスを入力してください。',
  },
  EXCLUDING_EMOJIS: {
    value: /^[^\uD800-\uDBFF\uDFFF\u2600-\u26FF\u2700-\u27BF]+$/,
    message: '絵文字以外の文字を入力してください。',
  },
  AGE: {
    value: /^(?:[1-9]\d*|0)$/, // 0以上の整数
    message: '0以上の整数を入力してください。',
  },
}
