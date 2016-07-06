var React = require('react');
var Table = require('../base/Table.react');
var ConfirmDialog = require('../dialogs/ConfirmDialog.react');
var AlertDialog = require('../dialogs/AlertDialog.react');
var FormDialog = require('../dialogs/FormDialog.react');
var AdminStore = require('../../stores/AdminStore');
var ServerActionCreators = require('../../actions/ServerActionCreators');
var AdminConstants = require('../../constants/AdminConstants');
var EventTypes = AdminConstants.EventTypes;
var router = require('../base/ReactRouter');
var Link = router.Link;

module.exports = React.createClass({
    getInitialState:function(){
      return {
         object_list:[],
         origin_object_list:[]
      }  
    },

   componentWillMount:function(){
        AdminStore.addChangeListener(EventTypes.RECEIVED_SCHOOLLIST,  this._onChange);
    },
    componentDidMount:function(){
        ServerActionCreators.getSchoolList();
    },
    componentWillUnmount:function(){
        AdminStore.removeChangeListener(EventTypes.RECEIVED_SCHOOLLIST,this._onChange);
    },
    _onChange:function(){
        this.setState({
            object_list:AdminStore.getSchoolList(),
            origin_object_list:AdminStore.getSchoolList()
        });
    },
    getObjectById:function(id){
        var schools = this.state.object_list.filter(function(ele,pos){
            return id == ele.school_id;
        })  
        return schools.length>0?schools[0]:null;

    },
    getTableColumns:function(){
        var editFormDialog = this.editFormDialog;
        var forbidRole = this.forbidRole;
        var deleteSchool = this.deleteSchool;
        var handleEdit = function(e){ e = e || event; var target = e.target || e.srcElement; editFormDialog(target.value);}
        var handleForbid = function(e){ e = e || event; var target = e.target || e.srcElement; forbidRole(target.value);}
        var handleDelete = function(e){ e = e || event; var target = e.target || e.srcElement; deleteSchool(target.value);}
        
        var table_columns = [
            {"title":"序号","name":"index"},
            {"title":"学校名称","name":"school_name",formatter(ele,pos){
                return (<Link to={"/school/user/"+ele.school_id}>{ele.school_name}</Link>)
            }},
            {"title":"学校地址","name":"address"},
            {"title":"学校状态","name":"is_killed",formatter:function(ele,pos){
                return ele.is_killed?"启用":"禁用";
            }},
            {"title":"添加日期","name":"date",formatter:function(ele){
                return new Date(ele.date*1000).Format("yyyy-MM-dd");
            }},
            {"title":"操作","name":"school_id",type:"buttons",buttons:[
                { formatter:function(obj){ return (<span value={obj}  className="icon icon-edit"  onClick={handleEdit} title="修改"></span>) }},
                { formatter:function(obj){ return (<span value={obj}  className="icon icon-edit"  onClick={handleForbid} title="禁用"></span>)}},
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
                { name:"school_name", type:"TextInput", header:"学校名称",  prompt:"学校名称不能为空", prompter:this.formDialogPrompter, placeholder:"请输入学校名称" },
                { name:"address",header:"学校地址", type:"TextInput", prompt:"学校地址不能为空", prompter:this.formDialogPrompter, placeholder:"请输入学校地址"}
            ],
            buttons:[
                { "content":"保存",name:"btn-ok",validate:true,handler:function(isValidate,formData){
                            formData.is_killed = 1;
                            ServerActionCreators.postSchoolForm(formData);
                }
                },
                { "content":"关闭",name:"btn-cancel",handler:function(isValidate,formData){}
                }
            ],
            data:{},
            title: "新增学校"
        }
        this.refs.form.open(form_options);
    },
    editFormDialog:function(school_id){
        var data = this.getObjectById(school_id);
        var form_options = {
            fields:[
                { name:"school_name", type:"TextInput" , header:"学校名称",  prompt:"学校名称不能为空", prompter:this.formDialogPrompter, placeholder:"请输入学校名称" },
                { name:"address",header:"学校地址", type:"TextInput", prompt:"学校地址不能为空", prompter:this.formDialogPrompter, placeholder:"请输入学校地址"},
            ],
            buttons:[
                { "content":"保存",name:"btn-ok",validate:true,handler:function(isValidate,formData){
                    var copy_obj = {
                            "is_killed": formData.is_killed,
                            "school_id": formData.school_id,
                            "school_name": formData.school_name,
                            "address":formData.address
                    }
                    ServerActionCreators.putSchoolForm(copy_obj);

                }

                },
                { "content":"关闭",name:"btn-cancel",handler:function(isValidate,formData){
                    }
                }
            ],
            data:data,
            title: "修改学校"
        }
        this.refs.form.open(form_options);
    },
    forbidRole:function(school_id){
        this.refs.confirm.open("确定要禁用学校吗？",function(e){
            ServerActionCreators.putSchoolForm({is_killed:0,school_id:school_id});
        })
    },
    deleteSchool:function(school_id){
        this.refs.confirm.open("确定要删除学校吗？",function(e){
            ServerActionCreators.deleteSchoolForm(school_id);
        })
    },
    _search:function(e){
        var list = [];
            if(e.target.value){
                list = this.state.origin_object_list.filter(function(ele,pos){
                    return  (ele.school_name && ele.school_name.indexOf(e.target.value) != -1) || (ele.address && ele.address.indexOf(e.target.value) != -1); 
                });
            }else{
             list = this.state.origin_object_list;
            }
        this.setState({
            object_list:list
        });       
    },    
    render:function(){
        var table_columns = this.getTableColumns();
        var openFormDialog = this.openFormDialog;
        var serach = this._search;
        return (<div className="school-list">
                <div className="row search-row">
                    <div className="col-xs-3">
                        <a role="button" className="btn btn-super-primary" onClick={ openFormDialog }>新增学校</a>
                    </div>
                    <div className="col-xs-9">
                        <div className="input-group" style={{ "maxWidth":"300px","float":"right"}}>
                              <input type="text" className="form-control" onChange={serach} placeholder="请输入学校名称或者地址" />
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