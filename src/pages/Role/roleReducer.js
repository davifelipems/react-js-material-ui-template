import {SELECTED_PRIVILEGES,MULTSELECT_PRIVILEGES,LIST_PRIVILEGES} from '../../common/actionsTypes'
import React from "react"
const INITIAL_STATE = {selectedRoles:{},
                      selectedPrivileges:{},
                      multiselectPrivileges:React.createRef(),
                      listPrivileges:[]}

const roleReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SELECTED_PRIVILEGES:
            return { ...state, selectedPrivileges: action.selectedPrivileges }
        case MULTSELECT_PRIVILEGES:
            return { ...state, multiselectPrivileges: action.multiselectPrivileges }
        case LIST_PRIVILEGES:
            return { ...state, listPrivileges: action.listPrivileges }
        default:
            return state
    }
}

export default roleReducer