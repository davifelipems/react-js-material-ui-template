import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom"
import { Provider } from 'react-redux'
import reducers from './reducers'
import { applyMiddleware, createStore } from 'redux'
import { GlobalStyle } from './styles/global'
import { isAuthenticated } from './services/auth'
import SignIn from './pages/SignIn'
import SignOut from './pages/SignOut'
import SignUp from './pages/SignUp'
import AccessDined from './pages/AccessDenied'
import App from './pages/App'
import User from './pages/User'
import Role from './pages/Role'
import Category from './pages/Category'

import promise from 'redux-promise'
import multi from 'redux-multi'
import thunk from 'redux-thunk'

import Messages from './common/msg/messages'
import {Layout} from './common/template/Layout'

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__
  && window.__REDUX_DEVTOOLS_EXTENSION__()
const store = applyMiddleware(multi, thunk, promise)(createStore)(reducers, devTools)

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <div className='content-wrapper'>
          <Layout {...props} >
          <Component {...props} />
          </Layout>
          <Messages />
        </div>
      ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
    }
  />
);

const Routes = () => (
  <Provider store={store}>
    <BrowserRouter>
      <GlobalStyle />
      <Switch>
        <Route exact path="/" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/signout" component={SignOut} />
        <PrivateRoute path="/user" component={User} />
        <PrivateRoute path="/role" component={Role} />
        <PrivateRoute path="/category" component={Category} />
        <PrivateRoute path="/access-denied" component={AccessDined} />
        <PrivateRoute path="/app" component={App} />
        <Redirect from='*' to='/' />
      </Switch>
    </BrowserRouter>
  </Provider>

);

export default Routes;