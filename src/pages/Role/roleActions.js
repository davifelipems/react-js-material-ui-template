import {setSelectedTabIndex} from '../../common/template/tabs/tabsActions'
import { reset as resetForm , initialize  } from 'redux-form'
import api from '../../services/api'
import { toastr } from 'react-redux-toastr'
import {SELECTED_PRIVILEGES,MULTSELECT_PRIVILEGES, LIST_PRIVILEGES} from '../../common/actionsTypes'
import {transformRolePermissionsObject} from '../../common/utils'
import {catchMessage} from '../../common/utils'

export function create(props,values){
    
    return save(props,values,'post',201);
}

export function update(props,values){
    
    return save(props,values,'put',204);
}

async function save(props,values,method,httpStatus){

    props.setLoading(true);

    values.privileges = props.selectedPrivileges
    
    if( Object.keys(values.privileges).length === 0){
        toastr.error("Error","Privileges cannot be empty");
        return props.setLoading(false);
    }

    try{
        const id = values.id ? values.id : '';
        const response = await api[method](`/role/${id}`,values);
        
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
        console.log(err);
        catchMessage(err,props)
        return dispatch => {
            return dispatch(props.setLoading(false))
        }
    }
}

export async function remove(props,id){
    props.setLoading(true)
    try{
        const response = await api.delete('/role/'+id)
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

export async function loadListPrivileges(props){
    props.setLoading(true)
    try{
        const response = await api.get('/user/get-all-privileges')
        props.setLoading(false)
        return dispatch => {
            return dispatch({type:LIST_PRIVILEGES,listPrivileges:transformRolePermissionsObject(response.data,"PRIVILEGE")})
        }
    } catch (err) {
        catchMessage(err,props)
        return dispatch => {
            return dispatch(props.setLoading(false))
        }
    }
}
    
export const setMultiselectPrivileges = (value) => (
    {type:MULTSELECT_PRIVILEGES,multiselectPrivileges:value}
)

export const setSelectedPrivileges = (value) => (
    {type:SELECTED_PRIVILEGES,selectedPrivileges:value}
)

async function loadForm(id,props){
    props.setLoading(true)
    try{
        const response = await api.get(`/role/${id}`)
        props.setLoading(false)
        return dispatch => {
            return [dispatch(setSelectedPrivileges(transformRolePermissionsObject(response.data.privileges,"PRIVILEGE"))),
                    dispatch(initialize('RoleForm',response.data))
                    ]
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

export function init(props) {
    if(props.multiselectPrivileges.current !== null){
        props.multiselectPrivileges.current.resetSelectedValues()
    }

    return [
        setSelectedTabIndex(0),
        resetForm('RoleForm'),
        initialize('RoleForm',{}),
        setSelectedPrivileges({})
    ]
}