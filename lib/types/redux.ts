import { Theme } from './theme'

export interface State {
  theme: ThemeState
}

export interface ThemeState extends Theme {}
