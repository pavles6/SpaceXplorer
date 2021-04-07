import { darkTheme, lightTheme, Theme } from '../../constants/global/theme'
import {
  TOGGLE_DARK_THEME,
  TOGGLE_LIGHT_THEME,
} from '../../constants/redux/actionTypes'

export interface ThemeState {
  themeType: string
  themeData: Theme
}

let initialState: ThemeState

// cookies umesto localStorage
if (typeof window !== 'undefined') {
  console.log('hey i can acess localstorage')
  const themeType = localStorage.getItem('prefferedThemeType')

  themeType === 'dark'
    ? (initialState = { themeType, themeData: darkTheme })
    : (initialState = { themeType, themeData: lightTheme })
} else {
  initialState = {
    themeType: 'dark',
    themeData: darkTheme,
  }
}

const themeReducerFunction = (
  state: ThemeState = initialState,
  { type, payload }
) => {
  console.log('redux state is updating...')
  switch (type) {
    case TOGGLE_DARK_THEME:
      if (state.themeType != 'dark') {
        const { window }: Window = payload

        window.localStorage.setItem('prefferedThemeType', 'dark')

        return {
          ...state,
          themeType: 'dark',
          themeData: {
            ...state.themeData,
            ...darkTheme,
          },
        }
      }
      return { ...state }
    case TOGGLE_LIGHT_THEME:
      if (state.themeType != 'light') {
        console.log('got the light themee')
        const { window }: Window = payload

        window.localStorage.setItem('prefferedThemeType', 'light')

        return {
          ...state,
          themeType: 'light',
          themeData: {
            ...state.themeData,
            ...lightTheme,
          },
        }
      }
      return { ...state }

    default:
      return state
  }
}

export default themeReducerFunction
