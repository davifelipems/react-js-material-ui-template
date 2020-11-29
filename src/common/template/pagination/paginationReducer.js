import {LIST_FILTER,LOADING,CURRENT_PAGE,TOTAL_PAGES,LIST_FETCHED} from '../../actionsTypes'

const INITIAL_STATE = {loading:false,
                       correntPage:0,
                       totalPages:0,
                       list:[],
                       paginationParams:{}}

const paginationRecucer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOADING:
            return { ...state, loading: action.isLoading }    
        case LIST_FETCHED:
            return { ...state, list: action.payload.data } 
        case CURRENT_PAGE:
            return { ...state, currentPage: action.currentPage }
        case TOTAL_PAGES:
            return { ...state, totalPages: action.totalPages }
        case LIST_FILTER:
            return { ...state, paginationParams: action.paginationParams}            
        default:
            return state
    }
}

export default paginationRecucer;