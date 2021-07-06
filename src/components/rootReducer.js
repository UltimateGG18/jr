import {combineReducers} from 'redux';
import AuthReducer from './Redux/Auth/authReducer';

export default combineReducers({
    auth:AuthReducer,
})