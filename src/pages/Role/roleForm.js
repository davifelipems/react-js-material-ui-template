import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduxForm, Field } from 'redux-form'
import { init, setSelectedPrivileges, loadListPrivileges } from './roleActions'
import { Multiselect } from 'multiselect-react-dropdown'
import { Grid } from "@material-ui/core"
import { CustomGrid, CustomTextField,customStyles } from '../../common/template/meterialUiCustomComponents'
import Button from '@material-ui/core/Button'
import { ArrowBack as CancelIcon } from '@material-ui/icons'
import Box from '@material-ui/core/Box'

class RoleForm extends Component {

    constructor(props) {
        super(props)
        props.loadListPrivileges(props)
    }

    componentDidMount() {
        this.props.setMultiselectPrivileges(this.props.multiselectPrivileges)
    }

    changePrivilege(selectedList, selectedItem) {
        this.props.setSelectedPrivileges(selectedList)
    }

    render() {

        const { handleSubmit } = this.props
        return (
            <form onSubmit={handleSubmit.bind(this)} className='box box-primary'>
                <CustomGrid container spacing={1} alignItems="flex-end">
                        <Grid item>
                            <Field name='name' component={CustomTextField} 
                                label='Nome' fullWidth />
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
        )
    }
}

RoleForm = reduxForm({ form: 'RoleForm', destroyOnUnmount: false })(RoleForm)

const mapDispatchToProps = dispatch => bindActionCreators({
    init,
    setSelectedPrivileges,
    loadListPrivileges
}, dispatch)
const mapStateToProps = state => ({
    listPrivileges: state.roleReducer.listPrivileges,
    selectedPrivileges: state.roleReducer.selectedPrivileges
})
export default connect(mapStateToProps, mapDispatchToProps)(RoleForm)