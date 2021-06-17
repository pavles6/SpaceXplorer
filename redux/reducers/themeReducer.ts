import { darkTheme } from '../../lib/constants/global/theme'
import { ThemeState } from '../../lib/types/redux'

export const initialThemeState: ThemeState = darkTheme

const themeReducerFunction = (
  state: ThemeState = initialThemeState,
  { type, payload }
) => {
  switch (type) {
    default:
      return state
  }
}

export default themeReducerFunction
