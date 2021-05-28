import { applyMiddleware, createStore, Store } from 'redux'
import { createWrapper } from 'next-redux-wrapper'
import reducer from './reducers/reducers'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import { State } from '../lib/types/redux'

const makeStore = () =>
  createStore(reducer, composeWithDevTools(applyMiddleware(thunkMiddleware)))

export const wrapper = createWrapper<Store<State>>(makeStore, {
  debug: false,
})
