import React,{Component} from  'react';
import ReactDOM from 'react-dom';
import {Router,Route,Link,RouteHistory} from './base/react-router';

import LoginPage from './pages/LoginPage.react';
import LightBlueTheme from './base/LightBlueTheme';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

const muiTheme = getMuiTheme(LightBlueTheme);

class AppProvider extends Component{
    render(){
        document.body.style.backgroundImage = "url('/static/images/"+parseInt(Math.random()*1000)%12+".jpg')";
        return (<MuiThemeProvider muiTheme={muiTheme}>
                    {this.props.children}
        </MuiThemeProvider>)
    }
}

class RouterApp extends Component{
    render(){
        return (
                <Router  defaultRoute="/login" path="/" component={AppProvider}>
                        <Route path="login" component={LoginPage}></Route>
                </Router>
            )
    }
}

module.exports = RouterApp;