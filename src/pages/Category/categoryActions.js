import {setSelectedTabIndex} from '../../common/template/tabs/tabsActions'
import { reset as resetForm , initialize  } from 'redux-form'
import api from '../../services/api'
import { toastr } from 'react-redux-toastr'
import {catchMessage} from '../../common/utils'

export function create(props,values){
    
    return save(props,values,'post',201);
}

export function update(props,values){
    
    return save(props,values,'put',204);
}

async function save(props,values,method,httpStatus){

    props.setLoading(true);

    try{
        const id = values.id ? values.id : '';
        const response = await api[method](`/category/${id}`,values);
        
        props.setLoading(false);
        
        if(response.status === httpStatus){
            
            props.getList(props,0);
            toastr.success("Success",'Saved successfully');

            return dispatch => {
                return dispatch(init(props));
            }
        }else{
            toastr.error("Error",response.data);
        }
        
    } catch (err) {
        
        catchMessage(err,props)
        return props.setLoading(false)
    }
}

export async function remove(props,id){
    props.setLoading(true)
    try{
        const response = await api.delete('/category/'+id)
        props.setLoading(false)

        if(response.status === 204){
            props.getList(props,0);
            toastr.success("Success","Record deleted successfully");
        }else{
            toastr.error("Error",response.data);
        }

        return dispatch => {
            return dispatch(props.setLoading(false))
        }
    } catch (err) {
        catchMessage(err,props)
        return dispatch => {
            return dispatch(props.setLoading(false))
        }
    }
    
}

async function loadForm(id,props){
    props.setLoading(true)
    try{
        const response = await api.get(`/category/${id}`)
        props.setLoading(false)
        return dispatch => {
            return dispatch(initialize('CategoryForm',response.data))
        }
    } catch (err) {
        catchMessage(err,props)
        return dispatch => {
            return dispatch(props.setLoading(false))
        }
    }
}

export function showUpdate(id,props) {
    
    return [
        setSelectedTabIndex(2),
        loadForm(id,props)
    ]
}

export function showCreate() {
    
    return [ 
        setSelectedTabIndex(1)
    ]
}

export function init() {
    
    return [
        setSelectedTabIndex(0),
        resetForm('CategoryForm'),
        initialize('CategoryForm',{})
    ]
}