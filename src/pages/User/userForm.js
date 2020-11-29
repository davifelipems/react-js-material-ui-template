import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduxForm, Field } from 'redux-form'
import { init, setSelectedRoles, setSelectedPrivileges, loadListPrivileges, loadListRoles } from './userActions'
import { setLoading } from '../../common/template/pagination/paginationActions'
import { Multiselect } from 'multiselect-react-dropdown'
import { Grid } from "@material-ui/core"
import { CustomGrid, CustomTextField,customStyles } from '../../common/template/meterialUiCustomComponents'
import Button from '@material-ui/core/Button'
import { ArrowBack as CancelIcon } from '@material-ui/icons'
import Box from '@material-ui/core/Box'

class UserForm extends Component {

    componentDidMount(){
        this.props.setMultiselectPrivileges(this.props.multiselectPrivileges)
        this.props.setMultiselectRoles(this.props.multiselectRoles)
        this.props.loadListRoles(this.props)
        this.props.loadListPrivileges(this.props)
    }

    changePrivilege(selectedList, selectedItem) {
        this.props.setSelectedPrivileges(selectedList)
    }

    changeRole(selectedList, selectedItem) {
        this.props.setSelectedRoles(selectedList)
    }
    render() {
        const { handleSubmit } = this.props
        return (
            <div >
                <form onSubmit={handleSubmit.bind(this)}>
                    <CustomGrid container spacing={1} alignItems="flex-end">
                        <Grid item>
                            <Field name='name' component={CustomTextField}
                                label='Nome' fullWidth />
                        </Grid>
                        <Grid item>
                            <Field name='email' component={CustomTextField} 
                                label='Email' type='email' />
                        </Grid>
                        <Grid item>
                            <Field name='password' component={CustomTextField} 
                                label='Password' type='password' />
                        </Grid>
                        <Grid item>
                            <Field name='password_confirm' component={CustomTextField} 
                                label='Password confirm' type='password' />
                        </Grid>
                    </CustomGrid>
                    <CustomGrid container spacing={1} alignItems="flex-end">
                        <Grid xs item>
                            <label>Privileges</label>
                            <Multiselect style={customStyles}
                                ref={this.props.multiselectPrivileges}
                                placeholder='Privileges'
                                options={this.props.listPrivileges} // Options to display in the dropdown
                                selectedValues={this.props.selectedPrivileges} // Preselected value to persist in dropdown
                                onSelect={this.changePrivilege.bind(this)} // Function will trigger on select event
                                onRemove={this.changePrivilege.bind(this)}
                                displayValue="pritty_name" // Property name to display in the dropdown options
                                id={`privileges-${this.props.submitLabel}`}
                            />
                        </Grid>
                    </CustomGrid>
                    <CustomGrid container spacing={1} alignItems="flex-end">
                        <Grid xs item>
                            <label>Roles</label>
                            <Multiselect style={customStyles}
                                ref={this.props.multiselectRoles}
                                placeholder='Roles'
                                options={this.props.listRoles} // Options to display in the dropdown
                                selectedValues={this.props.selectedRoles} // Preselected value to persist in dropdown
                                onRemove={this.changeRole.bind(this)}
                                onSelect={this.changeRole.bind(this)} // Function will trigger on select event
                                displayValue="pritty_name" // Property name to display in the dropdown options
                                id={`roles-${this.props.submitLabel}`}
                            />
                        </Grid>
                    </CustomGrid>
                    <CustomGrid container spacing={1} alignItems="flex-end">
                        <Grid xs mx="auto" item>
                            <Box mt={2}>
                                <Button
                                    type='button'
                                    variant="contained"
                                    className='btn-default'
                                    onClick={this.props.init.bind(this, this.props)}
                                    startIcon={<CancelIcon />}
                                >
                                    Cancel
                                </Button>
                            </Box>
                        </Grid>
                        <Grid xs mx="auto" item>
                            <Box mt={2}>
                                <Button
                                    type='submit'
                                    variant="contained"
                                    className={`btn-${this.props.submitClass}`}
                                    startIcon={this.props.submitIcon}
                                >
                                    {this.props.submitLabel}
                                </Button>
                            </Box>
                        </Grid>
                    </CustomGrid>
                </form>
            </div>
        )
    }
}

UserForm = reduxForm({ form: 'UserForm', destroyOnUnmount: false })(UserForm)

const mapDispatchToProps = dispatch => bindActionCreators({
    init,
    setSelectedPrivileges,
    loadListPrivileges,
    loadListRoles,
    setSelectedRoles,
    setLoading
}, dispatch)
const mapStateToProps = state => ({
    selectedRoles: state.userReducer.selectedRoles,
    loading: state.paginationReducer.loading,
    listRoles: state.userReducer.listRoles,
    listPrivileges: state.userReducer.listPrivileges,
    selectedPrivileges: state.userReducer.selectedPrivileges
})
export default connect(mapStateToProps, mapDispatchToProps)(UserForm)