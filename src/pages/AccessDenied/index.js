import React, { Component } from "react";
import { withRouter } from "react-router-dom"
import { CustomGrid, dangerColor } from '../../common/template/meterialUiCustomComponents'
import { Grid } from "@material-ui/core"
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import {
    AccountCircle as UserIcon,
    Home as HomeIcon,
    Block as BlockIcon
} from '@material-ui/icons'

class AccessDined extends Component {

    goLogin() {
        this.props.history.push("/signout");
    }
    gotHome() {
        this.props.history.push("/app");
    }

    render() {
        return (
            <Card style={{ backgroundColor: dangerColor }}>
                <CardContent>
                    <Typography style={{ color: 'white' }} variant="h5" component="h2">
                        <BlockIcon />  Access Denied
                    </Typography>
                    <Typography style={{ color: 'white' }} gutterBottom>
                        Your login may be expired or you may not have permission to access this resource
                    </Typography>
                </CardContent>
                <CardActions>
                    <CustomGrid container spacing={1} alignItems="flex-end">
                        <Grid item>
                            <Button
                                type='button'
                                variant="contained"
                                className='btn-default'
                                onClick={this.goLogin.bind(this)}
                                startIcon={<UserIcon />}
                            >
                                Login
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                type='button'
                                variant="contained"
                                className='btn-default'
                                onClick={this.gotHome.bind(this)}
                                startIcon={<HomeIcon />}
                            >
                                Back to home page
                            </Button>
                        </Grid>
                    </CustomGrid>
                </CardActions>
            </Card>
        );
    }
}

export default withRouter(AccessDined);