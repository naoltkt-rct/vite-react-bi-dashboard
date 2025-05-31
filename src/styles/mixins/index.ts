// styles
import { WIDTH_PC } from '@/styles/themes'

export class Mixins {
  /**
   * font
   */
  // font-size を rem で算出
  fz(size: number = 16): string {
    return `${size / 16}rem`
  }
  // font-size を dvw で算出
  dvfz(size: number = 10, viewport: number = WIDTH_PC): string {
    return this.dvw(size, viewport)
  }

  /**
   * width
   */
  // width を dvw で算出
  dvw(size: number, viewport: number = WIDTH_PC): string {
    return `${(((100 / viewport) * size) as number) * 1}dvw`
  }
  // CSS 比較関数 （min, max）
  mdv(
    size: number,
    viewport: number = WIDTH_PC,
    type: 'width' | 'font' = 'width',
    condition: 'min' | 'max' = 'min',
  ): string {
    const value = `${type === 'width' ? this.dvw(size, viewport) : this.dvfz(size, viewport)}, ${type === 'width' ? `${size}px` : this.fz(size)}`
    return condition === 'min' ? `min(${value})` : `max(${value}) `
  }

  /**
   * color
   */
  // hex を rgba で算出
  hexToRgba(hex: string, alpha: number = 1): string {
    // 3桁の形式（#fff）を6桁に展開
    const expanded: string =
      hex.length === 4
        ? `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`
        : hex
    const arrays: { r: number; g: number; b: number } = {
      r: parseInt(expanded.slice(1, 3), 16),
      g: parseInt(expanded.slice(3, 5), 16),
      b: parseInt(expanded.slice(5, 7), 16),
    }
    return `rgba(${arrays.r}, ${arrays.g}, ${arrays.b}, ${alpha})`
  }

  /**
   * other
   */
  // styleVariants の引数用の Object を生成する
  forLoopClasses(prefix: string, length: number): Record<string, number> {
    return Array.from({ length }, (_, i) => ({ [`${prefix}-${i}`]: i })).reduce(
      (accumulator, current) => ({ ...accumulator, ...current }),
      {},
    )
  }
}

export const mixins = new Mixins()
