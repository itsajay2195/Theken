import {combineReducers} from 'redux'
import albumReducer from './AlbumReducer'

let reducers = combineReducers({
    albumReducer:albumReducer
})

const rootReducer =(state,action)=>{
    return reducers(state,action)
}

export default rootReducer;