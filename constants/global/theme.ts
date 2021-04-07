interface baseColors {
  mainSurface: string
  mainText: string
  mainLightSurface: string
  mainLightText: string
}

const mainPalette: baseColors = {
  mainSurface: 'bg-red-500',
  mainText: 'text-red-500',
  mainLightSurface: 'bg-red-300',
  mainLightText: 'text-red-300',
}

export interface Theme extends baseColors {
  surface: string
  surfaceBackground: string
  textColor: string
  textColorSecondary: string
}

export const darkTheme: Theme = {
  ...mainPalette,
  surfaceBackground: 'bg-gray-900',
  surface: 'bg-gray-800',
  textColor: 'text-gray-50',
  textColorSecondary: 'text-gray-150',
}

export const lightTheme: Theme = {
  ...mainPalette,
  surfaceBackground: 'bg-gray-150',
  surface: 'bg-gray-50',
  textColor: 'text-gray-900',
  textColorSecondary: 'text-gray-700',
}
