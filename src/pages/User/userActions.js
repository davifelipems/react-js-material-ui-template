import {setSelectedTabIndex} from '../../common/template/tabs/tabsActions'
import { reset as resetForm , initialize  } from 'redux-form'
import api from '../../services/api'
import { toastr } from 'react-redux-toastr'
import {SELECTED_PRIVILEGES,SELECTED_ROLES,MULTSELECT_PRIVILEGES, MULTSELECT_ROLES, LIST_ROLES, LIST_PRIVILEGES} from '../../common/actionsTypes'
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

    values.roles = props.selectedRoles
    values.privileges = props.selectedPrivileges
    
    if(Object.keys(values.roles).length === 0 || Object.keys(values.privileges).length === 0){
        toastr.error("Error","Roles and privileges cannot be empty");
        return props.setLoading(false);
    }

    if(values.password && values.password_confirm
    && values.password !== values.password_confirm){
        toastr.error("Error","Password and confirm password don't match");
        return props.setLoading(false);
    }

    try{
        const id = values.id ? values.id : '';
        const response = await api[method](`/user/${id}`,values);
        
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
        const response = await api.delete('/user/'+id)
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

export async function loadListRoles(props){
    props.setLoading(true)
    try{
        const response = await api.get('/user/get-all-roles')
        props.setLoading(false)
        return dispatch => {
            return dispatch({type:LIST_ROLES,listRoles:transformRolePermissionsObject(response.data,"ROLE")})
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

export const setMultiselectRoles = (value) => (
    {type:MULTSELECT_ROLES,multiselectRoles:value}
)

export const setSelectedPrivileges = (value) => (
    {type:SELECTED_PRIVILEGES,selectedPrivileges:value}
)

export const setSelectedRoles = (value) => (
    {type:SELECTED_ROLES,selectedRoles:value}
)

async function loadForm(id,props){
    props.setLoading(true)
    try{
        const response = await api.get(`/user/${id}`)
        props.setLoading(false)
        return dispatch => {
            return [dispatch(setSelectedPrivileges(transformRolePermissionsObject(response.data.privileges,"PRIVILEGE"))),
                    dispatch(setSelectedRoles(transformRolePermissionsObject(response.data.roles,"ROLE"))),
                    dispatch(initialize('UserForm',response.data))
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
    if(props.multiselectRoles.current !== null){
        props.multiselectRoles.current.resetSelectedValues()
    }
    if(props.multiselectPrivileges.current !== null){
        props.multiselectPrivileges.current.resetSelectedValues()
    }

    return [
        setSelectedTabIndex(0),
        resetForm('UserForm'),
        initialize('UserForm',{}),
        setSelectedPrivileges({}),
        setSelectedRoles({})
    ]
}