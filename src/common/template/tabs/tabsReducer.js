import {TAB_SELECTED} from '../../actionsTypes'

const INITIAL_STATE = { selected: 0}

const tabsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TAB_SELECTED:
            return { ...state, selected: action.payload }
        default:
            return state
    }
}

export default tabsReducer