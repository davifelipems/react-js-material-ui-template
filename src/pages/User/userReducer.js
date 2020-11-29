import {SELECTED_PRIVILEGES,SELECTED_ROLES,MULTSELECT_PRIVILEGES,MULTSELECT_ROLES,LIST_ROLES,LIST_PRIVILEGES} from '../../common/actionsTypes'
import React from "react"
const INITIAL_STATE = {selectedRoles:{},
                      selectedPrivileges:{},
                      multiselectRoles:React.createRef(),
                      multiselectPrivileges:React.createRef(),
                      listRoles:[],
                      listPrivileges:[]}

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SELECTED_ROLES:
            return { ...state, selectedRoles: action.selectedRoles }
        case SELECTED_PRIVILEGES:
            return { ...state, selectedPrivileges: action.selectedPrivileges }
        case MULTSELECT_ROLES:
            return { ...state, multiselectRoles: action.multiselectRoles }
        case MULTSELECT_PRIVILEGES:
            return { ...state, multiselectPrivileges: action.multiselectPrivileges }
        case LIST_ROLES:
            return { ...state, listRoles: action.listRoles }
        case LIST_PRIVILEGES:
            return { ...state, listPrivileges: action.listPrivileges }
        default:
            return state
    }
}

export default userReducer