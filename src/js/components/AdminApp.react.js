var React = require('react');
var ReactDOM = require('react-dom');
var Message = require("./base/Message.react");

var router = require('./base/ReactRouter');
var Router = router.Router;
var Route = router.Route;
var Link = router.Link;
var History = router.History;

var AdminStore = require('../stores/AdminStore');
var ServerActionCreators = require('../actions/ServerActionCreators');
var AdminConstants = require('../constants/AdminConstants');
var EventTypes = AdminConstants.EventTypes;

var SchoolPage = require('./school/SchoolPage.react');
var SchoolList = require('./school/SchoolList.react');
var SchoolUser = require('./school/SchoolUser.react');

var VersionPage = require('./version/VersionPage.react');
var VersionList = require('./version/VersionList.react');
var NodeList = require('./version/NodeList.react');

var GradePage = require('./grade/GradePage.react');
var GradeList = require('./grade/GradeList.react');

var SubjectPage = require('./subject/SubjectPage.react');
var SubjectList = require('./subject/SubjectList.react');

var UserPage = require('./user/UserPage.react');
var UserList = require('./user/UserList.react');

var PublishPage = require('./publish/PublishPage.react');
var PublishList = require('./publish/PublishList.react');

var AdminTopNav  = React.createClass({
    render:function(){		
        return (
              <div role="navigation" className="navbar navbar-inverse navbar-fixed-top admin-navbar-white">
                    <div className="container">
                        <div className="navbar-header">
                            <div role="button" type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example" aria-expanded="false">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </div>
                            <div className="navbar-brand edu-brand"><img style={{background:'blue'}} src="/static/images/img-logo.png" />智汇学习管理后台</div>
                            </div>
                            <div className="collapse navbar-collapse" id="bs-example">
                                <ul className="nav navbar-nav navbar-right">
                                        <li><p style={{ "marginTop":"15px"}}>欢迎你，</p></li>
                                        <li className="dropdown">
                                        <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">test_admin <span className="caret"></span></a>
                                                <ul className="dropdown-menu">
                                                        <li><a href="#">个人信息</a></li>
                                                        <li><a href="#">修改密码</a></li>
                                                        <li role="separator" className="divider"></li>
                                                        <li><a href="/">进入系统</a></li>
                                                        <li><a href="/admin/login">退出</a></li>
                                                </ul>
                                        </li>
                                </ul>
                    </div>
                </div>
            </div>
        )
    }
})

var AdminMainContent = React.createClass({
    render:function(){
        var hash = History.curHash.hash;
        return (
            <div className="admin-main-content container">
                        <div className="left-nav">
                                <ul className="edu-nav">
                                    <li className="divide"><strong>学校管理</strong></li>
                                    <li className={ "achor "+(hash.indexOf("/school")==0? "active":"")}><Link className="link" to="/school/list"><i className="icon icon-jurisdiction"></i><span>学校管理</span></Link></li>
                                    <li className="divide"><strong>超管用户管理</strong></li>
                                    <li className={ "achor "+(hash.indexOf("/user")==0? "active":"")}><Link className="link" to="/user/list"><i className="icon icon-user"></i><span>超管用户管理</span></Link></li>
                                    <li className="divide"><strong>教材版本管理</strong></li>
                                    <li className={"achor "+ (hash.indexOf("/publish")==0? "active":"")}><Link className="link" to="/publish/list"><i className="icon icon-textbook"></i><span>出版社管理</span></Link></li>
                                    <li className={ "achor "+(hash.indexOf("/version")==0? "active":"")}><Link className="link" to="/version/list"><i className="icon icon-textbook"></i><span>教材版本管理</span></Link></li>
                                    <li className="divide"><strong>基础信息管理</strong></li>
                                    <li className={ "achor "+(hash.indexOf("/grade")==0? "active":"")}><Link className="link" to="/grade/list"><i className="icon icon-class"></i><span>年级管理</span></Link></li>
                                    <li className={ "achor "+(hash.indexOf("/subject")==0? "active":"")}><Link className="link" to="/subject/list"><i className="icon icon-class"></i><span>科目管理</span></Link></li>
                                </ul>
                        </div>
                        <div className="right-content">
                                <div className="main-content">
                                        {this.props.children}
                                </div>
                        </div>
            </div>
        )
    }
});

var AdminApp = React.createClass({
  componentDidMount:function(){
      window.addEventListener("resize",this.handleResize);
      this.handleResize(null);
  },
  componentWillUnmount:function(){
      window.removeEventListener("resize",this.handleResize);
  },
  handleResize:function(e){
      $(".admin-main-content .left-nav").css({
          "min-height": window.innerHeight-65
      })
      $(".admin-main-content .right-content").css({
          "min-height": window.innerHeight-65
      })
  },
  render: function() {
    return (
        <div className="admin-app">
            <AdminTopNav />
            <AdminMainContent>
                    { this.props.children }
            </AdminMainContent>
            <Message />
        </div>
    );
  }
});
var RouterApp = React.createClass({
    render:function(){
        return (
                <Router  defaultRoute="/school/list" path="/" component={AdminApp}>
                        <Route path="school" component={SchoolPage}>
                                <Route path="list" component={SchoolList}></Route>
                                <Route path="user/:school_id" component={SchoolUser}></Route>
                        </Route>
                        <Route path="grade" component={GradePage}>
                                <Route path="list" component={GradeList}></Route>
                        </Route>
                        <Route path="subject" component={SubjectPage}>
                                <Route path="list" component={SubjectList}></Route>
                        </Route>
                        <Route path="user" component={UserPage}>
                                <Route path="list" component={UserList}></Route>
                        </Route>
                        <Route path="version" component={VersionPage}>             
                                <Route path="list" component={VersionList}></Route>
                                <Route path="node/:version_id" component={NodeList}></Route>
                        </Route>
                        <Route path="publish" component={PublishPage}>             
                                <Route path="list" component={PublishList}></Route>
                        </Route>
                </Router>
            )
    }
})

module.exports = RouterApp;