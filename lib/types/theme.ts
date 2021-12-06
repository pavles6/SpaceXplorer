export interface PrimaryColors {
  surfacePrimary: string
  textPrimary: string
  colorPrimary: string
  colorPrimaryAccent: string
  borderPrimary: string
  iconPrimary: string
}

export interface Colors {
  surface: string
  surfaceBackground: string
  text: string
  textAccent: string
  textSecondary: string
  iconAccent: string
  iconSecondary: string
  surfaceDisabled: string
  textDisabled: string
  colorDisabled: string
  border: string
}

type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K]
}

type PaletteFields =
  | 'border'
  | 'surface'
  | 'light:surface'
  | 'dark:surface'
  | 'surfaceBackground'
  | 'light:surfaceBackground'
  | 'dark:surfaceBackground'
  | 'text'
  | 'light:text'
  | 'dark:text'
  | 'textAccent'
  | 'lighttextAccent'
  | 'dark:textAccent'
  | 'textSecondary'
  | 'light:textSecondary'
  | 'dark:textSecondary'
  | 'iconAccent'
  | 'light:iconAccent'
  | 'dark:iconAccent'
  | 'iconSecondary'
  | 'light:iconSecondary'
  | 'dark:iconSecondary'
  | 'surfaceDisabled'
  | 'light:surfaceDisabled'
  | 'dark:surfaceDisabled'
  | 'textDisabled'
  | 'light:textDisabled'
  | 'dark:textDisabled'
  | 'colorDisabled'
  | 'light:colorDisabled'
  | 'dark:colorDisabled'

type PalettePrimaryFields =
  | 'surfacePrimary'
  | 'textPrimary'
  | 'colorPrimary'
  | 'colorPrimaryAccent'
  | 'borderPrimary'
  | 'iconPrimary'

type PaletteBaseFields = PalettePrimaryFields | PaletteFields

interface PaletteDraft {
  base: {
    [K in PaletteBaseFields]: string
  }
  xs: {
    [K in PaletteFields]: string
  }
  sm: {
    [K in PaletteFields]: string
  }
  md: {
    [K in PaletteFields]: string
  }
  lg: {
    [K in PaletteFields]: string
  }
  xl: {
    [K in PaletteFields]: string
  }
  '2xl': {
    [K in PaletteFields]: string
  }
  hover: {
    [K in PaletteFields]: string
  }
  focus: {
    [K in PaletteFields]: string
  }
  disabled: {
    [K in PaletteFields]: string
  }
}

export interface Palette extends DeepPartial<PaletteDraft> {}
