import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import LocalStorageUtils from '../../utils/LocalStorageUtils';
import {RouteHistory} from '../base/react-router';
import AppStore from '../../stores/AppStore';

class IndexPage extends Component{
    constructor(props){
        super(props);
        var logged = LocalStorageUtils.user.isLoggedIn();
        if(!logged){
            RouteHistory.pushHash("/login");
        }
        
    }
    
    render(){
        return (<div className="index-page">
                This is Index Page !
        </div>)
    }
}
                
export default IndexPage;