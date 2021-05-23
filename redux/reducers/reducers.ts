import { combineReducers } from 'redux'
import theme, { initialThemeState } from './themeReducer'
import launches, { initialLaunchesState } from './launchesReducer'
import { State } from '../../types/redux'
import { HYDRATE } from 'next-redux-wrapper'

const initialCombinedState = {
  launches: { ...initialLaunchesState },
  theme: { ...initialThemeState },
}

const reducers = combineReducers({
  theme,
  launches,
})

const mainReducer = (state: State = initialCombinedState, action) =>
  action.type === HYDRATE ? action.payload : reducers(state as any, action)

export default mainReducer
