/*
  text - base text color
  textAccent - lighter than base
  textSecondary - darker than base

  surface - surface color (navbars, menus, cards, etc)
  surfaceBackground - darker variant of surface(usually a bg color of a container)

*/

interface baseColors {
  mainSurface: string
  mainText: string
  mainTextAccent: string
  mainSurfaceAccent: string
  mainColor: string
  mainLightColor: string
}

const mainPalette: baseColors = {
  mainSurface: 'bg-red-500',
  mainText: 'text-red-500',
  mainTextAccent: 'text-red-600',
  mainSurfaceAccent: 'bg-red-600',
  mainColor: 'red-500',
  mainLightColor: 'red-400',
}

export interface Theme extends baseColors {
  surface: string
  surfaceBackground: string
  text: string
  textAccent: string
  textSecondary: string
}

export const darkTheme: Theme = {
  ...mainPalette,
  surfaceBackground: 'bg-gray-900',
  surface: 'bg-gray-800',
  textAccent: 'text-gray-50',
  text: 'text-gray-400',
  textSecondary: 'text-gray-400',
}
