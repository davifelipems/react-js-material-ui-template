import React from 'react'
import { confirmAlert } from 'react-confirm-alert'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import { CustomGrid,dangerColor } from './meterialUiCustomComponents'
import { Grid } from "@material-ui/core"
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

export const confirmAlertCustom = function (yesFunction, msg, btnLabel) {

    confirmAlert({
        customUI: ({ onClose }) => {
            return (
                <div>
                    <Paper elevation={6}>
                        <Card style={{backgroundColor:dangerColor}}>
                            <CardContent>
                                <Typography style={{color:'white'}} variant="h5" component="h2">
                                    Are you sure?
                                </Typography>
                                <Typography style={{color:'white'}} gutterBottom>
                                    {msg}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <CustomGrid container spacing={1} alignItems="flex-end">
                                    <Grid item>
                                        <Button
                                            type='button'
                                            variant="contained"
                                            className='btn-default'
                                            onClick={yesFunction.bind(this, onClose)}
                                        >
                                            {btnLabel}
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button
                                            type='button'
                                            variant="contained"
                                            className='btn-default'
                                            onClick={onClose}
                                        >
                                            No
                                </Button>
                                    </Grid>
                                </CustomGrid>
                            </CardActions>
                        </Card>
                    </Paper>
                </div>
            );
        }
    })
}