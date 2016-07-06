var React = require('react');

var router = require('../base/ReactRouter');
var Link = router.Link;

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
         object_list:[],
      }  
    },
   componentWillMount:function(){
        AdminStore.addChangeListener(EventTypes.RECEIVED_SCHOOLADMINLIST,  this._onChange);
    },
    componentDidMount:function(){
        ServerActionCreators.getSchoolAdminList(this.props.school_id);
    },
    componentWillUnmount:function(){
        AdminStore.removeChangeListener(EventTypes.RECEIVED_SCHOOLADMINLIST,this._onChange);
    },
    _onChange:function(){
        this.setState({
            object_list:AdminStore.getSchoolAdminList(this.props.school_id),
        });
    },
    getObjectById:function(id){
        var users = this.state.object_list.filter(function(ele,pos){
            return id == ele.user_id;
        })  
        return users.length>0?users[0]:null;
    },
    getTableColumns:function(){
        var editFormDialog = this.editFormDialog;
        var forbidRole = this.forbidRole;
        var deleteSchoolAdmin = this.deleteSchoolAdmin;
        var resetSchoolAdminPwd = this.resetSchoolAdminPwd;
        var handleEdit = function(e){ e = e || event; var target = e.target || e.srcElement; editFormDialog(target.value);}
        var handleForbid = function(e){ e = e || event; var target = e.target || e.srcElement; forbidRole(target.value);}
        var handleDelete = function(e){ e = e || event; var target = e.target || e.srcElement; deleteSchoolAdmin(target.value);}
        var handleReset =  function(e){ e = e || event; var target = e.target || e.srcElement; resetSchoolAdminPwd(target.value);}
        var table_columns = [
            {"title":"序号","name":"index"},
            {"title":"学校管理员名","name":"username"},
            {"title":"真实姓名","name":"name"},
            {"title":"管理员状态","name":"is_killed",formatter:function(ele,pos){
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
                { name:"username", type:"TextInput" , header:"用户名",  prompt:"用户名不能为空", prompter:this.formDialogPrompter, placeholder:"请输入用户名" },
                { name:"name",header:"真实姓名", type:"TextInput", prompt:"真实姓名不能为空", prompter:this.formDialogPrompter, placeholder:"请输入真实姓名"},
                { name:"email", type:"TextInput" , header:"邮件",  prompt:"邮件不能为空", prompter:this.formDialogPrompter, placeholder:"请输入邮件" },
                { name:"phone",header:"电话号码", type:"TextInput", prompt:"电话号码不能为空", prompter:this.formDialogPrompter, placeholder:"请输入电话号码"},
                { name:"password",header:"密码", type:"TextInput", prompt:"密码不能为空", prompter:this.formDialogPrompter},
                 { name:"confirm_password",header:"确认密码", type:"TextInput", prompt:"确认密码和密码不一致", prompter:this.formDialogPrompter,validator:function(value,data,field){
                        return !!value && data.password == value;
                 }}
            ],
            buttons:[
                { "content":"保存",name:"btn-ok",validate:true,handler:function(isValidate,formData){
                            formData.is_killed = 1;
                            formData.school_id =  this.props.school_id;
                            delete formData.confirm_password;
                            ServerActionCreators.postSchoolAdminForm(formData);
                }.bind(this)
                },
                { "content":"关闭",name:"btn-cancel",handler:function(isValidate,formData){}
                }
            ],
            data:{},
            title: "新增学校"
        }
        this.refs.form.open(form_options);
    },
    editFormDialog:function(id){
        var data = this.getObjectById(id);
        var form_options = {
            fields:[
                { name:"username", type:"TextInput" , header:"用户名",  prompt:"用户名不能为空", prompter:this.formDialogPrompter, placeholder:"请输入用户名" },
                { name:"name",header:"真实姓名", type:"TextInput", prompt:"真实姓名不能为空", prompter:this.formDialogPrompter, placeholder:"请输入真实姓名"},
                { name:"email", type:"TextInput" , header:"邮件",  prompt:"邮件不能为空", prompter:this.formDialogPrompter, placeholder:"请输入邮件" },
                { name:"phone",header:"电话号码", type:"TextInput", prompt:"电话号码不能为空", prompter:this.formDialogPrompter, placeholder:"请输入电话号码"},

            ],
            buttons:[
                { "content":"保存",name:"btn-ok",validate:true,handler:function(isValidate,formData){
                    var copy_obj = {
                        "is_killed": formData.is_killed,
                        "school_id": this.props.school_id,
                        "user_id": formData.user_id,
                        "username":formData.username,
                        "name":formData.name,
                        "email":formData.email,
                        "phone":formData.phone,
                    }
                    ServerActionCreators.putSchoolAdminUser(copy_obj);
                }.bind(this)

                },
                { "content":"关闭",name:"btn-cancel",handler:function(isValidate,formData){
                    }
                }
            ],
            data:data,
            title: "修改学校管理员"
        }
        this.refs.form.open(form_options);
    },
    resetSchoolAdminPwd:function(id){
        var data = this.getObjectById(id);
        var form_options = {
            fields:[
                { name:"password", type:"TextInput" , header:"新密码",  prompt:"输入的密码不能为空", prompter:this.formDialogPrompter, placeholder:"请输入新密码" },
            ],
            buttons:[
                { "content":"保存",name:"btn-ok",validate:true,handler:function(isValidate,formData){
                        var copy_obj = {
                            "password": formData.password,
                            "user_id": formData.user_id
                        }
                        ServerActionCreators.putSchoolAdminUser(copy_obj);
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
    forbidRole:function(id){

        this.refs.confirm.open("确定要禁用该学校管理员吗？",function(e){
            var data = this.getObjectById(id);
            data.is_killed = 0;
            ServerActionCreators.putSchoolForm(data);
        }.bind(this))
    },
    deleteSchoolAdmin:function(id,school_id){
        var data = this.getObjectById(id);
        this.refs.confirm.open("确定要删除该学校管理员吗？",function(e){
            ServerActionCreators.deleteSchoolAdminUser(id,data.school_id);
        })
    },
    render:function(){
        var table_columns = this.getTableColumns();
        var openFormDialog = this.openFormDialog;
        var school_info = AdminStore.getSchoolById(this.props.school_id);
        return (<div className="school-user">  
                <div className="row link-row">
                    <span className="glyphicon glyphicon-home text-color-gray"><Link className="text-color-gray" to="/school/list" title="智汇学习管理后台">智汇学习管理后台</Link>&gt;</span>
                    <span className="text-color-gray"><Link className="text-color-8f" to="/school/list" title="学校管理">学校管理</Link>&gt;</span>
                    <span className="text-color-main">{ school_info.school_name }</span>
                </div>
                <div className="row search-row">
                    <div className="col-xs-3">
                        <a role="button" className="btn btn-super-primary" onClick={ openFormDialog }>新增管理员</a>
                    </div>
                    <div className="col-xs-9">
                        <div className="input-group" style={{ "maxWidth":"300px","float":"right"}}>
                              <input type="text" className="form-control"  placeholder="请输入学校管理员用户名或者真实姓名" />
                              <a  className="input-group-addon btn btn-default">搜索</a>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12">
                        <Table data={this.state.object_list} columns={table_columns}/>
                    </div>
                </div>
                <FormDialog ref="form"  style={{width:"530px"}} ></FormDialog>
                <ConfirmDialog ref="confirm" style={{width:"250px"}}></ConfirmDialog>
                <AlertDialog ref="alert" style={{width:"250px"}}></AlertDialog>
            </div>)
    }
})