var React = require('react');
var Table = require('../base/Table.react');
var ConfirmDialog = require('../dialogs/ConfirmDialog.react');
var AlertDialog = require('../dialogs/AlertDialog.react');
var FormDialog = require('../dialogs/FormDialog.react');
var AdminStore = require('../../stores/AdminStore');
var ServerActionCreators = require('../../actions/ServerActionCreators');
var AdminConstants = require('../../constants/AdminConstants');
var EventTypes = AdminConstants.EventTypes;
module.exports = React.createClass({
    getInitialState:function(){
      return {
         admin_list:[],
         origin_admin_list:[]
      }  
    },
    componentWillMount:function(){
        AdminStore.addChangeListener(EventTypes.RECEIVED_SUPERADMINLIST,  this._onChange);
    },
    componentDidMount:function(){
        ServerActionCreators.getSuperAdminList();
    },
    componentWillUnmount:function(){
        AdminStore.removeChangeListener(EventTypes.RECEIVED_SUPERADMINLIST,this._onChange);
    },
    _onChange:function(){
        this.setState({
            admin_list:AdminStore.getSuperAdminList(),
            origin_admin_list:AdminStore.getSuperAdminList()
        });
    },
    getAdminById:function(id){
        var admins = this.state.admin_list.filter(function(ele,pos){
            return id == ele.user_id;
        })  
        return admins.length>0?admins[0]:null;
    },
    getTableColumns:function(){
        var editFormDialog = this.editFormDialog;
        var forbidRole = this.forbidRole;
        var deleteSuperAdmin = this.deleteSuperAdmin;
        var resetSuperAdminPwd = this.resetSuperAdminPwd;
        var handleEdit = function(e){ e = e || event; var target = e.target || e.srcElement; editFormDialog(target.value);}
        var handleForbid = function(e){ e = e || event; var target = e.target || e.srcElement; forbidRole(target.value);}
        var handleDelete = function(e){ e = e || event; var target = e.target || e.srcElement; deleteSuperAdmin(target.value);}
        var handleReset =  function(e){ e = e || event; var target = e.target || e.srcElement; resetSuperAdminPwd(target.value);}
        
        var table_columns = [
            {"title":"序号","name":"index"},
            {"title":"用户名","name":"username"},
            {"title":"真实姓名","name":"name"},
            {"title":"用户状态","name":"is_killed",formatter:function(ele,pos){
                return ele.is_killed?"启用":"禁用";
            }},
            {"title":"添加日期","name":"date"},
            {"title":"操作","name":"user_id",type:"buttons",buttons:[
                { formatter:function(obj){ return (<span value={obj}  className="icon icon-edit"  onClick={handleEdit} title="修改"></span>) }},
                { formatter:function(obj){ return (<span value={obj}  className="icon icon-edit"  onClick={handleForbid} title="禁用"></span>)}},
                { formatter:function(obj){ return (<span value={obj}  className="icon icon-edit"  onClick={handleReset} title="重置密码"></span>)}},
                { formatter:function(obj){ return (<span value={obj}  className="icon icon-delete"  onClick={handleDelete} title="删除"></span>)}}
            ]}
        ];
        return table_columns;
    },
    formDialogPrompter:function(value,formData,options){
        this.refs.alert.open(options.prompt);
    },
    openFormDialog:function(){
        var form_options = {
            fields:[
                { name:"username", type:"TextInput", header:"帐号",  prompt:"帐号不能为空", prompter:this.formDialogPrompter, placeholder:"请输入帐号" },
                { name:"name", type:"TextInput", header:"真实姓名",  prompt:"真实姓名不能为空", prompter:this.formDialogPrompter, placeholder:"请输入真实姓名" },
                { name:"email ", type:"TextInput", header:"邮件",  prompt:"邮件不能为空", prompter:this.formDialogPrompter, placeholder:"请输入邮件" },
                { name:"phone ", type:"TextInput", header:"手机号码",  prompt:"邮件不能为空", prompter:this.formDialogPrompter, placeholder:"请输入手机号码" },
                { name:"password ", type:"PasswordInput", header:"密码",  prompt:"密码不能为空", prompter:this.formDialogPrompter},
            ],
            buttons:[
                { "content":"保存",name:"btn-ok",validate:true,handler:function(isValidate,formData){
                            formData.is_killed = 1;
                            ServerActionCreators.postSuperAdminForm(formData);
                }
                },
                { "content":"关闭",name:"btn-cancel",handler:function(isValidate,formData){}
                }
            ],
            data:{},
            title: "新增超级管理员"
        }
        this.refs.form.open(form_options);
    },
    editFormDialog:function(user_id){
        var data = this.getAdminById(user_id);
        var form_options = {
            fields:[
                { name:"username", type:"TextInput", header:"帐号",  prompt:"帐号不能为空", prompter:this.formDialogPrompter, placeholder:"请输入帐号" },
                { name:"name", type:"TextInput", header:"真实姓名",  prompt:"真实姓名不能为空", prompter:this.formDialogPrompter, placeholder:"请输入真实姓名" },
                { name:"email ", type:"TextInput", header:"邮件",  prompt:"邮件不能为空", prompter:this.formDialogPrompter, placeholder:"请输入邮件" },
                { name:"phone ", type:"TextInput", header:"手机号码",  prompt:"邮件不能为空", prompter:this.formDialogPrompter, placeholder:"请输入手机号码" }
            ],
            buttons:[
                { "content":"保存",name:"btn-ok",validate:true,handler:function(isValidate,formData){
                    var copy_obj = {
                            "is_killed": formData.is_killed,
                            "user_id": formData.user_id,
                            "username": formData.username,
                            "name":formData.name,
                            "email":formData.email,
                            "phone":formData.phone,
                    }
                    ServerActionCreators.putSuperAdminForm(copy_obj);

                }

                },
                { "content":"关闭",name:"btn-cancel",handler:function(isValidate,formData){
                    }
                }
            ],
            data:data,
            title: "修改超级管理员"
        }
        this.refs.form.open(form_options);
    },
    resetSuperAdminPwd:function(user_id){
        var data = this.getAdminById(user_id);
        var form_options = {
            fields:[
                 { name:"password ", type:"PasswordInput", header:"密码",  prompt:"密码不能为空", prompter:this.formDialogPrompter},
            ],
            buttons:[
                { "content":"保存",name:"btn-ok",validate:true,handler:function(isValidate,formData){
                    var copy_obj = {
                        "user_id": formData.user_id,
                        "password": formData.password,
                    }
                    ServerActionCreators.putSuperAdminForm(copy_obj);

                }

                },
                { "content":"关闭",name:"btn-cancel",handler:function(isValidate,formData){
                    }
                }
            ],
            data:data,
            title: "重置密码"
        }
        this.refs.form.open(form_options);
    },
    forbidRole:function(user_id){
        this.refs.confirm.open("确定要禁用超级管理员吗？",function(e){
            ServerActionCreators.putSuperAdminForm({is_killed:0,user_id:user_id});
        })
    },
    deleteSuperAdmin:function(user_id){
        this.refs.confirm.open("确定要删除超级管理员吗？",function(e){
            ServerActionCreators.deleteSuperAdminUser(user_id);
        })
    },
     _search:function(e){
        var list = [];
            if(e.target.value){
                list = this.state.origin_admin_list.filter(function(ele,pos){
                    return  (ele.username && ele.username.indexOf(e.target.value) != -1) || (ele.email && ele.email.indexOf(e.target.value) != -1); 
                });
            }else{
             list = this.state.origin_admin_list;
            }
        this.setState({
            admin_list:list
        });       
    },       
    render:function(){
        var table_columns = this.getTableColumns();
        var openFormDialog = this.openFormDialog;
        var search  = this._search;
        return (<div className="school-list">
                <div className="row search-row">
                    <div className="col-xs-3">
                        <a role="button" className="btn btn-super-primary" onClick={ openFormDialog }>超管用户</a>
                    </div>
                    <div className="col-xs-9">
                        <div className="input-group" style={{ "maxWidth":"300px","float":"right"}}>
                              <input type="text" className="form-control" onChange={search}  placeholder="请输入帐号或者邮件" />
                              <a  className="input-group-addon btn btn-default">搜索</a>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12">
                        <Table data={this.state.admin_list} columns={table_columns}/>
                    </div>
                </div>
                <FormDialog ref="form"  style={{width:"530px"}} ></FormDialog>
                <ConfirmDialog ref="confirm" style={{width:"250px"}}></ConfirmDialog>
                <AlertDialog ref="alert" style={{width:"250px"}}></AlertDialog>
            </div>)
    }
})