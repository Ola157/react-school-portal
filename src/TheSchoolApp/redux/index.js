import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import myReducer from './reducer'
let schoolData = createStore(myReducer, applyMiddleware(thunk))
export default schoolData