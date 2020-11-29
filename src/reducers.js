import { combineReducers } from 'redux'
import { reducer as ToastrReducer } from 'react-redux-toastr'
import paginationReducer from './common/template/pagination/paginationReducer'
import userReducer from './pages/User/userReducer'
import tabsReducer from './common/template/tabs/tabsReducer'
import { reducer as FormReducer } from 'redux-form'
import roleReducer from './pages/Role/roleReducer'

const rootReducer = combineReducers({
    toastr: ToastrReducer,
    paginationReducer,
    userReducer,
    roleReducer,
    tabsReducer,
    form: FormReducer
})

export default rootReducer