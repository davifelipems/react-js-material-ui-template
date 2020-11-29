import React from "react"
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import {
  withStyles
} from '@material-ui/core/styles'

import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import TableRow from '@material-ui/core/TableRow'

import { makeStyles } from '@material-ui/core/styles'

import baseColor from '@material-ui/core/colors/green'
import green from '@material-ui/core/colors/green'
import yellow from '@material-ui/core/colors/yellow'
import red from '@material-ui/core/colors/red'
import blue from '@material-ui/core/colors/blue'
import grey from '@material-ui/core/colors/grey'
import blueGrey from '@material-ui/core/colors/blueGrey'


export const successColor = green[600]
export const warningColor = yellow[600]
export const defaultColor = grey[600]
export const dangerColor = red[600]
export const infoColor = blue[600]

export const primaryColor = baseColor.A700
export const softColor = grey[200]
export const mediumColor = grey[400]
export const secondaryColor = baseColor.A400
export const backColor = baseColor[700]
export const darkBackgroundColor = blueGrey[900];

export const CustomTextField = (
  { input, label, ...custom },
) => (
    <TextField
      label={label}
      {...input}
      {...custom}
    />
  );

export const customStyles = {
  // Slide tabs
  slide: {
    padding: 15,
    minHeight: 100,
    color: '#fff',
  },
  // MultSelect
  multiselectContainer: { // To change css for multiselect (Width,height,etc..)
    backgroundColor: softColor 
  },
  searchBox: {
    border: 'none',
    fontSize: '10px',
    minHeight: '50px'
  },
  inputField: { // To change input field position or margin
    margin: '5px'
  },
  chips: { // To change css chips(Selected options)
    background: primaryColor
  },
  optionContainer: { // To change css for option container 
    border: '2px solid'
  },
  option: { // To change css for dropdown options
    backgroundColor: softColor,
    color: primaryColor,
  },
  groupHeading: { // To chanage group heading style
    //backgroundColor: softColor 
  }
};

export const overlayStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: mediumColor,
    backgroundColor: 'rgba(255,255,255, 0.5)'
  },
}));

export const LoadingOverlay = props => {
  const classes = overlayStyles();
  return (
    <Backdrop open={props.loading} className={classes.backdrop} >
      <CircularProgress color="inherit" />
    </Backdrop>
  )
}

export const CustomTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export const CustomInput = withStyles({
  root: {
    '& label.Mui-focused': {
      color: primaryColor,
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: primaryColor,
    }
  },
})(TextField);

export const CustomGrid = withStyles({
  root: {
    '& svg.MuiSvgIcon-root': {
      color: mediumColor
    },
    '& .MuiButton-contained svg.MuiSvgIcon-root': {
      color: 'white'
    },
    '& label.Mui-focused': {
      color: primaryColor,
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: primaryColor,
    },
    '& .MuiInput-underline:before': {
      borderBottomColor: softColor,
    },
    '& .btn-info': {
      backgroundColor: infoColor,
      color: 'white'
    },
    '& .btn-success': {
      backgroundColor: successColor,
      color: 'white'
    },
    '& .btn-warning': {
      backgroundColor: warningColor,
      color: 'white'
    },
    '& .btn-default': {
      backgroundColor: defaultColor,
      color: 'white'
    },
    '& .btn-danger': {
      backgroundColor: dangerColor,
      color: 'white'
    },
    '& .color-danger .MuiSvgIcon-root': {
      color: dangerColor
    },
    '& .color-warning .MuiSvgIcon-root': {
      color: warningColor
    },
    '& .cursor-pointer': {
      cursor: 'pointer'
    }
  }
})(Grid);
