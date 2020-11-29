import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import ImgWave from '../../assets/wave.png'
import ImgBg from '../../assets/bg.svg'
import ImgAvatar from '../../assets/avatar.svg'

import { FromBody } from "../SignIn/styles"
import Grid from '@material-ui/core/Grid'
import { Email, Lock, AccountCircle } from '@material-ui/icons'
import { CustomGrid, primaryColor, softColor, LoadingOverlay } from '../../common/template/meterialUiCustomComponents'
import TextField from '@material-ui/core/TextField'
import { toastr } from 'react-redux-toastr'
import Messages from '../../common/msg/messages'

import api from "../../services/api";
import { setUser as setUserAuth, isAuthenticated } from "../../services/auth"

export const SignUp = props => {

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [emailIconColor, setEmailIconColor] = useState(softColor)
  const [passwordIconColor, setPasswordIconColor] = useState(softColor)
  const [userIconColor, setUserIconColor] = useState(softColor)

  useEffect(() => {
    if (isAuthenticated()) {
      props.history.push("/app");
    }
  }, [props])

  const handleSignUp = async e => {
    e.preventDefault();
    if (!username || !email || !password) {
      toastr.error("Error", "Fill in all fields before proceeding!");
    } else {
      setLoading(true);
      try {
        await api.post("/auth/sign-up", { name: username, email, password });
        setLoading(false);
        setUserAuth(username);
        toastr.success("Success", "Successful registration! Redirecting...");

        setTimeout(() => {
          props.history.push("/");
        }, 3000);
      } catch (err) {
        var message = "Unknown error";
        if (err.message) {
          message = err.message;
        }
        if (err.response && err.response.data.message) {
          message = err.response.data.message;
        }

        if (err.response && err.response.data.errors) {
          message = err.response.data.errors[0].message;
        }
        toastr.error("Error", message);
        setLoading(false);
      }
    }
  }

  return (
    <FromBody>
      <img className='wave' alt='Wave' src={ImgWave} />
      <div className='container'>
        <div className="img">
          <img alt='background' src={ImgBg} />
        </div>
        <div className="login-content">
          <LoadingOverlay loading={loading} />
          <form onSubmit={handleSignUp.bind(this)}>
            <img alt='Avatar' src={ImgAvatar} />
            <h2 className="title">Welcome</h2>
            <CustomGrid container spacing={1} alignItems="flex-end">
              <Grid xs={2} item>
                <AccountCircle style={{ color: userIconColor }} />
              </Grid>
              <Grid xs={10} item>
                <TextField label="user name"
                  onChange={e => setUsername(e.target.value)}
                  onFocus={setUserIconColor.bind(this,primaryColor)}
                  onBlur={setUserIconColor.bind(this,softColor)}
                  fullWidth />
              </Grid>
            </CustomGrid>
            <CustomGrid container spacing={1} alignItems="flex-end">
              <Grid xs={2} item>
                <Email style={{ color: emailIconColor }} />
              </Grid>
              <Grid xs={10} item>
                <TextField label="e-mail"
                  type='email'
                  onChange={e => setEmail(e.target.value)}
                  onFocus={setEmailIconColor.bind(this,primaryColor)}
                  onBlur={setEmailIconColor.bind(this,softColor)}
                  fullWidth />
              </Grid>
            </CustomGrid>
            <CustomGrid container spacing={1} alignItems="flex-end">
              <Grid xs={2} item>
                <Lock style={{ color: passwordIconColor }} />
              </Grid>
              <Grid xs={10} item>
                <TextField label="password"
                  type='password'
                  onChange={e => setPassword(e.target.value)}
                  onFocus={setPasswordIconColor.bind(this,primaryColor)}
                  onBlur={setPasswordIconColor.bind(this,softColor)}
                  fullWidth />
              </Grid>
            </CustomGrid>
            <Link to="/">Sign In</Link>
            <input type="submit" className="btn" value="Sign Up" />
          </form>
          <Messages />
        </div>
      </div>
    </FromBody>
  )
}

export default SignUp;