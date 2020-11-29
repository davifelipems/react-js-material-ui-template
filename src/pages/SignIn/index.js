import React, { useState,useEffect } from "react";
import { Link, withRouter } from "react-router-dom";

import ImgWave from '../../assets/wave.png'
import ImgBg from '../../assets/bg.svg'
import ImgAvatar from '../../assets/avatar.svg'

import api from "../../services/api"
import { login, isAuthenticated, setEmail as setAuthEmail } from "../../services/auth"

import { FromBody } from "./styles"
import Grid from '@material-ui/core/Grid'
import {Email as EmailIcon,
        Lock as LockIcon} from '@material-ui/icons'
import {CustomGrid,primaryColor,softColor,LoadingOverlay} from '../../common/template/meterialUiCustomComponents'
import TextField from '@material-ui/core/TextField'

import { toastr } from 'react-redux-toastr'
import Messages from '../../common/msg/messages'


export const SignIn = props => {
  
  const [loading,setLoading] = useState(false)
  const [password,setPassword] = useState("")
  const [colorIconEmail,setColorIconEmail] = useState(softColor)
  const [colorIconPassrowd,setColorIconPassrowd] = useState(softColor)
  const [email,setEmail] = useState("")
 
  useEffect(()=>{
    if (isAuthenticated()) {
      props.history.push("/app");
    }
  },[props])

  const handleSignIn = async e => {
    e.preventDefault();

    if (!email || !password) {
      toastr.error("Error","fill in all fields before proceeding");
    } else {
      setLoading(true)
      try {
        const response = await api.post("/login", { email, password });
        login(response.headers.authorization.replace("Bearer", ""));
        setLoading(false);
        setAuthEmail(email);
        props.history.push("/app");
      } catch (err) {
        var message = "Unknown error";
        if (err.response && err.response.data.message) {
          message = err.response.data.message;
        };
        
        toastr.error("Error",message);
        setLoading(false)
      }
    }
  };

  return (
    <FromBody>
      <img className='wave' alt='Wave' src={ImgWave} />
      <div className='container'>
        <div className="img">
          <img alt='background' src={ImgBg} />
        </div>
        <div className="login-content">
          <LoadingOverlay loading={loading} />
          <form onSubmit={handleSignIn}>
              <img alt='Avatar' src={ImgAvatar} />
              <h2 className="title">Welcome </h2>
              <CustomGrid container spacing={1} alignItems="flex-end">
                <Grid xs={2} item>
                  <EmailIcon style={{color:colorIconEmail}}/>
                </Grid>
                <Grid xs={10} item>
                  <TextField label="e-mail" 
                              type='email'
                              onChange={e => setEmail(e.target.value)}
                              onFocus={setColorIconEmail.bind(this,primaryColor)}
                              onBlur={setColorIconEmail.bind(this,softColor)}
                              fullWidth />
                </Grid>
              </CustomGrid>
              <CustomGrid container spacing={1} alignItems="flex-end">
                <Grid xs={2} item>
                  <LockIcon style={{color:colorIconPassrowd}}/>
                </Grid>
                <Grid xs={10} item>
                  <TextField label="password" 
                              type='password'
                              onChange={e => setPassword(e.target.value)}
                              onFocus={setColorIconPassrowd.bind(this,primaryColor)}
                              onBlur={setColorIconPassrowd.bind(this,softColor)}
                              fullWidth />
                </Grid>
              </CustomGrid>
              <Link to="/signup">Sign Up</Link>
              <input type="submit" disabled={loading} className="btn" value="Login" />
            </form>
            <Messages />
          </div>
        </div>
    </FromBody>
  )
}

export default withRouter(SignIn);