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
         publish_list:[],
         origin_object_list:[]
      }  
    },

   componentWillMount:function(){
        AdminStore.addChangeListener(EventTypes.RECEIVED_PUBLISHLIST,  this._onChange);
    },
    componentDidMount:function(){
        ServerActionCreators.getPublishList();
    },
    componentWillUnmount:function(){
        AdminStore.removeChangeListener(EventTypes.RECEIVED_PUBLISHLIST,this._onChange);
    },
    _onChange:function(){
        this.setState({
            publish_list:AdminStore.getPublishList(),
            origin_object_list:AdminStore.getPublishList()
        });
    },
    getObjectById:function(id){
        var publish = this.state.publish_list.filter(function(ele,pos){
            return id == ele.publish_id;
        })  
        return publish.length>0?publish[0]:null;

    },
    getTableColumns:function(){
        var editFormDialog = this.editFormDialog;
        var forbidRole = this.forbidRole;
        var deleteSchool = this.deleteSchool;
        var handleEdit = function(e){ e = e || event; var target = e.target || e.srcElement; editFormDialog(target.value);}
        var handleDelete = function(e){ e = e || event; var target = e.target || e.srcElement; deleteSchool(target.value);}
        
        var table_columns = [
            {"title":"序号","name":"index"},
            {"title":"出版社名称","name":"publish_name"},
            {"title":"添加日期","name":"date",formatter:function(ele){
                return new Date(ele.date*1000).Format("yyyy-MM-dd");
            }},
            {"title":"操作","name":"publish_id",type:"buttons",buttons:[
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
                { name:"publish_name", type:"TextInput" , header:"出版社名称",  prompt:"出版社名称不能为空", prompter:this.formDialogPrompter, placeholder:"请输入出版社名称" },
            ],
            buttons:[
                { "content":"保存",name:"btn-ok",validate:true,handler:function(isValidate,formData){
                            formData.publish_name=formData.publish_name;
                            ServerActionCreators.postPublishForm(formData);
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
    editFormDialog:function(publish_id){
        var data = this.getObjectById(publish_id);
        var form_options = {
            fields:[
                { name:"publish_name", type:"TextInput" , header:"出版社名称",  prompt:"出版社名称不能为空", prompter:this.formDialogPrompter, placeholder:"请输入出版社名称" },
            ],
            buttons:[
                { "content":"保存",name:"btn-ok",validate:true,handler:function(isValidate,formData){
                    var copy_obj = {
                            "publish_id": formData.publish_id,
                            "publish_name": formData.publish_name,
                    }
                    ServerActionCreators.putPublishForm(copy_obj);

                }

                },
                { "content":"关闭",name:"btn-cancel",handler:function(isValidate,formData){
                    }
                }
            ],
            data:data,
            title: "修改出版社"
        }
        this.refs.form.open(form_options);
    },
    deleteSchool:function(publish_id){
        this.refs.confirm.open("确定要删除出版社吗？",function(e){
            ServerActionCreators.deletePublishForm(publish_id);
        })
    },
     _search:function(e){
        var list = [];
            if(e.target.value){
                list = this.state.origin_object_list.filter(function(ele,pos){
                    return  (ele.publish_name && ele.publish_name.indexOf(e.target.value) != -1) ; 
                });
            }else{
                list = this.state.origin_object_list;
            }
        this.setState({
            publish_list:list
        });       
    },     
    render:function(){
        var table_columns = this.getTableColumns();
        var openFormDialog = this.openFormDialog;
         var serach = this._search;
        return (<div className="school-list">
                <div className="row search-row">
                    <div className="col-xs-3">
                        <a role="button" className="btn btn-super-primary" onClick={ openFormDialog }>新增出版社</a>
                    </div>
                    <div className="col-xs-9">
                        <div className="input-group" style={{ "maxWidth":"300px","float":"right"}}>
                              <input type="text" className="form-control"  onChange={serach} placeholder="请输入出版社名称" />
                              <a  className="input-group-addon btn btn-default">搜索</a>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12">
                        <Table data={this.state.publish_list} columns={table_columns}/>
                    </div>
                </div>
                <FormDialog ref="form"  style={{width:"530px"}} ></FormDialog>
                <ConfirmDialog ref="confirm" style={{width:"250px"}}></ConfirmDialog>
                <AlertDialog ref="alert" style={{width:"250px"}}></AlertDialog>
            </div>)
    }
})