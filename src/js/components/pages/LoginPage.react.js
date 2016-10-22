import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import {lightBlue500,lightBlue300} from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';

const styles = {
    paper:{
        textAlign: 'center',
        margin:"200px auto",
        maxWidth: 600
    },
    submit: {
        color: "#fff",
        margin: "10px 0px",
        width: 200
    },
    text:{
        width: 200
    }
}

class LoginPage extends React.Component{
  constructor(props){
      super(props);
      this.state = {
          formData: {
              username: "",
              password: ""
          },
          errorData: {
              username: "",
              password: ""
          }
      }
      this.handleTouchTap = this.handleTouchTap.bind(this);
      this.handleFormChange = this.handleFormChange.bind(this);
  }
  handleTouchTap(e){
      var formData = this.state.formData;
      var errorData = this.state.errorData;
      var postData = new FormData();
      var passed = true;
      for(var field in formData){
          var value = formData[field];
          if(value===null || value===""){
              errorData[field] = "你还未填写该项";
              passed = false;
          }else{
              errorData[field] = "";
          }
          postData.append(field,value);
      }
      
      if(passed){
          var xhr = new XMLHttpRequest();
          xhr.onreadystatechange = function () {
            if(xhr.readyState==4){
                if(xhr.status == 200 || xhr.status == 304){
                    alert("登录成功");
                }
            }
          };
          xhr.open("post","/api/login",true);
          xhr.send(postData);
      }
      
      this.setState({
          errorData: errorData
      })
  }
  handleFormChange(e){
      var name = e.target.name;
      var value = e.target.value;
      var formData = this.state.formData;
      var errorData = this.state.errorData;
      formData[name] = value;
      if(value!==null && value !==""){
          errorData[name] = "";
      }
      
      this.setState({
          formData: formData,
          errorData: errorData
      })
  }
    
  render(){
      
       return (<Paper style={styles.paper} zDepth={3}>
            <TextField name="username" hintText="请输入用户名" floatingLabelText="用户名" underlineShow={false} style={styles.text} 
               onChange={this.handleFormChange} value={this.state.formData.username} errorText={this.state.errorData.username}/>
            <Divider />
            <TextField name="password" type="password" hintText="请输入密码" floatingLabelText="密码" underlineShow={false} style={styles.text} 
               onChange={this.handleFormChange} value={this.state.formData.password} errorText={this.state.errorData.password}/>
            <Divider />
            <FlatButton style={styles.submit} backgroundColor={lightBlue500} hoverColor={lightBlue300} label="登录" onTouchTap={this.handleTouchTap} />
        </Paper>)
    }
}
                
export default LoginPage;