import React, { Component } from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { Link } from 'react-router-dom'
import {
    Home as HomeIcon,
    PersonAdd as PersonIcon,
    People as PeopleIcon,
    ShoppingCart as CategoryIcon,
    ExitToApp as LogOutIcon
}
    from '@material-ui/icons'
import { confirmAlertCustom } from './confirmAlert'
import { CustomGrid } from './meterialUiCustomComponents'

export class MainListItems extends Component {
    render() {
        return (
            <CustomGrid>
                <ListItem component={Link} to="/app" button>
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItem>
            </CustomGrid>
        )
    }
}

export class SecondaryList extends Component {

    confirmLogOut(e) {
        e.preventDefault();

        confirmAlertCustom(this.logOut.bind(this),
            'you want to log out?',
            'Yes, i do!');
    }

    logOut(closeConfirm) {
        this.props.history.push("/signout");
        closeConfirm();
    }

    render() {
        return (
            <CustomGrid>
                <ListItem component={Link} to='/user' button>
                    <ListItemIcon>
                        <PersonIcon />
                    </ListItemIcon>
                    <ListItemText primary="User" />
                </ListItem>
                <ListItem component={Link} button to='/role'>
                    <ListItemIcon>
                        <PeopleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Role" />
                </ListItem>
                <ListItem component={Link} to='/category' button>
                    <ListItemIcon>
                        <CategoryIcon />
                    </ListItemIcon>
                    <ListItemText primary="Category" />
                </ListItem>
                <ListItem button onClick={this.confirmLogOut.bind(this)}>
                    <ListItemIcon>
                        <LogOutIcon />
                    </ListItemIcon>
                    <ListItemText primary="Sign out" />
                </ListItem>
            </CustomGrid>
        )
    }
}