import {LIST_FILTER,LOADING,CURRENT_PAGE,TOTAL_PAGES,LIST_FETCHED} from '../../../common/actionsTypes'
import api from '../../../services/api'
import {catchMessage} from '../../../common/utils'

export const setCurrentPage = (value) => (
    {type: CURRENT_PAGE,currentPage: value}
)

export const setTotalPages = (value) => (
    {type: TOTAL_PAGES,totalPages: value}
)

export const setLoading = (value) => (
    {type: LOADING,isLoading: value}
)

export const setPaginationParams = (value) => (
    {type: LIST_FILTER,paginationParams: value}
)

export function setOrderBy(props,field){
    
    let paginationParams = props.paginationParams;

    if(paginationParams.direction){
        if(paginationParams.direction === 'ASC'){
            paginationParams.direction = "DESC";
        }else if(paginationParams.direction === 'DESC'){
            paginationParams.direction = "ASC";
        }
    }else{
        paginationParams.direction = "ASC";
    }
    
    paginationParams.orderBy= field;

    return {type: LIST_FILTER,paginationParams}
}

export async function getList(props,page = 0,formSearchData) {
    
    props.setLoading(true);

    try{
        
        const params = (!formSearchData ? props.paginationParams : formSearchData);
        params.page = page;
        
        props.setPaginationParams(params);
        
        const response = await api.get(props.endpoint,{params});
        
        props.setLoading(false);
        
        if(response.data.totalPages){
            props.setTotalPages(response.data.totalPages);
            props.setCurrentPage(page);
        }
        
        return {
            type: LIST_FETCHED,
            payload: response
        }
    } catch (err) {
       return catchMessage(err,props);
    }
}

