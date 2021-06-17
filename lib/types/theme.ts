export interface baseColors {
  mainSurface: string
  mainText: string
  mainTextAccent: string
  mainSurfaceAccent: string
  mainColor: string
  mainLightColor: string
}

export interface Theme extends baseColors {
  surface: string
  surfaceBackground: string
  text: string
  disabled: string
  textAccent: string
  textSecondary: string
}
