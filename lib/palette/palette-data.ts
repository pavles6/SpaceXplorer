import { PrimaryColors, Colors, Palette } from '../types/theme'

const mainPalette: PrimaryColors = {
  surfacePrimary: 'bg-red-500',
  textPrimary: 'text-red-500',
  iconPrimary: 'text-red-500',
  colorPrimary: 'red-500',
  colorPrimaryAccent: 'red-400',
  borderPrimary: 'border-red-500',
}

const darkTheme: Colors = {
  surfaceDisabled: 'bg-gray-700',
  textDisabled: 'text-gray-400',
  colorDisabled: 'gray-400',
  surfaceBackground: 'bg-gray-900',
  surface: 'bg-gray-800',
  textAccent: 'text-white',
  text: 'text-gray-300',
  textSecondary: 'text-gray-400',
  iconAccent: 'text-white',
  iconSecondary: 'text-gray-300',
  border: 'border-gray-50',
}

const lightTheme: Colors = {
  surfaceDisabled: 'bg-gray-400',
  textDisabled: 'text-gray-400',
  colorDisabled: 'gray-800',
  surfaceBackground: 'bg-gray-200',
  surface: 'bg-gray-100',
  textAccent: 'text-black',
  text: 'text-gray-700',
  textSecondary: 'text-gray-600',
  iconAccent: 'text-black',
  iconSecondary: 'text-gray-600',
  border: 'border-gray-900',
}

const palette: Palette = {}

const extensions = [
  'base',
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  '2xl',
  'hover',
  'focus',
  'disabled',
]

for (let ext of extensions) palette[ext] = {}

palette.base = { ...mainPalette }

for (let key of Object.keys(darkTheme)) {
  if (key === 'border') {
    for (let ext of extensions)
      palette[ext][`${key}`] = `${
        ext === 'base' ? '' : ext + ':'
      }dark:border-opacity-10 ${
        ext === 'base' ? '' : ext + ':'
      }border-opacity-10 ${ext === 'base' ? '' : ext + ':'}${lightTheme[key]} ${
        ext === 'base' ? '' : ext + ':'
      }dark:${darkTheme[key]}`
  } else {
    for (let ext of extensions)
      palette[ext][`light:${key}`] = `${ext === 'base' ? '' : ext + ':'}${
        lightTheme[key]
      }`

    for (let ext of extensions)
      palette[ext][`dark:${key}`] = `${
        ext === 'base' ? '' : ext === 'hover' ? `dark:${ext}:` : ext + ':'
      }${darkTheme[key]}`

    for (let ext of extensions)
      palette[ext][`${key}`] = `${ext === 'base' ? '' : ext + ':'}${
        lightTheme[key]
      } ${ext === 'base' ? '' : ext + ':'}dark:${darkTheme[key]}`
  }
}

export default palette
