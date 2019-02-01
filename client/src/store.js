import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk' 
import rootReducer from './reducers'

const initialState = {}

const middeware = [thunk]

const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(...middeware)
    // ,
    // window.___REDUX_DEVTOOLS_EXTENSION__ && window.___REDUX_DEVTOOLS_EXTENSION__()
))

export default store