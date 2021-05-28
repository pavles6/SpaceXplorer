import { combineReducers } from 'redux'
import theme, { initialThemeState } from './themeReducer'
import { HYDRATE } from 'next-redux-wrapper'
import { State } from '../../lib/types/redux'

const initialCombinedState = {
  theme: { ...initialThemeState },
}

const reducers = combineReducers({
  theme,
})

const mainReducer = (state: State = initialCombinedState, action) =>
  action.type === HYDRATE ? action.payload : reducers(state as any, action)

export default mainReducer
