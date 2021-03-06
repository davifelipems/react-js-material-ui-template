import React, { Component } from "react";
import { withRouter } from "react-router-dom"
import PaginationButtons from '../../common/template/pagination/paginationButtons'
import { renderArrowDirection, toggleOrderBy } from '../../common/template/pagination/paginationUtils'
import {
    getList, setTotalPages, setLoading,
    setCurrentPage, setOrderBy
} from '../../common/template/pagination/paginationActions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import 'react-confirm-alert/src/react-confirm-alert.css'
import { remove, showUpdate, showCreate } from './userActions'
import { reduxForm, Field } from 'redux-form'
import Button from '@material-ui/core/Button'
import { getEmail } from "../../services/auth"
import { toastr } from "react-redux-toastr"
import { confirmAlertCustom } from '../../common/template/confirmAlert'
import { formValueSelector } from 'redux-form'
import { CustomGrid,CustomTableRow,CustomTextField} from '../../common/template/meterialUiCustomComponents'
import { Grid } from "@material-ui/core";

import { Search as SearchIcon, 
         Add as PlusIcon,
         Edit as EditIcon,
         Delete as DeleteIcon }
from '@material-ui/icons'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import IconButton from '@material-ui/core/IconButton'
import Divider from '@material-ui/core/Divider'

class UserList extends Component {

    componentDidMount() {
        this.props.getList(this.props, 0, this.props.veluesFormSearch);
    }

    confirmDelete(id, email) {

        if (email === getEmail()) {
            toastr.error("Error", "you can't delete yourself!");
            return false;
        }

        confirmAlertCustom(this.deleteIt.bind(this, id),
            'You want to delete this record?',
            'Yes, Delete it!');
    }

    deleteIt(id, closeConfirm) {
        this.props.remove(this.props, id);
        closeConfirm();
    }

    renderRows() {

        const list = this.props.list || []
        if (!list.content) {
            return (<CustomTableRow key='1'>
                <TableCell component="th" scope="row" colSpan='4'>
                    no results
                </TableCell>
            </CustomTableRow>)
        }

        return list.content.map(row => (
            <CustomTableRow key={row.id}>
                <TableCell component="th" className='cursor-pointer' scope="row" onClick={this.props.showUpdate.bind(this, row.id, this.props)}>
                    {(row != null ? row.id : '')}
                </TableCell>
                <TableCell component="th" className='cursor-pointer' scope="row" onClick={this.props.showUpdate.bind(this, row.id, this.props)}>
                    {row != null ? row.name : ''}
                </TableCell>
                <TableCell component="th" className='cursor-pointer' scope="row" onClick={this.props.showUpdate.bind(this, row.id, this.props)}>
                    {row != null ? row.email : ''}
                </TableCell>
                <TableCell component="th" scope="row">
                    <IconButton aria-label="Edit" 
                                component="span"
                                size="small"    
                                className='color-warning'
                                onClick={this.props.showUpdate.bind(this, row.id, this.props)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="Edit" 
                                component="span"
                                size="small"
                                className='color-danger'
                                onClick={this.confirmDelete.bind(this, row.id, row.email)}>
                        <DeleteIcon />
                    </IconButton>
                </TableCell>
            </CustomTableRow>
        ))
    }

    render() {
        const { handleSubmit } = this.props
        return (
            <div >
                <form onSubmit={handleSubmit.bind(this)}>
                    <CustomGrid container spacing={1} alignItems="flex-end">
                        <Grid item>
                            <Field name='name' component={CustomTextField}
                                label='Name' fullWidth />
                        </Grid>
                        <Grid item>
                            <Field name='email' component={CustomTextField}
                                label='e-mail' type='email' />
                        </Grid>
                        <Divider orientation="vertical" variant="middle" flexItem />
                        <Grid item>
                            <Button
                                type='submit'
                                variant="contained"
                                className='btn-info'
                                startIcon={<SearchIcon />}
                            >
                                Search
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                type='button'
                                variant="contained"
                                className='btn-success'
                                onClick={this.props.showCreate.bind(this,this.props)}
                                startIcon={<PlusIcon />}
                            >
                                Create
                            </Button>
                        </Grid>
                    </CustomGrid>
                </form>
                
                <CustomGrid container spacing={1} alignItems="flex-end">
                    <Grid xs={12} item>
                        <Table size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell className='cursor-pointer' onClick={toggleOrderBy.bind(this, this.props, "id")}>
                                        id {renderArrowDirection(this.props, 'id')}
                                    </TableCell>
                                    <TableCell className='cursor-pointer' onClick={toggleOrderBy.bind(this, this.props, "name")}>
                                        name {renderArrowDirection(this.props, 'name')}
                                    </TableCell>
                                    <TableCell className='cursor-pointer' onClick={toggleOrderBy.bind(this, this.props, "email")}>
                                        email {renderArrowDirection(this.props, 'email')}
                                    </TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.renderRows()}
                            </TableBody>
                        </Table>
                        <PaginationButtons
                            endpoint={this.props.endpoint}
                            listActionType={this.props.listActionType}
                            paginationParams={this.props.paginationParams}
                            setPaginationParams={this.props.setPaginationParams}
                        />
                    </Grid>
                </CustomGrid>

            </div>
        );
    }
}

const selector = formValueSelector('UserFormList')
const mapStateToProps = state => ({
    endpoint: '/user/page',
    list: state.paginationReducer.list,
    paginationParams: state.paginationReducer.paginationParams,
    currentPage: state.paginationReducer.currentPage,
    totalPages: state.paginationReducer.totalPages,
    loading: state.paginationReducer.loading,
    veluesFormSearch: selector(state, 'name', 'email')
})

const mapDispatchToProps = dispatch => bindActionCreators({
    getList,
    setLoading,
    setTotalPages,
    setCurrentPage,
    setOrderBy,
    remove,
    showUpdate,
    showCreate
}, dispatch)

UserList = reduxForm({ form: 'UserFormList', destroyOnUnmount: false })(UserList)

const ShowTheLocationWithRouter = withRouter(UserList)
export default connect(mapStateToProps, mapDispatchToProps)(ShowTheLocationWithRouter)