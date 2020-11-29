import React, { Component } from "react"
import SwipeableViews from 'react-swipeable-views'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import UserList from './userList'
import {
    init, showCreate, showUpdate, create, update,
    setSelectedPrivileges, setSelectedRoles,
    setMultiselectPrivileges, setMultiselectRoles
} from './userActions'
import {
    Add as AddIcon,
    Edit as EditIcon
} from '@material-ui/icons'
import Form from './userForm'
import { setLoading, getList, setTotalPages, setCurrentPage, setOrderBy, setPaginationParams } from '../../common/template/pagination/paginationActions'
import { initialize } from 'redux-form'
import { setSelectedTabIndex } from '../../common/template/tabs/tabsActions'
import { customStyles, LoadingOverlay } from '../../common/template/meterialUiCustomComponents'
import If from '../../common/operator/if'

class User extends Component {

    componentDidMount() {
        this.props.init(this.props)
        initialize('UserFormList', this.props.paginationParams)
    }

    _selectTab(e) {
        e.preventDefault()
        this.props.selectTab(this.props.target)
    }

    search(values) {
        this.props.getList(this.props, this.props.currentPage, values);
    }

    render() {
        return (
            <div>
                <LoadingOverlay loading={this.props.loading} />
                <SwipeableViews index={this.props.indexTabSelected}>
                    <div style={customStyles.slide}>
                        <If test={this.props.indexTabSelected === 0}>
                            <UserList onSubmit={this.search.bind(this)}
                                setPaginationParams={this.props.setPaginationParams.bind(this)} />
                        </If>
                    </div>
                    <div style={customStyles.slide}>
                        <If test={this.props.indexTabSelected === 1}>
                            <Form onSubmit={this.props.create.bind(this, this.props)}
                                loading={this.props.loading}
                                history={this.props.history}
                                setLoading={this.props.setLoading.bind(this)}
                                setSelectedRoles={this.props.setSelectedRoles.bind(this)}
                                setSelectedPrivileges={this.props.setSelectedPrivileges.bind(this)}
                                multiselectRoles={this.props.multiselectRoles}
                                multiselectPrivileges={this.props.multiselectPrivileges}
                                setMultiselectPrivileges={this.props.setMultiselectPrivileges.bind(this)}
                                setMultiselectRoles={this.props.setMultiselectRoles.bind(this)}
                                setSelectedTabIndex={this.props.setSelectedTabIndex.bind(this)}
                                submitLabel='Create'
                                submitIcon={<AddIcon />}
                                submitClass='success' />
                        </If>
                    </div>
                    <div style={customStyles.slide}>
                        <If test={this.props.indexTabSelected === 2}>
                            <Form onSubmit={this.props.update.bind(this, this.props)}
                                loading={this.props.loading}
                                history={this.props.history}
                                setLoading={this.props.setLoading.bind(this)}
                                setSelectedRoles={this.props.setSelectedRoles.bind(this)}
                                setSelectedPrivileges={this.props.setSelectedPrivileges.bind(this)}
                                multiselectRoles={this.props.multiselectRoles}
                                multiselectPrivileges={this.props.multiselectPrivileges}
                                setMultiselectPrivileges={this.props.setMultiselectPrivileges.bind(this)}
                                setMultiselectRoles={this.props.setMultiselectRoles.bind(this)}
                                setSelectedTabIndex={this.props.setSelectedTabIndex.bind(this)}
                                submitLabel='Update'
                                submitIcon={<EditIcon />}
                                submitClass='warning' />
                        </If>
                    </div>
                </SwipeableViews>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    init,
    showCreate,
    showUpdate,
    create,
    update,
    setLoading,
    setTotalPages,
    setCurrentPage,
    setOrderBy,
    setSelectedPrivileges,
    setSelectedRoles,
    getList,
    setPaginationParams,
    setMultiselectPrivileges,
    setMultiselectRoles,
    setSelectedTabIndex
},
    dispatch)

const mapStateToProps = state => ({
    endpoint: '/user/page',
    list: state.paginationReducer.list,
    paginationParams: state.paginationReducer.paginationParams,
    currentPage: state.paginationReducer.currentPage,
    totalPages: state.paginationReducer.totalPages,
    indexTabSelected: state.tabsReducer.selected,
    loading: state.paginationReducer.loading,
    selectedRoles: state.userReducer.selectedRoles,
    selectedPrivileges: state.userReducer.selectedPrivileges,
    multiselectRoles: state.userReducer.multiselectRoles,
    multiselectPrivileges: state.userReducer.multiselectPrivileges
})

export default connect(mapStateToProps, mapDispatchToProps)(User)