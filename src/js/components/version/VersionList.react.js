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
var Router = router.Router;
var Route = router.Route;
var Link = router.Link;
module.exports = React.createClass({
    getInitialState:function(){
      return {
         version_list:[],
         origin_object_list:[]
      }  
    },

   componentWillMount:function(){
        AdminStore.addChangeListener(EventTypes.RECEIVED_VERSIONLIST,  this._onChange);
    },
    componentDidMount:function(){
        ServerActionCreators.getVersionList();
    },
    componentWillUnmount:function(){
        AdminStore.removeChangeListener(EventTypes.RECEIVED_VERSIONLIST,this._onChange);
    },
    _onChange:function(){
        this.setState({
            version_list:AdminStore.getVersionList(),
            origin_object_list:AdminStore.getVersionList()
        });
    },
    getObjectById:function(id){
        var version_list = this.state.version_list.filter(function(ele,pos){
            return id == ele.version_id;
        })  
        return version_list.length>0?version_list[0]:null;

    },
    getTableColumns:function(){
        var editFormDialog = this.editFormDialog;
        var forbidRole = this.forbidRole;
        var deleteSchool = this.deleteSchool;
        var handleEdit = function(e){ e = e || event; var target = e.target || e.srcElement; editFormDialog(target.value);}
        var handleDelete = function(e){ e = e || event; var target = e.target || e.srcElement; deleteSchool(target.value);}
        
        var table_columns = [
            {"title":"序号","name":"index"},
            {"title":"版本名称","name":"version_name",formatter(ele,pos){
                return (<Link to={"/version/node/"+ele.version_id}>{ele.version_name}</Link>)}
            },
            {"title":"添加日期","name":"date",formatter:function(ele){
                return new Date(ele.date*1000).Format("yyyy-MM-dd");
            }},
            {"title":"操作","name":"version_id",type:"buttons",buttons:[
                { formatter:function(obj){ return (<span value={obj}  className="icon icon-edit"  onClick={handleEdit} title="修改"></span>) }},
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
                { name:"version_name", type:"TextInput" , header:"版本名称",  prompt:"版本名称不能为空", prompter:this.formDialogPrompter, placeholder:"请输入版本名称" },
            ],
            buttons:[
                { "content":"保存",name:"btn-ok",validate:true,handler:function(isValidate,formData){
                            formData.version_name=formData.version_name;
                            ServerActionCreators.postVersionForm(formData);
                }
                },
                { "content":"关闭",name:"btn-cancel",handler:function(isValidate,formData){}
                }
            ],
            data:{},
            title: "新增版本"
        }
        this.refs.form.open(form_options);
    },
    editFormDialog:function(version_id){
        var data = this.getObjectById(version_id);
        var form_options = {
            fields:[
                { name:"version_name", type:"TextInput" , header:"版本名称",  prompt:"版本名称不能为空", prompter:this.formDialogPrompter, placeholder:"请输入版本名称" },
            ],
            buttons:[
                { "content":"保存",name:"btn-ok",validate:true,handler:function(isValidate,formData){
                    var copy_obj = {
                            "version_id": formData.version_id,
                            "version_name": formData.version_name,
                    }
                    ServerActionCreators.putVersionForm(copy_obj);

                }

                },
                { "content":"关闭",name:"btn-cancel",handler:function(isValidate,formData){
                    }
                }
            ],
            data:data,
            title: "修改版本"
        }
        this.refs.form.open(form_options);
    },
    deleteSchool:function(version_id){
        this.refs.confirm.open("确定要删除版本吗？",function(e){
            ServerActionCreators.deleteVersionForm(version_id);
        })
    },
     _search:function(e){
        var list = [];
            if(e.target.value){
                list = this.state.origin_object_list.filter(function(ele,pos){
                    return  (ele.version_name && ele.version_name.indexOf(e.target.value) != -1) ; 
                });
            }else{
                list = this.state.origin_object_list;
            }
        this.setState({
            version_list:list
        });       
    },         
    render:function(){
        var table_columns = this.getTableColumns();
        var openFormDialog = this.openFormDialog;
        var serach = this._search;
        return (<div className="school-list">
                <div className="row search-row">
                    <div className="col-xs-3">
                        <a role="button" className="btn btn-super-primary" onClick={ openFormDialog }>新增版本</a>
                    </div>
                    <div className="col-xs-9">
                        <div className="input-group" style={{ "maxWidth":"300px","float":"right"}}>
                              <input type="text" className="form-control"  onChange={serach}  placeholder="请输入版本名称" />
                              <a  className="input-group-addon btn btn-default">搜索</a>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12">
                        <Table data={this.state.version_list} columns={table_columns}/>
                    </div>
                </div>
                <FormDialog ref="form"  style={{width:"530px"}} ></FormDialog>
                <ConfirmDialog ref="confirm" style={{width:"250px"}}></ConfirmDialog>
                <AlertDialog ref="alert" style={{width:"250px"}}></AlertDialog>
            </div>)
    }
})
