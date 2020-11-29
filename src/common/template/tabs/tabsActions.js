import {TAB_SELECTED} from '../../actionsTypes'
export function setSelectedTabIndex(index) {
    return {
        type: TAB_SELECTED,
        payload: index
    }
}