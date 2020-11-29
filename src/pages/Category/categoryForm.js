import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduxForm, Field } from 'redux-form'
import { init } from './categoryActions'
import { Grid } from "@material-ui/core"
import { CustomGrid, CustomTextField } from '../../common/template/meterialUiCustomComponents'
import Button from '@material-ui/core/Button'
import { ArrowBack as CancelIcon } from '@material-ui/icons'
import Box from '@material-ui/core/Box'

class CategoryForm extends Component {


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

CategoryForm = reduxForm({ form: 'CategoryForm', destroyOnUnmount: false })(CategoryForm)

const mapDispatchToProps = dispatch => bindActionCreators({
    init
}, dispatch)

const mapStateToProps = state => ({})
export default connect(mapStateToProps, mapDispatchToProps)(CategoryForm)